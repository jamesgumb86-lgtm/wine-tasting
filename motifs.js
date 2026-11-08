/* Fine line-art header motifs, one per country. Drawn with currentColor. */
(function () {
  const wrap = (inner) =>
    `<svg viewBox="0 0 400 160" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  // gentle rows of vines along the ground, reused by several motifs
  const vines = (y = 150) => {
    let s = "";
    for (let i = 0; i < 9; i++) {
      const x = 20 + i * 45;
      s += `<path d="M${x} ${y} q8 -10 16 0 q8 -10 16 0" opacity=".55"/>`;
    }
    return s;
  };

  const sun = (cx, cy, r, rays = 16, len = 10) => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
    for (let i = 0; i < rays; i++) {
      const a = (i / rays) * Math.PI * 2;
      const x1 = cx + Math.cos(a) * (r + 5), y1 = cy + Math.sin(a) * (r + 5);
      const x2 = cx + Math.cos(a) * (r + 5 + len), y2 = cy + Math.sin(a) * (r + 5 + len);
      s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" opacity=".7"/>`;
    }
    return s;
  };

  window.MOTIFS = {
    fr: wrap(`
      <path d="M0 140 Q100 120 200 135 T400 128"/>
      <path d="M200 14 L200 22 M196 22 h8 L214 70 h-28 Z M188 70 h24 l10 30 h-44 Z M174 100 h52 l16 40 h-26 q-16 -28 -32 0 h-26 Z"/>
      <path d="M190 52 l20 0 M182 86 l36 0" opacity=".6"/>
      ${vines(152)}`),
    it: wrap(`
      <path d="M0 145 Q120 95 230 120 T400 110"/>
      ${[60, 84, 300, 322, 344].map((x, i) => `<path d="M${x} ${135 - (i % 2) * 10} C${x - 9} ${105} ${x - 4} ${70} ${x} ${55 + (i % 2) * 8} C${x + 4} ${70} ${x + 9} ${105} ${x} ${135 - (i % 2) * 10} Z"/>`).join("")}
      <path d="M150 120 v-36 h110 v36"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M${158 + i * 26} 120 v-18 a9 9 0 0 1 18 0 v18"/>`).join("")}
      <path d="M150 84 h110 M156 76 h98" opacity=".6"/>`),
    es: wrap(`
      ${sun(320, 50, 18, 18, 9)}
      <path d="M140 150 V80 C140 40 160 22 200 22 C240 22 260 40 260 80 V150"/>
      <path d="M160 150 V82 C160 52 176 40 200 40 C224 40 240 52 240 82 V150"/>
      <path d="M140 80 h-20 v70 M260 80 h20 v70" opacity=".6"/>
      ${[0,1,2,3,4,5,6].map(i=>`<path d="M${168+i*10} 52 l4 -6 l4 6" opacity=".45"/>`).join("")}
      <path d="M0 150 H400"/>`),
    pt: wrap(
      [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const x = 8 + i * 48, y = 40;
        return `<rect x="${x}" y="${y}" width="44" height="44"/>
          <circle cx="${x + 22}" cy="${y + 22}" r="8"/>
          <path d="M${x + 22} ${y + 4} q8 10 0 18 q-8 -8 0 -18 M${x + 22} ${y + 40} q8 -10 0 -18 q-8 8 0 18 M${x + 4} ${y + 22} q10 8 18 0 q-8 -8 -18 0 M${x + 40} ${y + 22} q-10 8 -18 0 q8 -8 18 0" opacity=".7"/>`;
      }).join("") + `<path d="M0 110 Q50 100 100 110 T200 110 T300 110 T400 110" opacity=".6"/><path d="M0 124 Q50 114 100 124 T200 124 T300 124 T400 124" opacity=".4"/>`),
    de: wrap(`
      <path d="M0 150 Q80 140 160 148 T400 140" />
      <path d="M40 140 L150 50 L260 140" />
      ${[0,1,2,3,4].map(i=>`<path d="M${70+i*14} ${118-i*14} h${80-i*20}" opacity=".5"/>`).join("")}
      <path d="M128 64 v-26 h8 v-6 h6 v6 h8 v26 M138 38 v-14 l4 -6 l4 6 v14 M150 64 v-14 h20 v14" />
      <path d="M260 128 Q320 112 400 120" opacity=".6"/>`),
    at: wrap(`
      <path d="M0 140 L70 70 L105 100 L170 26 L230 96 L270 60 L330 118 L360 96 L400 132"/>
      <path d="M160 38 l10 -12 l12 14 l-8 -2 l-6 6 z" opacity=".7"/>
      <path d="M262 68 l8 -8 l9 10" opacity=".6"/>
      <path d="M0 150 H400" opacity=".6"/>
      ${[40,60,340,360].map(x=>`<path d="M${x} 150 l-8 -12 h5 l-6 -10 h5 l4 -10 l4 10 h5 l-6 10 h5 z" opacity=".7"/>`).join("")}`),
    gr: wrap(`
      <path d="M110 46 L200 14 L290 46 Z"/>
      <path d="M104 46 h192 M108 54 h184"/>
      ${[0,1,2,3,4,5].map(i=>{const x=124+i*30;return `<path d="M${x} 58 v74 M${x+12} 58 v74 M${x-3} 58 h18 M${x-3} 132 h18" />`}).join("")}
      <path d="M100 136 h200 M92 144 h216"/>
      <path d="M0 152 Q60 146 120 152 T240 152 T400 152" opacity=".5"/>`),
    za: wrap(`
      <path d="M0 120 L60 90 L90 52 L270 52 L300 80 L340 70 L400 104"/>
      <path d="M90 52 l20 6 l30 -4 l40 5 l40 -6 l50 4" opacity=".4"/>
      <path d="M0 132 Q50 124 100 132 T200 132 T300 132 T400 132"/>
      <path d="M0 146 Q50 138 100 146 T200 146 T300 146 T400 146" opacity=".5"/>
      ${sun(60, 30, 10, 12, 6)}`),
    au: wrap(`
      ${sun(300, 46, 22, 20, 10)}
      <path d="M40 140 C60 104 110 92 200 92 C290 92 340 104 360 140 Z"/>
      <path d="M90 116 q10 -6 20 2 M150 104 q14 -4 26 4 M230 104 q12 -6 24 2 M290 116 q8 -6 18 0" opacity=".5"/>
      <path d="M0 148 H400"/>`),
    nz: wrap(`
      <path d="M200 140 C200 100 160 60 120 70 C90 78 92 112 118 112 C138 112 140 92 126 90"/>
      <path d="M200 140 C200 100 240 60 280 70 C310 78 308 112 282 112 C262 112 260 92 274 90"/>
      <path d="M200 140 V40 C200 22 222 18 228 32 C232 44 216 50 210 40" />
      ${[0,1,2,3,4,5].map(i=>`<path d="M200 ${120-i*14} q${-20+i*2} -6 ${-30+i*3} -2 M200 ${120-i*14} q${20-i*2} -6 ${30-i*3} -2" opacity=".55"/>`).join("")}
      <path d="M0 150 H400" opacity=".5"/>`),
    cl: wrap(`
      <path d="M0 140 L60 92 L100 112 L190 34 L220 38 L300 108 L340 88 L400 130"/>
      <path d="M190 34 C192 24 200 18 208 16 M200 32 C204 22 214 16 224 14" opacity=".55"/>
      <path d="M170 52 l20 -6 l30 8" opacity=".5"/>
      <path d="M0 148 Q100 140 200 148 T400 146"/>`),
    ar: wrap(`
      ${sun(200, 52, 20, 32, 14)}
      <path d="M192 48 h4 M204 48 h4 M196 60 q4 3 8 0" opacity=".7"/>
      <path d="M0 146 L70 112 L120 128 L180 100 L240 126 L300 104 L400 140"/>
      <path d="M0 152 H400" opacity=".5"/>`)
  };
})();
