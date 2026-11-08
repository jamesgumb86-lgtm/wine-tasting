/* Guest page: reveal, suggestions, lock-in and send to the host. */
(function () {
  const app = document.getElementById("app");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2400);
  }

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  function readInvite() {
    const params = new URLSearchParams(location.search);
    let code = params.get("i");
    if (!code && location.hash.length > 1) code = new URLSearchParams(location.hash.slice(1)).get("i");
    return code ? { code, data: WE.decodeInvite(code) } : null;
  }

  function fmtDate(d) {
    if (!d) return "";
    const dt = new Date(d + "T12:00:00");
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  }

  /* ---------------- no invite ---------------- */
  function renderNoInvite(bad) {
    app.innerHTML = `
      <div class="invite">
        <div class="invite-card fade-in">
          <div class="eyebrow">By invitation</div>
          <h1>A <em>wine</em> evening</h1>
          <p>${bad ? "That invitation link doesn't look quite right. Paste the full link your host sent you." : "Each guest has their own invitation link. Open the one your host sent you, or paste it here."}</p>
          <div class="field" style="margin-top:26px;text-align:left">
            <label for="paste">Your invitation link</label>
            <input type="text" id="paste" placeholder="https://…" autocomplete="off">
          </div>
          <button class="btn" id="go">Open invitation</button>
        </div>
      </div>`;
    document.getElementById("go").onclick = () => {
      const v = document.getElementById("paste").value.trim();
      const m = v.match(/[?#&]i=([A-Za-z0-9_-]+)/) || v.match(/^([A-Za-z0-9_-]{20,})$/);
      if (!m) return toast("Paste the whole link");
      location.search = "?i=" + m[1];
    };
  }

  /* ---------------- sealed invitation ---------------- */
  function renderSealed(inv, onOpen) {
    const d = inv.data;
    app.innerHTML = `
      <div class="invite">
        <div class="invite-card fade-in">
          <div class="eyebrow">${esc(d.e || "A wine evening")}</div>
          <h1>For <em>${esc(d.n)}</em></h1>
          <p>${d.d ? esc(fmtDate(d.d)) + "<br>" : ""}${esc(d.h || "Your host")} has chosen a country and a colour for you.</p>
          <button class="seal" id="seal" aria-label="Break the seal and reveal your wine"><span>Break the seal</span></button>
        </div>
      </div>`;
    document.getElementById("seal").onclick = () => {
      store.set("we-opened-" + inv.code, true);
      onOpen();
    };
  }

  /* ---------------- main reveal ---------------- */
  function priceRows(w) {
    const min = Math.min(...w.buy.map((b) => b.price));
    const distinct = new Set(w.buy.map((b) => b.price)).size > 1;
    return w.buy.map((b) => {
      const link = WE.shopLink(b.shop, w.name);
      const shop = link ? `<a href="${link}" target="_blank" rel="noopener">${esc(b.shop)} ↗</a>` : `<span class="shop">${esc(b.shop)}</span>`;
      const best = distinct && b.price === min ? `<span class="best">Best</span>` : "";
      return `<div class="price-row"><div>${shop}${best}</div><div class="amt">${b.approx ? "<small>about</small>" : ""}${WE.money(b.price)}</div></div>`;
    }).join("");
  }

  function wineCard(w) {
    return `
      <article class="wine">
        <div class="meta">${esc(w.grape)} · ${esc(w.region)}</div>
        <h3>${esc(w.name)}</h3>
        <p class="note">${esc(w.note)}</p>
        <div class="pair"><b>Pairs with</b><span>${esc(w.pair)}</span></div>
        <div class="prices">${priceRows(w)}</div>
        <div class="compare">
          <a href="${WE.compareLink(w.name)}" target="_blank" rel="noopener">Compare supermarkets ↗</a>
          <a href="${WE.wineSearcherLink(w.name)}" target="_blank" rel="noopener">All UK stockists ↗</a>
        </div>
      </article>`;
  }

  function renderReveal(inv) {
    const d = inv.data;
    const c = WE.findCountry(d.c);
    if (!c) return renderNoInvite(true);
    const colour = d.k === "r" ? "red" : "white";
    const word = c[colour];
    document.documentElement.style.setProperty("--accent", c.accent);
    document.title = `${c.name} · ${colour === "red" ? "Red" : "White"} — Wine Evening`;

    app.innerHTML = `
      <div class="wrap">
        <header class="hero">
          <p class="greeting fade-in">${esc(d.n)}, your wine comes from</p>
          <div class="motif">${window.MOTIFS[c.id] || ""}</div>
          <div class="eyebrow fade-in d1">Your country</div>
          <h1 class="fade-in d1">${esc(c.name)}</h1>
          ${c.native !== c.name ? `<div class="native fade-in d2">${esc(c.native)}</div>` : ""}
          <div class="pill fade-in d2"><span class="dot ${colour}"></span>${colour === "red" ? "Red" : "White"} · ${esc(word)}</div>
          <p class="intro fade-in d3">${esc(c.intro)}</p>
        </header>

        <div class="rule"><span class="diamond"></span></div>

        <section class="block">
          <div class="block-head">
            <div class="eyebrow">Inspiration</div>
            <h2>A few bottles to consider</h2>
            <p>Examples only — bring any ${colour} wine from ${esc(c.name)} that takes your fancy, roughly £10–£20.</p>
          </div>
          <div class="wines">${c.wines[colour].map(wineCard).join("")}</div>
          <p class="freedom">Found something else you love? Even better. Go with your instinct.</p>
        </section>

        <div class="rule"><span class="diamond"></span></div>

        <section class="block" id="lockBlock"></section>

        <footer>
          Prices are guides gathered ${esc(window.WINE_DATA.updated)}; “about” means a typical shelf price.<br>
          Offers change weekly — use the compare links for today's best deal.<br>
          Please drink responsibly. ${esc(c.toast)}!
        </footer>
      </div>`;

    renderLock(inv, c, colour);
  }

  /* ---------------- lock-in ---------------- */
  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const max = 1200;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        cv.toBlob((blob) => resolve({ blob, dataUrl: cv.toDataURL("image/jpeg", 0.72) }), "image/jpeg", 0.82);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
      img.src = url;
    });
  }

  function dataUrlToFile(dataUrl, name) {
    const [head, b64] = dataUrl.split(",");
    const mime = head.match(/:(.*?);/)[1];
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new File([arr], name, { type: mime });
  }

  function message(d, c, colour, lock) {
    return [
      `🍷 ${d.n} is locked in${d.e ? " for " + d.e : ""}`,
      `Country: ${c.name} (${colour === "red" ? "Red" : "White"})`,
      `Wine: ${lock.wine}`,
      lock.vintage ? `Vintage: ${lock.vintage}` : "",
      lock.shop ? `Bought from: ${lock.shop}` : "",
      lock.price ? `Price: £${Number(lock.price).toFixed(2)}` : "",
      "Bottle photo attached 📸"
    ].filter(Boolean).join("\n");
  }

  function waLink(d, text) {
    const num = (d.p || "").replace(/[^\d]/g, "").replace(/^0/, "44");
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  }

  async function sendToHost(d, c, colour, lock, statusEl) {
    const text = message(d, c, colour, lock);
    const file = lock.photo ? dataUrlToFile(lock.photo, `${d.n.replace(/\W+/g, "-")}-${c.name.replace(/\W+/g, "-")}.jpg`) : null;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text, title: "My wine for the evening" });
        return true;
      } catch (e) {
        if (e && e.name === "AbortError") return false;
      }
    }
    // Fallback: open WhatsApp with the text, the guest attaches the photo themselves.
    statusEl.innerHTML = `Your browser can't attach the photo automatically. WhatsApp will open with your details — just add the bottle photo before sending.`;
    window.open(waLink(d, text), "_blank", "noopener");
    return true;
  }

  function renderLock(inv, c, colour) {
    const d = inv.data;
    const key = "we-lock-" + inv.code;
    const block = document.getElementById("lockBlock");
    const host = d.h || "your host";
    const saved = store.get(key);

    if (saved && saved.sent) {
      block.innerHTML = `
        <div class="lock locked">
          <div class="stamp">Locked in</div>
          <h3>${esc(saved.wine)}</h3>
          <p class="detail">${[saved.vintage, saved.shop, saved.price ? "£" + Number(saved.price).toFixed(2) : ""].filter(Boolean).map(esc).join(" · ")}</p>
          ${saved.photo ? `<img src="${saved.photo}" alt="Your bottle">` : ""}
          <p class="hint">Sent to ${esc(host)}. See you on the night.</p>
          <div class="actions">
            <button class="btn ghost" id="resend">Send to ${esc(host)} again</button>
            <button class="btn ghost" id="change">I've changed my mind</button>
          </div>
          <p class="hint" id="lockStatus"></p>
        </div>`;
      document.getElementById("resend").onclick = () => sendToHost(d, c, colour, saved, document.getElementById("lockStatus"));
      document.getElementById("change").onclick = () => {
        saved.sent = false;
        store.set(key, saved);
        renderLock(inv, c, colour);
      };
      return;
    }

    const draft = saved || {};
    block.innerHTML = `
      <div class="block-head">
        <div class="eyebrow">Your choice</div>
        <h2>Lock in your bottle</h2>
        <p>Once you've bought it, add the details and a photo of the label. It goes straight to ${esc(host)} so she can prepare her tasting notes.</p>
      </div>
      <form class="lock" id="lockForm" novalidate>
        <div class="field">
          <label for="wine">Wine name</label>
          <input type="text" id="wine" required placeholder="e.g. ${esc(c.wines[colour][0].name)}" value="${esc(draft.wine || "")}">
        </div>
        <div class="two">
          <div class="field">
            <label for="shop">Bought from</label>
            <input type="text" id="shop" placeholder="Supermarket or shop" value="${esc(draft.shop || "")}">
          </div>
          <div class="field">
            <label for="vintage">Vintage</label>
            <input type="text" id="vintage" inputmode="numeric" placeholder="e.g. 2023" value="${esc(draft.vintage || "")}">
          </div>
        </div>
        <div class="field">
          <label for="price">Price paid (£, optional)</label>
          <input type="number" id="price" step="0.01" min="0" inputmode="decimal" value="${esc(draft.price || "")}">
        </div>
        <div class="field">
          <label>Bottle photo</label>
          <div class="photo-drop" id="drop">
            ${draft.photo ? `<img src="${draft.photo}" alt="Your bottle">` : `<div><span class="cam">Photograph the label</span>Tap to take a photo or choose one</div>`}
            <input type="file" id="photo" accept="image/*" capture="environment" aria-label="Bottle photo">
          </div>
        </div>
        <button class="btn" type="submit" id="lockBtn">Lock in &amp; send to ${esc(host)}</button>
        <p class="err" id="lockErr" hidden></p>
        <p class="hint" id="lockStatus"></p>
      </form>`;

    const state = { photo: draft.photo || null };
    document.getElementById("photo").onchange = async (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      try {
        const { dataUrl } = await compressImage(f);
        state.photo = dataUrl;
        const drop = document.getElementById("drop");
        const old = drop.querySelector("img, div");
        if (old) old.remove();
        const img = document.createElement("img");
        img.src = dataUrl;
        img.alt = "Your bottle";
        drop.prepend(img);
      } catch (err) {
        toast("Couldn't read that photo — try another");
      }
    };

    document.getElementById("lockForm").onsubmit = async (e) => {
      e.preventDefault();
      const err = document.getElementById("lockErr");
      const lock = {
        wine: document.getElementById("wine").value.trim(),
        shop: document.getElementById("shop").value.trim(),
        vintage: document.getElementById("vintage").value.trim(),
        price: document.getElementById("price").value.trim(),
        photo: state.photo
      };
      if (!lock.wine) { err.hidden = false; err.textContent = "Add the name of your wine."; return; }
      if (!lock.photo) { err.hidden = false; err.textContent = "Add a photo of the bottle for " + host + "."; return; }
      err.hidden = true;
      if (!store.set(key, lock)) { lock.photoTooBig = true; store.set(key, { ...lock, photo: null }); }
      const btn = document.getElementById("lockBtn");
      btn.disabled = true;
      const sent = await sendToHost(d, c, colour, lock, document.getElementById("lockStatus"));
      btn.disabled = false;
      if (sent) {
        lock.sent = true;
        if (!store.set(key, lock)) store.set(key, { ...lock, photo: null });
        setTimeout(() => renderLock(inv, c, colour), 400);
      }
    };
  }

  /* ---------------- boot ---------------- */
  const inv = readInvite();
  if (!inv) return renderNoInvite(false);
  if (!inv.data) return renderNoInvite(true);
  if (inv.data.d) document.getElementById("topDate").textContent = fmtDate(inv.data.d);
  const opened = store.get("we-opened-" + inv.code);
  if (opened) renderReveal(inv);
  else renderSealed(inv, () => { window.scrollTo(0, 0); renderReveal(inv); });
})();
