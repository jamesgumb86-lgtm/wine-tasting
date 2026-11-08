/* Wine Evening — country data and suggested bottles.
   Prices are guide prices gathered in November 2026. "approx: true" means a typical
   shelf price rather than one checked this month. Offers change weekly, so the site
   always links to a live price comparison as well. */

window.WINE_DATA = {
  updated: "November 2026",
  countries: [
    {
      id: "fr", name: "France", native: "La France", accent: "#2b4a8b",
      red: "Rouge", white: "Blanc", toast: "Santé",
      intro: "The benchmark nation: Burgundy's silk, Bordeaux's structure, the Rhône's warmth and the Loire's freshness.",
      wines: {
        red: [
          { name: "Waitrose Edition Limitée Rasteau, Cru des Côtes du Rhône", grape: "Grenache & Syrah", region: "Southern Rhône",
            note: "Dark cherry, garrigue herbs and a peppery, warming finish.", pair: "A Sunday roast with rich gravy.",
            buy: [{ shop: "Waitrose", price: 15.99 }] },
          { name: "Les Terrasses Saint-Nicolas-de-Bourgueil", grape: "Cabernet Franc", region: "Loire Valley",
            note: "Crunchy red fruit, a hint of pencil shaving, lighter in body.", pair: "Aged hard cheeses, pork, or a butcher's pie.",
            buy: [{ shop: "Tesco", price: 11.0 }] },
          { name: "Asda Extra Special Côte de Beaune-Villages", grape: "Pinot Noir", region: "Burgundy",
            note: "Red berries, forest floor and a gentle, silky texture.", pair: "Roast duck or a mushroom bourguignon.",
            buy: [{ shop: "Asda", price: 14.48 }] }
        ],
        white: [
          { name: "Sainsbury's Taste the Difference Chablis Vieilles Vignes", grape: "Chardonnay", region: "Chablis, Burgundy",
            note: "Green apple, lemon and a flinty, mineral line — no oak.", pair: "Oysters, or pork chops in cider.",
            buy: [{ shop: "Sainsbury's", price: 16.0 }] },
          { name: "Aldi Specially Selected Pouilly-Fumé", grape: "Sauvignon Blanc", region: "Loire Valley",
            note: "Gooseberry, citrus and the smoky edge the appellation is named for.", pair: "Goat's cheese tart or grilled fish.",
            buy: [{ shop: "Aldi", price: 14.99 }] },
          { name: "Tesco Finest Picpoul de Pinet", grape: "Picpoul", region: "Languedoc",
            note: "Zesty, saline and bright — the Mediterranean in a glass.", pair: "Moules marinière or fish and chips.",
            buy: [{ shop: "Tesco", price: 10.0 }] }
        ]
      }
    },
    {
      id: "it", name: "Italy", native: "Italia", accent: "#2f6b45",
      red: "Rosso", white: "Bianco", toast: "Salute",
      intro: "Hundreds of native grapes, from Piedmont's noble Nebbiolo to Sicily's volcanic Etna.",
      wines: {
        red: [
          { name: "Tesco Finest Valpolicella Ripasso", grape: "Corvina blend", region: "Veneto",
            note: "Plump cherry, dried fig and a velvety, almost raisined richness.", pair: "Lasagne or slow-braised beef.",
            buy: [{ shop: "Tesco", price: 12.5 }] },
          { name: "M&S Etna Rosso DOC", grape: "Nerello Mascalese", region: "Mount Etna, Sicily",
            note: "Wild strawberry, smoke and fine, ashy tannins.", pair: "Seared tuna or wild mushroom pasta.",
            buy: [{ shop: "M&S", price: 14.0 }, { shop: "Ocado", price: 14.0 }] },
          { name: "Lidl Barolo", grape: "Nebbiolo", region: "Piedmont",
            note: "Roses, tar and sour cherry with grippy, serious tannins.", pair: "Truffle risotto or beef braised in red wine.",
            buy: [{ shop: "Lidl (in store)", price: 16.99 }] }
        ],
        white: [
          { name: "Zenato Villa Flora Lugana", grape: "Turbiana", region: "Lake Garda",
            note: "Almond blossom, ripe pear and a gently creamy texture.", pair: "Grilled peach and burrata salad.",
            buy: [{ shop: "Waitrose", price: 11.99 }] },
          { name: "Pieropan Soave Classico", grape: "Garganega", region: "Veneto",
            note: "Chamomile, white peach and a long, almondy finish.", pair: "Risotto primavera or roast chicken.",
            buy: [{ shop: "Waitrose", price: 15.99, approx: true }, { shop: "Majestic", price: 15.99, approx: true }] },
          { name: "Tesco Finest Gavi di Gavi", grape: "Cortese", region: "Piedmont",
            note: "Crisp lime and green almond — clean and refreshing.", pair: "Linguine with clams or crab bruschetta.",
            buy: [{ shop: "Tesco", price: 11.0, approx: true }] }
        ]
      }
    },
    {
      id: "es", name: "Spain", native: "España", accent: "#a0302a",
      red: "Tinto", white: "Blanco", toast: "Salud",
      intro: "Oak-aged Rioja, Atlantic-fresh Albariño and sun-baked Monastrell from the south-east.",
      wines: {
        red: [
          { name: "M&S Collection El Duque de Miralta Rioja Gran Reserva", grape: "Tempranillo", region: "Rioja",
            note: "Leather, vanilla and dried plum from long ageing in oak.", pair: "Chorizo, jamón, albóndigas or Manchego.",
            buy: [{ shop: "Ocado", price: 17.0 }] },
          { name: "Juan Gil Silver Label Monastrell", grape: "Monastrell", region: "Jumilla",
            note: "Blackberry jam, cocoa and a warm, generous body.", pair: "Barbecued lamb or smoky paella de carne.",
            buy: [{ shop: "Majestic", price: 14.0, approx: true }] },
          { name: "Aldi Specially Selected Baron Amarillo Rioja Gran Reserva", grape: "Tempranillo", region: "Rioja",
            note: "A budget gem: sweet spice, cedar and red fruit.", pair: "Patatas bravas and grilled pork.",
            buy: [{ shop: "Aldi", price: 9.99 }] }
        ],
        white: [
          { name: "Martín Códax Albariño", grape: "Albariño", region: "Rías Baixas, Galicia",
            note: "Peach, lime and a salty Atlantic tang.", pair: "Garlic prawns or grilled octopus.",
            buy: [{ shop: "Waitrose", price: 13.0, approx: true }, { shop: "Tesco", price: 13.0, approx: true }] },
          { name: "CVNE Monopole Blanco Seco", grape: "Viura", region: "Rioja",
            note: "Citrus, fennel and a crisp, herbal snap.", pair: "Tapas — padrón peppers, croquetas, tortilla.",
            buy: [{ shop: "Waitrose", price: 12.0, approx: true }, { shop: "Majestic", price: 12.0, approx: true }] },
          { name: "Tesco Finest Viñas del Rey Albariño", grape: "Albariño", region: "Rías Baixas, Galicia",
            note: "Juicy and aromatic — great value.", pair: "Roast salmon with a herb crust.",
            buy: [{ shop: "Tesco", price: 9.5 }] }
        ]
      }
    },
    {
      id: "pt", name: "Portugal", native: "Portugal", accent: "#1f5d7a",
      red: "Tinto", white: "Branco", toast: "Saúde",
      intro: "Some of Europe's best-value wines, from the terraced Douro to the green north.",
      wines: {
        red: [
          { name: "Morrisons The Best Douro Reserva", grape: "Touriga Nacional blend", region: "Douro",
            note: "Violets, blackcurrant and a firm, polished frame.", pair: "Slow-roast pork belly or piri-piri chicken.",
            buy: [{ shop: "Morrisons", price: 11.5 }] },
          { name: "Quinta do Crasto Douro Red", grape: "Touriga Nacional blend", region: "Douro",
            note: "Bright black fruit, floral lift and supple tannins.", pair: "Lamb chops or a hearty bean stew.",
            buy: [{ shop: "Majestic", price: 15.0, approx: true }, { shop: "Waitrose", price: 15.0, approx: true }] },
          { name: "Esporão Reserva Tinto", grape: "Aragonez blend", region: "Alentejo",
            note: "Ripe plum, spice and toasted oak — rich and smooth.", pair: "Steak or a slow-cooked beef ragù.",
            buy: [{ shop: "Waitrose", price: 18.0, approx: true }, { shop: "Majestic", price: 18.0, approx: true }] }
        ],
        white: [
          { name: "Soalheiro Alvarinho", grape: "Alvarinho", region: "Vinho Verde (Monção e Melgaço)",
            note: "Lime, white flowers and a racy, mineral finish.", pair: "Grilled sardines or sushi.",
            buy: [{ shop: "Majestic", price: 17.0, approx: true }, { shop: "Waitrose", price: 17.0, approx: true }] },
          { name: "Quinta do Ameal Loureiro", grape: "Loureiro", region: "Vinho Verde",
            note: "Bay leaf, citrus blossom and crisp acidity.", pair: "Salt-cod fritters or a herby green salad.",
            buy: [{ shop: "Waitrose Cellar", price: 16.0, approx: true }] },
          { name: "Esporão Monte Velho Branco", grape: "Antão Vaz blend", region: "Alentejo",
            note: "Tropical fruit and a soft, rounded texture.", pair: "Fish stew or roast chicken.",
            buy: [{ shop: "Waitrose", price: 10.0, approx: true }] }
        ]
      }
    },
    {
      id: "de", name: "Germany", native: "Deutschland", accent: "#8a6a1e",
      red: "Rotwein", white: "Weißwein", toast: "Prost",
      intro: "Riesling's spiritual home — steep slate slopes above the Mosel — plus elegant Spätburgunder.",
      wines: {
        red: [
          { name: "Villa Wolf Pinot Noir", grape: "Spätburgunder", region: "Pfalz",
            note: "Raspberry, cranberry and a light, silky body.", pair: "Roast salmon or cold cuts.",
            buy: [{ shop: "Majestic", price: 12.0, approx: true }, { shop: "Waitrose", price: 12.0, approx: true }] },
          { name: "Friedrich Becker Estate Pinot Noir", grape: "Spätburgunder", region: "Pfalz",
            note: "Cherry, earthy spice and fine tannins from a cult grower.", pair: "Roast duck or venison sausages.",
            buy: [{ shop: "The Wine Society", price: 19.0, approx: true }] },
          { name: "Markus Molitor Haus Klosterberg Pinot Noir", grape: "Spätburgunder", region: "Mosel",
            note: "Fragrant red fruit and a cool-climate freshness.", pair: "Mushroom risotto or roast chicken.",
            buy: [{ shop: "Independent merchants", price: 18.0, approx: true }] }
        ],
        white: [
          { name: "M&S Collection Riesling Stepp", grape: "Riesling", region: "Pfalz",
            note: "Dry, with lime, white peach and a stony finish.", pair: "Thai green curry or pork schnitzel.",
            buy: [{ shop: "M&S", price: 14.0 }] },
          { name: "Dr Loosen Blue Slate Riesling Kabinett", grape: "Riesling", region: "Mosel",
            note: "Off-dry, delicate and low alcohol — apple, honey and slate.", pair: "Spicy Asian dishes or a cheeseboard.",
            buy: [{ shop: "Waitrose", price: 16.0, approx: true }] },
          { name: "Dr L Riesling", grape: "Riesling", region: "Mosel",
            note: "Lightly sweet, zesty and easy-drinking.", pair: "Sweet-and-sour chicken or fruit desserts.",
            buy: [{ shop: "Tesco", price: 11.0, approx: true }, { shop: "Sainsbury's", price: 11.0, approx: true }] }
        ]
      }
    },
    {
      id: "at", name: "Austria", native: "Österreich", accent: "#a0283a",
      red: "Rotwein", white: "Weißwein", toast: "Prost",
      intro: "Peppery Grüner Veltliner along the Danube and vibrant Blaufränkisch in the east.",
      wines: {
        red: [
          { name: "Zantho Blaufränkisch", grape: "Blaufränkisch", region: "Burgenland",
            note: "Dark cherry, pepper and a juicy, lively acidity.", pair: "Goulash or roast pork.",
            buy: [{ shop: "Majestic", price: 13.0, approx: true }] },
          { name: "Heinrich Blaufränkisch", grape: "Blaufränkisch", region: "Burgenland",
            note: "Blackberry, graphite and fine-grained tannins.", pair: "Venison or wild mushroom pie.",
            buy: [{ shop: "Independent merchants", price: 18.0, approx: true }] },
          { name: "Winzer Krems Zweigelt", grape: "Zweigelt", region: "Kremstal",
            note: "Bright cherry and a soft, easy texture.", pair: "Charcuterie or burgers.",
            buy: [{ shop: "Majestic", price: 11.0, approx: true }] }
        ],
        white: [
          { name: "Domäne Gobelsburg Grüner Veltliner", grape: "Grüner Veltliner", region: "Kamptal",
            note: "White pepper, green apple and a lovely texture.", pair: "Wiener schnitzel or asparagus.",
            buy: [{ shop: "Waitrose Cellar", price: 16.0, approx: true }] },
          { name: "Winzer Krems Grüner Veltliner", grape: "Grüner Veltliner", region: "Kremstal",
            note: "Crisp citrus and that signature spicy twist.", pair: "Pork belly bao or a schnitzel sandwich.",
            buy: [{ shop: "Majestic", price: 11.0, approx: true }] },
          { name: "Waitrose Blueprint Grüner Veltliner", grape: "Grüner Veltliner", region: "Niederösterreich",
            note: "Fresh, peppery and great value.", pair: "Vegetable stir-fry or fish cakes.",
            buy: [{ shop: "Waitrose", price: 9.99, approx: true }] }
        ]
      }
    },
    {
      id: "gr", name: "Greece", native: "Ελλάδα", accent: "#2c5c9e",
      red: "Erythró", white: "Lefkó", toast: "Yamas",
      intro: "Ancient grapes, island vineyards and volcanic soils — a country rediscovering itself.",
      wines: {
        red: [
          { name: "Thymiopoulos Atma Xinomavro", grape: "Xinomavro", region: "Naoussa",
            note: "Tomato leaf, sour cherry and a Nebbiolo-like grip.", pair: "Stuffed vine leaves or aged goat's cheese.",
            buy: [{ shop: "Waitrose", price: 12.49 }] },
          { name: "Lyrarakis Liatiko", grape: "Liatiko", region: "Crete",
            note: "Light, spicy red fruit with a dusty, herbal edge.", pair: "Greek lamb stew (kleftiko).",
            buy: [{ shop: "Majestic", price: 13.99 }] },
          { name: "Kir-Yianni Kali Riza Xinomavro", grape: "Xinomavro", region: "Amyndeon",
            note: "Old-vine depth: dried herbs, red fruit and spice.", pair: "Moussaka or slow-roast lamb.",
            buy: [{ shop: "Vintage by Saga", price: 19.99 }] }
        ],
        white: [
          { name: "Lyrarakis Assyrtiko", grape: "Assyrtiko", region: "Crete",
            note: "Lemon, sea spray and a bone-dry, mineral finish.", pair: "Grilled sea bream or calamari.",
            buy: [{ shop: "Majestic", price: 13.99 }] },
          { name: "Co-op Irresistible Assyrtiko", grape: "Assyrtiko", region: "Greece",
            note: "Zesty citrus with a saline twist.", pair: "Seafood of any kind.",
            buy: [{ shop: "Co-op", price: 10.0 }] },
          { name: "M&S Myrtia Assyrtiko", grape: "Assyrtiko", region: "Greece",
            note: "Crisp, bright and refreshing.", pair: "Feta salad or spanakopita.",
            buy: [{ shop: "M&S", price: 12.0, approx: true }] }
        ]
      }
    },
    {
      id: "za", name: "South Africa", native: "Suid-Afrika", accent: "#b2702a",
      red: "Rooiwyn", white: "Witwyn", toast: "Gesondheid",
      intro: "Old-vine Chenin, smoky Pinotage and Mediterranean grapes thriving in the Cape.",
      wines: {
        red: [
          { name: "Bosman Nero", grape: "Nero d'Avola", region: "Wellington",
            note: "Juicy plum and spice — an Italian grape in Cape sunshine.", pair: "Roast aubergine, olives or veggie lasagne.",
            buy: [{ shop: "Sainsbury's", price: 11.5 }] },
          { name: "Kanonkop Kadette Pinotage", grape: "Pinotage", region: "Stellenbosch",
            note: "Mulberry, smoke and a hint of coffee.", pair: "Braai — sausages and steak off the grill.",
            buy: [{ shop: "Waitrose", price: 13.0, approx: true }, { shop: "Majestic", price: 13.0, approx: true }] },
          { name: "Porcupine Ridge Syrah", grape: "Syrah", region: "Swartland",
            note: "Black pepper, dark fruit and smoky warmth.", pair: "Bobotie or a spicy chilli.",
            buy: [{ shop: "Sainsbury's", price: 10.0, approx: true }, { shop: "Waitrose", price: 10.0, approx: true }] }
        ],
        white: [
          { name: "Ken Forrester Old Vine Reserve Chenin Blanc", grape: "Chenin Blanc", region: "Stellenbosch",
            note: "Honeyed apple, quince and a touch of oak.", pair: "Cape Malay curry or roast pork.",
            buy: [{ shop: "Waitrose", price: 14.0, approx: true }, { shop: "Majestic", price: 14.0, approx: true }] },
          { name: "Journey's End The Haystack Chardonnay", grape: "Chardonnay", region: "Stellenbosch",
            note: "Citrus, toasted nuts and a creamy texture.", pair: "Chicken pie or buttery lobster rolls.",
            buy: [{ shop: "Majestic", price: 13.0, approx: true }] },
          { name: "Spier 21 Gables Chenin Blanc", grape: "Chenin Blanc", region: "Tygerberg",
            note: "Rich stone fruit, honey and vanilla.", pair: "Creamy pasta or roast chicken.",
            buy: [{ shop: "Independent merchants", price: 15.0, approx: true }] }
        ]
      }
    },
    {
      id: "au", name: "Australia", native: "Australia", accent: "#b84a1e",
      red: "Red", white: "White", toast: "Cheers, mate",
      intro: "Bold Barossa Shiraz, Margaret River elegance and lime-crisp Eden Valley Riesling.",
      wines: {
        red: [
          { name: "Waitrose No.1 Langmeil Barossa Valley Shiraz", grape: "Shiraz", region: "Barossa Valley",
            note: "Blackberry, chocolate and sweet spice — big and generous.", pair: "Barbecued ribs or a peppered steak.",
            buy: [{ shop: "Waitrose", price: 14.0 }] },
          { name: "Moss Wood Amy's Blend", grape: "Cabernet blend", region: "Margaret River",
            note: "Blackcurrant, cedar and polished tannins.", pair: "Salami, prosciutto or gnocchi.",
            buy: [{ shop: "Waitrose", price: 17.99 }] },
          { name: "Tesco Finest Barossa Shiraz", grape: "Shiraz", region: "Barossa Valley",
            note: "Ripe plum and vanilla — a crowd-pleaser.", pair: "Burgers or lamb kofta.",
            buy: [{ shop: "Tesco", price: 11.0 }] }
        ],
        white: [
          { name: "Pewsey Vale Eden Valley Riesling", grape: "Riesling", region: "Eden Valley",
            note: "Bone-dry, lime juice and blossom.", pair: "Thai fishcakes or prawn salad.",
            buy: [{ shop: "Waitrose", price: 13.0, approx: true }, { shop: "Majestic", price: 13.0, approx: true }] },
          { name: "d'Arenberg The Olive Grove Chardonnay", grape: "Chardonnay", region: "McLaren Vale",
            note: "Fresh nectarine with a light, creamy edge.", pair: "Roast chicken or seafood linguine.",
            buy: [{ shop: "Aldi", price: 10.0, approx: true }] },
          { name: "Yalumba Y Series Viognier", grape: "Viognier", region: "South Australia",
            note: "Apricot, honeysuckle and a soft, silky feel.", pair: "Mild curries or Moroccan tagine.",
            buy: [{ shop: "Waitrose", price: 10.0, approx: true }, { shop: "Sainsbury's", price: 10.0, approx: true }] }
        ]
      }
    },
    {
      id: "nz", name: "New Zealand", native: "Aotearoa", accent: "#2d6a5a",
      red: "Red", white: "White", toast: "Kia ora",
      intro: "The world's most recognisable Sauvignon Blanc and some of its purest Pinot Noir.",
      wines: {
        red: [
          { name: "Tesco Finest Central Otago Pinot Noir", grape: "Pinot Noir", region: "Central Otago",
            note: "Dark cherry, thyme and a silky, cool-climate finish.", pair: "Duck breast or lamb rump.",
            buy: [{ shop: "Tesco", price: 15.0, approx: true }] },
          { name: "Villa Maria Private Bin Pinot Noir", grape: "Pinot Noir", region: "Marlborough",
            note: "Raspberry and plum with gentle spice.", pair: "Salmon or mushroom tart.",
            buy: [{ shop: "Sainsbury's", price: 13.0, approx: true }, { shop: "Tesco", price: 13.0, approx: true }] },
          { name: "Mount Riley Pinot Noir", grape: "Pinot Noir", region: "Marlborough",
            note: "Fresh red fruit and a light, juicy texture.", pair: "Roast chicken or charcuterie.",
            buy: [{ shop: "Majestic", price: 13.0, approx: true }] }
        ],
        white: [
          { name: "M&S Clocktower Sauvignon Blanc", grape: "Sauvignon Blanc", region: "Marlborough",
            note: "Passion fruit, lime and cut grass.", pair: "Asparagus and bacon quiche.",
            buy: [{ shop: "M&S", price: 12.0 }] },
          { name: "Marlborough Ridge Sauvignon Blanc", grape: "Sauvignon Blanc", region: "Marlborough",
            note: "Zingy gooseberry and grapefruit.", pair: "Fried goat's cheese with honey.",
            buy: [{ shop: "Ocado", price: 10.99 }] },
          { name: "Greywacke Sauvignon Blanc", grape: "Sauvignon Blanc", region: "Marlborough",
            note: "Textured and complex — tropical fruit with a smoky edge.", pair: "Seared scallops or Thai salads.",
            buy: [{ shop: "Waitrose", price: 20.0, approx: true }, { shop: "Majestic", price: 20.0, approx: true }] }
        ]
      }
    },
    {
      id: "cl", name: "Chile", native: "Chile", accent: "#b23a3a",
      red: "Tinto", white: "Blanco", toast: "Salud",
      intro: "A long, thin ribbon between the Andes and the Pacific, with cool coastal valleys.",
      wines: {
        red: [
          { name: "Montes Alpha Cabernet Sauvignon", grape: "Cabernet Sauvignon", region: "Colchagua",
            note: "Blackcurrant, mint and a polished, oaky frame.", pair: "Rib-eye steak or lamb shoulder.",
            buy: [{ shop: "Sainsbury's", price: 16.0, approx: true }, { shop: "Waitrose", price: 16.0, approx: true }] },
          { name: "Errázuriz Max Reserva Carmenère", grape: "Carmenère", region: "Aconcagua",
            note: "Red pepper, plum and soft spice — Chile's signature grape.", pair: "Empanadas or chilli con carne.",
            buy: [{ shop: "Waitrose", price: 13.0, approx: true }, { shop: "Majestic", price: 13.0, approx: true }] },
          { name: "Luis Felipe Edwards Gran Reserva Pinot Noir", grape: "Pinot Noir", region: "Leyda Valley",
            note: "Strawberry and light spice, fresh and supple.", pair: "Grilled salmon or Parma ham.",
            buy: [{ shop: "Tesco", price: 10.5 }] }
        ],
        white: [
          { name: "Montes Alpha Chardonnay", grape: "Chardonnay", region: "Aconcagua Costa",
            note: "Pineapple, toast and a creamy, rounded finish.", pair: "Chicken in creamy sauce or crab cakes.",
            buy: [{ shop: "Sainsbury's", price: 15.0, approx: true }] },
          { name: "Cono Sur 20 Barrels Sauvignon Blanc", grape: "Sauvignon Blanc", region: "Casablanca",
            note: "Intense citrus, grapefruit and herbs.", pair: "Ceviche or goat's cheese salad.",
            buy: [{ shop: "Independent merchants", price: 17.0, approx: true }] },
          { name: "Tesco Finest Valle de Leyda Sauvignon Blanc", grape: "Sauvignon Blanc", region: "Leyda Valley",
            note: "Cool-climate crunch: lime and green apple.", pair: "Pan-fried salmon with watercress.",
            buy: [{ shop: "Tesco", price: 9.0 }] }
        ]
      }
    },
    {
      id: "ar", name: "Argentina", native: "Argentina", accent: "#3a7ab0",
      red: "Tinto", white: "Blanco", toast: "Salud",
      intro: "High-altitude vineyards in Mendoza and Salta — home of Malbec and floral Torrontés.",
      wines: {
        red: [
          { name: "M&S Collection Susana Balbo Malbec", grape: "Malbec", region: "Uco Valley, Mendoza",
            note: "Violets, blackberry and velvety tannins.", pair: "Grilled marinated steak.",
            buy: [{ shop: "M&S", price: 14.0 }, { shop: "Ocado", price: 12.5 }] },
          { name: "Trivento Private Reserve Malbec", grape: "Malbec", region: "Mendoza",
            note: "Plum, cocoa and a soft, rounded finish.", pair: "Burgers or beef empanadas.",
            buy: [{ shop: "Tesco", price: 11.0 }, { shop: "Asda", price: 11.0 }, { shop: "Waitrose", price: 11.0 }] },
          { name: "Asda Extra Special Uco Valley Malbec", grape: "Malbec", region: "Uco Valley, Mendoza",
            note: "Dark fruit with a fresh, mountain lift.", pair: "Peppered steak or chilli.",
            buy: [{ shop: "Asda", price: 12.0 }] }
        ],
        white: [
          { name: "Susana Balbo Crios Torrontés", grape: "Torrontés", region: "Salta / Mendoza",
            note: "Rose petal, lychee and citrus — wildly aromatic but dry.", pair: "Thai food or ceviche.",
            buy: [{ shop: "Waitrose", price: 12.0, approx: true }, { shop: "Majestic", price: 12.0, approx: true }] },
          { name: "Catena Chardonnay", grape: "Chardonnay", region: "Mendoza (high altitude)",
            note: "Pear, citrus and a creamy, toasty texture.", pair: "Roast chicken or buttery fish.",
            buy: [{ shop: "Waitrose", price: 15.0, approx: true }, { shop: "Majestic", price: 15.0, approx: true }] },
          { name: "Zuccardi Serie A Torrontés", grape: "Torrontés", region: "Salta",
            note: "Floral, fresh and spicy.", pair: "Spiced chicken skewers or sushi.",
            buy: [{ shop: "Independent merchants", price: 12.0, approx: true }] }
        ]
      }
    }
  ]
};

/* Budget-friendly picks (£10 and under), added to each country/colour list.
   Where no reliable sub-£10 example was found, none is listed. */
(function () {
  const add = {
    "fr-red": { name: "Aldi Château Les Trois Manoirs Médoc Cru Bourgeois", grape: "Merlot & Cabernet", region: "Médoc, Bordeaux",
      note: "Classic claret: blackcurrant, cedar and firm structure.", pair: "Lamb chops or a steak frites.",
      buy: [{ shop: "Aldi", price: 8.99 }] },
    "fr-white": { name: "Aldi Chassaux et Fils Picpoul de Pinet", grape: "Picpoul", region: "Languedoc",
      note: "Lemony, salty and refreshing.", pair: "Mussels or fish tacos.",
      buy: [{ shop: "Aldi", price: 7.99 }] },
    "it-red": { name: "Waitrose Blueprint Chianti", grape: "Sangiovese", region: "Tuscany",
      note: "Sour cherry, dried herbs and food-friendly acidity.", pair: "Pizza or spaghetti bolognese.",
      buy: [{ shop: "Waitrose", price: 8.5 }] },
    "it-white": { name: "Asda Extra Special Fiano Terre Siciliane", grape: "Fiano", region: "Sicily",
      note: "Peach, honeysuckle and a nutty, rounded feel.", pair: "Prawn curry or roast chicken.",
      buy: [{ shop: "Asda", price: 6.0 }] },
    "es-red": { name: "Asda Extra Special Marques del Norte Rioja", grape: "Tempranillo", region: "Rioja",
      note: "Strawberry, vanilla and soft oak.", pair: "Chorizo and patatas bravas.",
      buy: [{ shop: "Asda", price: 8.07 }] },
    "es-white": { name: "Aldi Specially Selected Baron Amarillo Albariño", grape: "Albariño", region: "Rías Baixas",
      note: "Zesty peach with a sea-breeze tang.", pair: "Calamari or garlic prawns.",
      buy: [{ shop: "Aldi", price: 8.99 }] },
    "pt-red": { name: "Mimo Moutinho Lisbon Red", grape: "Castelão blend", region: "Lisboa",
      note: "Juicy, smooth and easy-going.", pair: "Margherita pizza or herby roast chicken.",
      buy: [{ shop: "Aldi", price: 5.99 }] },
    "pt-white": { name: "Tesco Por do Sol Vinho Verde", grape: "Loureiro blend", region: "Vinho Verde",
      note: "Light, lightly spritzy and citrusy.", pair: "Summer rolls or salads.",
      buy: [{ shop: "Tesco", price: 5.25 }] },
    "de-white": { name: "Lidl Mosel Riesling", grape: "Riesling", region: "Mosel",
      note: "Off-dry apple and lime — very easy to like.", pair: "Ham, peaches and burrata.",
      buy: [{ shop: "Lidl (in store)", price: 4.99 }] },
    "gr-red": { name: "Skouras Agiorgitiko", grape: "Agiorgitiko", region: "Peloponnese",
      note: "Soft red fruit, sweet spice and supple tannins.", pair: "Souvlaki or lamb kebabs.",
      buy: [{ shop: "Aldi", price: 8.99 }] },
    "gr-white": { name: "M&S Found Moschofilero & Roditis", grape: "Moschofilero & Roditis", region: "Peloponnese",
      note: "Floral, grapey and crisp.", pair: "Chicken satay noodle salad.",
      buy: [{ shop: "M&S", price: 8.5 }] },
    "za-white": { name: "Waitrose Blueprint Fairtrade Chenin Blanc", grape: "Chenin Blanc", region: "Western Cape",
      note: "Apple, melon and a fresh finish.", pair: "Fried chicken sandwich.",
      buy: [{ shop: "Waitrose", price: 6.99 }] },
    "au-red": { name: "Co-op Irresistible Shiraz Cabernet", grape: "Shiraz & Cabernet", region: "South Australia",
      note: "Plummy, spicy and generous.", pair: "Burgers or sausage casserole.",
      buy: [{ shop: "Co-op", price: 9.5 }] },
    "au-white": { name: "Lidl Limestone Coast Chardonnay", grape: "Chardonnay", region: "Limestone Coast",
      note: "Ripe stone fruit with a light, creamy touch.", pair: "Courgette fritters or roast chicken.",
      buy: [{ shop: "Lidl (in store)", price: 5.99 }] },
    "cl-red": { name: "Estevez Merlot", grape: "Merlot", region: "Central Valley",
      note: "Soft plum and a smooth, easy finish.", pair: "Spaghetti bolognese or burgers.",
      buy: [{ shop: "Aldi", price: 4.69 }] },
    "ar-red": { name: "Co-op Fairtrade Organic Malbec", grape: "Malbec", region: "Mendoza",
      note: "Blackberry and violet, soft and juicy.", pair: "Chilli or beef tacos.",
      buy: [{ shop: "Co-op", price: 8.65 }] }
  };
  Object.entries(add).forEach(([key, wine]) => {
    const [id, colour] = key.split("-");
    const c = window.WINE_DATA.countries.find((x) => x.id === id);
    if (c) c.wines[colour].push(wine);
  });
})();
