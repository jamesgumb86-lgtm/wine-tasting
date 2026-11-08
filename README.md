# Wine Evening

An elegant invitation site for a wine-tasting evening. The host assigns each guest a country and a colour (red or white); each guest opens their personal link, breaks the seal, and sees suggested £10–£20 bottles with tasting notes, food pairings and UK prices. Once they've bought a bottle, they lock it in and the photo and details go straight to the host's WhatsApp.

## How to use it

1. **Host:** open `host.html` (e.g. `https://<user>.github.io/wine-tasting/host.html`).
   - Fill in the event name, date, host name and WhatsApp number.
   - Add guests one by one, choosing a country and colour, or use **Surprise pairing**.
   - Tap **Send** (or **Copy link**) next to each guest to send their personal invitation.
2. **Guest:** opens their link → breaks the seal → browses suggestions → buys any wine from their country and colour → fills in **Lock in your bottle** with a photo → it opens the phone's share sheet (pick WhatsApp → the host).

No logins or server: the guest list is saved in the host's browser (download a backup from the host page to move devices), and each invitation link carries its own assignment.

## Files

| File | What it does |
| --- | --- |
| `index.html`, `app.js` | Guest invitation, reveal, suggestions and lock-in |
| `host.html`, `host.js` | Host table: assignments, links, cellar board, backup |
| `data.js` | Countries, suggested wines, notes, pairings and prices |
| `motifs.js` | Line-art header for each country |
| `shared.js` | Invite encoding and retailer links |
| `styles.css` | All styling |

## Updating wines or prices

Edit `data.js`. Each wine has `buy: [{ shop, price, approx }]`; `approx: true` shows "about" before the price. Prices were gathered in November 2026 and change often, so each card also links to Trolley (supermarket comparison) and Wine-Searcher.
