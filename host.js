/* Host table: assign guests to slots, share short codes, preview countries. */
(function () {
  const KEY = "we-host-v1";
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const countries = window.WINE_DATA.countries;
  const EV = window.EVENT || {};

  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  state = state || { guests: [] };
  state.guests = state.guests || [];

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2200);
  }

  if (EV.name) $("evName").textContent = EV.name;

  const base = () => WE.siteBase();
  const shortLink = (code) => base() + "?c=" + code;
  const taken = (c, k) => state.guests.some((g) => g.c === c && g.k === k);
  const colourName = (k) => (k === "r" ? "Red" : "White");

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
    toast(`${n} — code ${WE.slotCode(c, k)}`);
  }

  $("add").onclick = () => addGuest($("gc").value, $("gk").value);
  $("gn").onkeydown = (e) => { if (e.key === "Enter") $("add").click(); };
  $("surprise").onclick = () => {
    const free = [];
    countries.forEach((c) => ["r", "w"].forEach((k) => { if (!taken(c.id, k)) free.push([c.id, k]); }));
    if (!free.length) return toast("Every pairing is taken");
    const fresh = free.filter(([c]) => !state.guests.some((g) => g.c === c));
    const pool = fresh.length ? fresh : free;
    const [c, k] = pool[Math.floor(Math.random() * pool.length)];
    addGuest(c, k);
  };

  /* ---- auto-assign ---- */
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // Pick a free slot: prefer countries nobody has yet, then the colour with fewer guests.
  function pickSlot(current) {
    const used = (c, k) => current.some((g) => g.c === c && g.k === k);
    const reds = current.filter((g) => g.k === "r").length;
    const whites = current.length - reds;
    const prefer = reds <= whites ? ["r", "w"] : ["w", "r"];
    const unusedCountries = shuffle(countries.filter((c) => !current.some((g) => g.c === c.id)));
    for (const c of unusedCountries) for (const k of prefer) if (!used(c.id, k)) return { c: c.id, k };
    for (const k of prefer) {
      const c = shuffle(countries.slice()).find((x) => !used(x.id, k));
      if (c) return { c: c.id, k };
    }
    return null;
  }

  const parseNames = (text) => text.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);

  $("auto").onclick = () => {
    const err = $("autoErr");
    const names = parseNames($("bulk").value);
    if (!names.length) { err.hidden = false; err.textContent = "Type at least one name."; return; }
    const free = countries.length * 2 - state.guests.length;
    if (names.length > free) { err.hidden = false; err.textContent = `Only ${free} slot${free === 1 ? "" : "s"} left — remove some names.`; return; }
    const existing = new Set(state.guests.map((g) => g.n.toLowerCase()));
    const dupes = names.filter((n) => existing.has(n.toLowerCase()));
    if (dupes.length && !confirm(`${dupes.join(", ")} already ${dupes.length === 1 ? "has" : "have"} a slot. Add again anyway?`)) return;
    err.hidden = true;
    names.forEach((n) => { const s = pickSlot(state.guests); state.guests.push({ n, c: s.c, k: s.k }); });
    save();
    $("bulk").value = "";
    render();
    toast(`${names.length} guest${names.length === 1 ? "" : "s"} assigned`);
    $("guests").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  $("reshuffle").onclick = () => {
    if (!state.guests.length) return;
    if (!confirm("Give everyone a new country and colour? Only do this before you've sent any codes.")) return;
    const names = shuffle(state.guests.map((g) => g.n));
    state.guests = [];
    names.forEach((n) => { const s = pickSlot(state.guests); state.guests.push({ n, c: s.c, k: s.k }); });
    save();
    render();
    toast("Reshuffled");
  };

  $("sendAll").onclick = () => {
    if (!state.guests.length) return;
    const lines = state.guests.map((g) => `${g.n}: ${WE.slotCode(g.c, g.k)}`);
    copy(`${EV.name || "Wine evening"} codes\nEnter at ${base()}\n\n${lines.join("\n")}`, "All codes");
  };

  /* ---- guest list ---- */
  async function copy(text, label) {
    try { await navigator.clipboard.writeText(text); toast(label + " copied"); }
    catch (e) { prompt("Copy this:", text); }
  }

  const inviteText = (g, code) =>
    `Hi ${g.n}! 🍷 You're invited${EV.name ? " to " + EV.name : ""}.\n\nYour code is ${code}\nEnter it here to discover your wine: ${shortLink(code)}`;

  let openPanel = null; // { i, kind: "confirm" | "swap" }

  async function shareText(text) {
    if (navigator.share) {
      try { await navigator.share({ text }); } catch (err) {}
    } else {
      window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener");
    }
  }

  function confirmPanel(g, i) {
    return `<div class="panel">
      <div class="field"><label for="cw${i}">Wine (from their photo)</label><input type="text" id="cw${i}" value="${esc(g.wine || "")}" placeholder="Wine name"></div>
      <div class="two">
        <div class="field"><label for="cv${i}">Vintage</label><input type="text" id="cv${i}" value="${esc(g.vintage || "")}" placeholder="e.g. 2023"></div>
        <div class="field"><label for="cs${i}">Bought from</label><input type="text" id="cs${i}" value="${esc(g.shop || "")}" placeholder="Shop"></div>
      </div>
      <div class="row-btns">
        <button class="btn small" data-act="saveConfirm" data-i="${i}">Confirm bottle</button>
        ${g.confirmed ? `<button class="btn ghost small" data-act="unconfirm" data-i="${i}">Undo</button>` : ""}
        <button class="btn ghost small" data-act="close" data-i="${i}">Cancel</button>
      </div>
    </div>`;
  }

  function swapPanel(g, i) {
    const opts = [];
    countries.forEach((c) => ["r", "w"].forEach((k) => {
      if (!taken(c.id, k)) opts.push(`<button class="slot-pick ${state.guests.some((x) => x.c === c.id) ? "" : "fresh"}" data-act="doSwap" data-i="${i}" data-c="${c.id}" data-k="${k}">
        <span class="dot ${k === "r" ? "red" : "white"}"></span>${esc(c.name)} ${colourName(k)}</button>`);
    }));
    return `<div class="panel">
      <p class="hint" style="text-align:left;margin:0 0 10px">Still to give out — pick ${esc(g.n)}'s new country. <span class="fresh-key">Highlighted</span> countries nobody has yet.</p>
      <div class="slot-picks">${opts.join("") || `<p class="empty">Every slot has been given out.</p>`}</div>
      <div class="row-btns" style="margin-top:12px"><button class="btn ghost small" data-act="close" data-i="${i}">Cancel</button></div>
    </div>`;
  }

  function renderGuests() {
    $("guestTools").hidden = !state.guests.length;
    const done = state.guests.filter((g) => g.confirmed).length;
    $("guestCount").textContent = state.guests.length ? `${done} of ${state.guests.length} bottles confirmed` : "";
    if (!state.guests.length) { $("guests").innerHTML = `<p class="empty">No guests yet.</p>`; return; }
    $("guests").innerHTML = state.guests.map((g, i) => {
      const c = WE.findCountry(g.c);
      const code = WE.slotCode(g.c, g.k);
      const panel = openPanel && openPanel.i === i ? (openPanel.kind === "confirm" ? confirmPanel(g, i) : swapPanel(g, i)) : "";
      return `<div class="guest ${g.confirmed ? "is-confirmed" : ""}">
        <div>
          <div class="who">${esc(g.n)} ${g.confirmed ? `<span class="badge ok">Confirmed</span>` : `<span class="badge wait">Awaiting bottle</span>`}</div>
          <div class="what"><span class="dot ${g.k === "r" ? "red" : "white"}"></span>${esc(c ? c.name : g.c)} · ${colourName(g.k)} · <span class="code">${code}</span></div>
          ${g.confirmed ? `<div class="bottle">${esc(g.wine)}${g.vintage ? " · " + esc(g.vintage) : ""}</div>` : ""}
        </div>
        <div class="acts">
          <button class="btn ${g.confirmed ? "ghost" : ""} small" data-act="confirm" data-i="${i}">${g.confirmed ? "Edit" : "Confirm"}</button>
          ${g.confirmed ? "" : `<button class="btn ghost small" data-act="swap" data-i="${i}">Swap</button>`}
          <button class="btn ghost small" data-act="send" data-i="${i}">Send code</button>
          <button class="btn ghost small" data-act="copy" data-i="${i}">Copy</button>
          <button class="btn ghost small" data-act="del" data-i="${i}" aria-label="Remove ${esc(g.n)}">✕</button>
        </div>
        ${panel}
      </div>`;
    }).join("");
    if (openPanel && openPanel.kind === "confirm") {
      const el = $("cw" + openPanel.i);
      if (el && !el.value) el.focus();
    }
  }

  $("guests").onclick = async (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const i = +b.dataset.i;
    const g = state.guests[i];
    if (!g) return;
    const act = b.dataset.act;
    const code = WE.slotCode(g.c, g.k);
    if (act === "copy") copy(code, "Code");
    if (act === "send") shareText(inviteText(g, code));
    if (act === "confirm" || act === "swap") { openPanel = openPanel && openPanel.i === i && openPanel.kind === act ? null : { i, kind: act }; renderGuests(); }
    if (act === "close") { openPanel = null; renderGuests(); }
    if (act === "saveConfirm") {
      const wine = $("cw" + i).value.trim();
      if (!wine) return toast("Add the wine name");
      Object.assign(g, { wine, vintage: $("cv" + i).value.trim(), shop: $("cs" + i).value.trim(), confirmed: true });
      openPanel = null; save(); render(); toast(`${g.n}'s bottle confirmed`);
    }
    if (act === "unconfirm") { g.confirmed = false; openPanel = null; save(); render(); }
    if (act === "doSwap") {
      const was = `${WE.findCountry(g.c).name} ${colourName(g.k)}`;
      g.c = b.dataset.c; g.k = b.dataset.k;
      delete g.wine; delete g.vintage; delete g.shop; g.confirmed = false;
      openPanel = null; save(); render();
      const now = `${WE.findCountry(g.c).name} ${colourName(g.k)}`;
      toast(`${g.n}: ${was} → ${now}`);
      const newCode = WE.slotCode(g.c, g.k);
      if (confirm(`${g.n} is now ${now}. Send them the new code (${newCode}) now?`)) {
        shareText(`Hi ${g.n}! 🍷 No problem — here's a new wine for you. Your new code is ${newCode}\nEnter it here: ${shortLink(newCode)}`);
      }
    }
    if (b.dataset.act === "del" && confirm(`Remove ${g.n}? Their code will still work, but the slot shows as free again.`)) {
      state.guests.splice(+b.dataset.i, 1);
      save();
      render();
    }
  };

  /* ---- board ---- */
  function renderBoard() {
    const who = (c, k) => state.guests.find((g) => g.c === c && g.k === k);
    const cell = (c, k) => {
      const g = who(c.id, k);
      return `<div class="slot ${g ? "" : "open"}"><span class="code">${WE.slotCode(c.id, k)}</span><small class="${g ? "" : "free"}">${g ? esc(g.n) + (g.confirmed ? " ✓" : "") : "Not given out"}</small></div>`;
    };
    const free = countries.length * 2 - state.guests.length;
    $("freeCount").textContent = `${free} of ${countries.length * 2} slots still to give out`;
    $("board").innerHTML =
      `<div class="h">Country</div><div class="h">Red</div><div class="h">White</div>` +
      countries.map((c) => `<div class="c">${esc(c.name)}</div>${cell(c, "r")}${cell(c, "w")}`).join("");
  }

  /* ---- the menu ---- */
  const confirmedInOrder = () => countries.flatMap((c) => ["w", "r"].flatMap((k) =>
    state.guests.filter((g) => g.c === c.id && g.k === k && g.confirmed)));

  function menuLink() {
    const w = confirmedInOrder().map((g) => [g.c, g.k, g.n, g.wine, g.vintage || ""]);
    return base() + "menu.html?m=" + WE.encodeInvite({ w, t: state.guests.length });
  }

  function renderMenu() {
    const list = confirmedInOrder();
    $("menuList").innerHTML = list.length
      ? list.map((g) => `<div class="menu-line"><span class="dot ${g.k === "r" ? "red" : "white"}"></span>
          <div><div class="mw">${esc(g.wine)}${g.vintage ? ` <em>${esc(g.vintage)}</em>` : ""}</div>
          <div class="mm">${esc(WE.findCountry(g.c).name)} · ${colourName(g.k)} · brought by ${esc(g.n)}</div></div></div>`).join("")
      : `<p class="empty">Confirm a guest's bottle and it appears here.</p>`;
    $("menuTools").hidden = !list.length;
  }

  $("shareMenu").onclick = () => {
    const n = confirmedInOrder().length;
    shareText(`🍷 The menu for ${EV.name || "the wine evening"} so far (${n} of ${state.guests.length} bottles):\n${menuLink()}`);
  };
  $("viewMenu").onclick = () => window.open(menuLink(), "_blank", "noopener");

  /* ---- preview gallery ---- */
  function renderGallery() {
    $("gallery").innerHTML = countries.map((c) => `
      <div class="tile">
        <div class="mini">${window.MOTIFS[c.id] || ""}</div>
        <div class="nm">${esc(c.name)}</div>
        <div class="row-btns">
          <a class="btn ghost small" href="index.html?preview=${c.id}&k=r"><span class="dot red" style="width:10px;height:10px"></span>Red</a>
          <a class="btn ghost small" href="index.html?preview=${c.id}&k=w"><span class="dot white" style="width:10px;height:10px"></span>White</a>
        </div>
      </div>`).join("");
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
      if (!Array.isArray(s.guests)) throw 0;
      state = { guests: s.guests.filter((g) => g && g.n && WE.findCountry(g.c)) };
      save();
      location.reload();
    } catch (err) { toast("That file isn't a backup"); }
  };

  function render() { fillCountrySelect(); renderGuests(); renderBoard(); renderMenu(); }
  render();
  renderGallery();
})();
