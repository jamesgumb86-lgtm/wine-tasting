/* Shared helpers: invite encoding, money formatting, retailer links. */
(function () {
  const KEY = "vino-veritas";

  function xor(bytes) {
    const out = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ KEY.charCodeAt(i % KEY.length);
    return out;
  }

  function encodeInvite(obj) {
    const bytes = xor(new TextEncoder().encode(JSON.stringify(obj)));
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function decodeInvite(str) {
    try {
      let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const obj = JSON.parse(new TextDecoder().decode(xor(bytes)));
      return obj && obj.n && obj.c && obj.k ? obj : null;
    } catch (e) {
      return null;
    }
  }

  const money = (n) => "£" + Number(n).toFixed(2);

  const q = (s) => encodeURIComponent(s);
  const SHOP_SEARCH = {
    "Tesco": (n) => `https://www.tesco.com/groceries/en-GB/search?query=${q(n)}`,
    "Sainsbury's": (n) => `https://www.sainsburys.co.uk/gol-ui/SearchResults/${q(n)}`,
    "Waitrose": (n) => `https://www.waitrose.com/ecom/shop/search?searchTerm=${q(n)}`,
    "Waitrose Cellar": (n) => `https://www.waitrose.com/ecom/shop/search?searchTerm=${q(n)}`,
    "Asda": (n) => `https://groceries.asda.com/search/${q(n)}`,
    "Morrisons": (n) => `https://groceries.morrisons.com/search?entry=${q(n)}`,
    "Ocado": (n) => `https://www.ocado.com/search?entry=${q(n)}`,
    "M&S": (n) => `https://www.ocado.com/search?entry=${q(n)}`,
    "Majestic": (n) => `https://www.majestic.co.uk/search?Ntt=${q(n)}`,
    "Aldi": (n) => `https://www.aldi.co.uk/results?q=${q(n)}`,
    "The Wine Society": (n) => `https://www.thewinesociety.com/search?q=${q(n)}`
  };

  // Strip own-label prefixes so comparison searches find the actual wine
  const searchName = (name) =>
    name.replace(/^(Waitrose (No\.1|Blueprint|Edition Limitée)|Tesco Finest|Sainsbury's Taste the Difference|Asda Extra Special|Morrisons The Best|M&S Collection|M&S|Aldi Specially Selected|Co-op Irresistible|Lidl)\s+/i, "");

  function shopLink(shop, wineName) {
    const fn = SHOP_SEARCH[shop];
    return fn ? fn(wineName) : null;
  }
  const compareLink = (name) => `https://www.trolley.co.uk/search/?q=${q(name)}`;
  const wineSearcherLink = (name) =>
    `https://www.wine-searcher.com/find/${q(searchName(name).toLowerCase()).replace(/%20/g, "+")}/1/uk`;

  function findCountry(id) {
    return window.WINE_DATA.countries.find((c) => c.id === id);
  }

  window.WE = { encodeInvite, decodeInvite, money, shopLink, compareLink, wineSearcherLink, findCountry };
})();
