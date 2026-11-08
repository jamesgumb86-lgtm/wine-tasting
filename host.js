/* Host table: assign guests, generate personal invitation links. */
(function () {
  const KEY = "we-host-v1";
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const countries = window.WINE_DATA.countries;

  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  state = state || { event: { e: "", d: "", h: "Nat", p: "" }, guests: [] };

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2200);
  }

  const baseUrl = () => location.href.replace(/host\.html.*$/, "").replace(/[?#].*$/, "");
  const linkFor = (g) =>
    baseUrl() + "?i=" + WE.encodeInvite({ n: g.n, c: g.c, k: g.k, e: state.event.e, d: state.event.d, h: state.event.h || "your host", p: state.event.p });
  const taken = (c, k, except) => state.guests.some((g) => g.c === c && g.k === k && g !== except);
  const colourName = (k) => (k === "r" ? "Red" : "White");

  /* ---- event fields ---- */
  [["ev", "e"], ["dt", "d"], ["hn", "h"], ["ph", "p"]].forEach(([id, k]) => {
    $(id).value = state.event[k] || "";
    $(id).oninput = () => { state.event[k] = $(id).value.trim(); save(); };
  });

  /* ---- selects ---- */
  function fillCountrySelect() {
    const k = $("gk").value;
    const cur = $("gc").value;
    $("gc").innerHTML = countries.map((c) =>
      `<option value="${c.id}" ${taken(c.id, k) ? "disabled" : ""}>${esc(c.name)}${taken(c.id, k) ? " — taken" : ""}</option>`
    ).join("");
    if (cur && !taken(cur, k)) $("gc").value = cur;
    else {
      const first = countries.find((c) => !taken(c.id, k));
      if (first) $("gc").value = first.id;
    }
  }
  $("gk").onchange = fillCountrySelect;

  function addGuest(c, k) {
    const n = $("gn").value.trim();
    const err = $("addErr");
    if (!n) { err.hidden = false; err.textContent = "Add the guest's name first."; return; }
    if (taken(c, k)) { err.hidden = false; err.textContent = "That pairing is already taken."; return; }
    err.hidden = true;
    state.guests.push({ n, c, k });
    save();
    $("gn").value = "";
    render();
    toast(`${n} added`);
  }

  $("add").onclick = () => addGuest($("gc").value, $("gk").value);
  $("gn").onkeydown = (e) => { if (e.key === "Enter") $("add").click(); };
  $("surprise").onclick = () => {
    const free = [];
    countries.forEach((c) => ["r", "w"].forEach((k) => { if (!taken(c.id, k)) free.push([c.id, k]); }));
    if (!free.length) return toast("Every pairing is taken");
    // prefer countries nobody has yet, so the evening covers more ground
    const fresh = free.filter(([c]) => !state.guests.some((g) => g.c === c));
    const pool = fresh.length ? fresh : free;
    const [c, k] = pool[Math.floor(Math.random() * pool.length)];
    addGuest(c, k);
  };

  /* ---- guest list ---- */
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast("Link copied"); }
    catch (e) { prompt("Copy this link:", text); }
  }

  function renderGuests() {
    if (!state.guests.length) { $("guests").innerHTML = `<p class="empty">No guests yet.</p>`; return; }
    $("guests").innerHTML = state.guests.map((g, i) => {
      const c = WE.findCountry(g.c);
      return `<div class="guest">
        <div>
          <div class="who">${esc(g.n)}</div>
          <div class="what"><span class="dot ${g.k === "r" ? "red" : "white"}"></span>${esc(c ? c.name : g.c)} · ${colourName(g.k)}</div>
        </div>
        <div class="acts">
          <button class="btn ghost small" data-act="copy" data-i="${i}">Copy link</button>
          <button class="btn ghost small" data-act="send" data-i="${i}">Send</button>
          <button class="btn ghost small" data-act="del" data-i="${i}" aria-label="Remove ${esc(g.n)}">✕</button>
        </div>
      </div>`;
    }).join("");
  }

  $("guests").onclick = async (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const g = state.guests[+b.dataset.i];
    if (!g) return;
    const link = linkFor(g);
    if (b.dataset.act === "copy") copy(link);
    if (b.dataset.act === "send") {
      const text = `${g.n}, you're invited${state.event.e ? " to " + state.event.e : ""} 🍷 Break the seal to discover your wine: ${link}`;
      if (navigator.share) {
        try { await navigator.share({ text }); } catch (err) {}
      } else {
        window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener");
      }
    }
    if (b.dataset.act === "del" && confirm(`Remove ${g.n}? Their link will still open, but the pairing becomes free again.`)) {
      state.guests.splice(+b.dataset.i, 1);
      save();
      render();
    }
  };

  /* ---- board ---- */
  function renderBoard() {
    const who = (c, k) => state.guests.find((g) => g.c === c && g.k === k);
    $("board").innerHTML =
      `<div class="h">Country</div><div class="h">Red</div><div class="h">White</div>` +
      countries.map((c) => {
        const r = who(c.id, "r"), w = who(c.id, "w");
        return `<div class="c">${esc(c.name)}</div>
          <div class="${r ? "" : "free"}">${r ? esc(r.n) : "open"}</div>
          <div class="${w ? "" : "free"}">${w ? esc(w.n) : "open"}</div>`;
      }).join("");
  }

  /* ---- backup ---- */
  $("exp").onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "wine-evening-guests.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  $("imp").onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const s = JSON.parse(await f.text());
      if (!s.guests || !s.event) throw 0;
      state = s;
      save();
      location.reload();
    } catch (err) { toast("That file isn't a backup"); }
  };

  function render() { fillCountrySelect(); renderGuests(); renderBoard(); }
  render();
})();
