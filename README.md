# Wine Evening

An elegant invitation site for a wine-tasting evening. The host assigns each guest a country and a colour (red or white); each guest opens their personal link, breaks the seal, and sees suggested £10–£20 bottles with tasting notes, food pairings and UK prices. Once they've bought a bottle, they lock it in and the photo and details go straight to the host's WhatsApp.

## How to use it

1. **Set the event:** edit `event.js` with the event name, date and host name.
2. **Host:** open `host.html` (e.g. `https://<user>.github.io/wine-tasting/host.html`).
   - Add guests, choosing a country and colour, or use **Surprise pairing**.
   - Each of the 24 country/colour slots has a fixed five-character code. Tap **Send** to share the code and a short link, or **Copy code**.
   - **Preview the countries** shows exactly what a guest sees for any country and colour.
3. **Guest:** goes to the site → enters their code and first name → breaks the seal → filters suggestions by budget → buys any wine from their country and colour → **Lock in your bottle** with a photo → the phone's share sheet opens (pick WhatsApp → the host).

No logins or server: the guest list is saved in the host's browser (download a backup from the host page to move devices). Changing `salt` in `event.js` changes every code, so leave it alone once codes are sent.

## Files

| File | What it does |
| --- | --- |
| `index.html`, `app.js` | Guest invitation, reveal, suggestions and lock-in |
| `host.html`, `host.js` | Host table: auto-assign, codes, confirm bottles, swap guests, menu, backup |
| `menu.html` | Shareable menu of confirmed bottles |
| `event.js` | Event name, date, host and code salt |
| `data.js` | Countries, suggested wines, notes, pairings and prices |
| `motifs.js` | Line-art header for each country |
| `shared.js` | Invite encoding and retailer links |
| `styles.css` | All styling |

## Updating wines or prices

Edit `data.js`. Each wine has `buy: [{ shop, price, approx }]`; `approx: true` shows "about" before the price. Prices were gathered in November 2026 and change often, so each card also links to Trolley (supermarket comparison) and Wine-Searcher.
