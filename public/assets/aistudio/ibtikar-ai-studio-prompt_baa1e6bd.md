# Ibtikar — Google AI Studio: Glass Redesign Prompt

Paste PART 1 into the AI Studio chat (the app that already contains the site).
If it asks for a stylesheet, paste PART 2 into `index.css` first, then send PART 1.

---

## PART 1 — PROMPT (paste in AI Studio)

You are a senior web designer (10+ years). Restyle and re-layout my EXISTING Ibtikar website (ibt1kar.com). This is a VISUAL REFACTOR ONLY.

### HARD RULES — do not break
1. Do NOT change, translate, shorten or rewrite any text, data, prices, numbers, hashtags, section order of content items, project lists, sector lists, package details, or links.
2. Do NOT touch logos, partner logos, portfolio images/folders, or any image source. Keep every image and its zoom/lightbox/scroll-viewer behaviour exactly as it works now.
3. Do NOT touch logic: Firebase, visitor login (phone/email OTP), WhatsApp links/floating button, routing, state, filters, tabs, modals. Keep every handler, only restyle the markup/classes around them.
4. Keep the same brand: font "Thmanyah Sans" (already loaded — keep it), same colors, RTL (`dir="rtl"`, `lang="ar"`).
5. Keep it a single-page site with the same sections and anchors (home, services, packages, sectors, works, partners, about/vision, final CTA, footer).
6. Arabic text must stay 100% intact. No lorem ipsum, no emoji, no gold borders/frames.

### Design direction: "Liquid Glass on deep navy"
Same dark glass feeling the site has today, but with a cleaner grid, stronger hierarchy and consistent spacing.

**Tokens**
- Background `#070718`, surface `#0F1030`, card navy `#161845`, brand navy `#141144`
- Accent coral `#EF4A3C` (hover `#ff6252`), text `#FFFFFF`, body `#C9CBEA`, muted `#9A9CC8`, soft-coral text `#ffb3aa`
- Buttons on coral use NAVY text `#070718` (contrast), not white.

**Glass recipe** (use the classes from PART 2)
- Tint is colorless: white 10% → 3.5% gradient, 1px white 11% border, inset top highlight, `backdrop-filter: blur(22px) saturate(145%)`.
- Glass needs colour behind it: add the ambient backdrop (indigo `#4F3FD6` and coral radial glows, plus a faint 72px grid fading out after the first 14%) behind the whole page. Without it glass looks like gray boxes.
- Children of a glass panel never get their own background/border/radius. Separate with spacing and font-weight only. (Exceptions: brand colour swatches, the coral logo tile, selected filter pills.)
- Branded surfaces (featured package, final CTA, vision card) use `.ib-glass-coral`.
- Small/repeated items (chips, tags, pills, logo tiles) use `.ib-chip` (light blur 8px) for performance.

**Layout system**
- Container max-width 1200px, side padding `clamp(20px,4vw,32px)`.
- Section vertical rhythm: `padding-top: clamp(80px,10vw,128px)`.
- Every section header uses the same pattern, aligned to the start (right in RTL): glass eyebrow chip → H2 `clamp(32px,4.2vw,56px)` weight 700 line-height 1.18 → sub paragraph 18px line-height 1.95 color `#B4B6DC`, max-width 720px.
- Radii: panels 28–36px, inner media 20px, pills 999px. Touch targets ≥ 44px.
- Body line-height 1.9–2 for Arabic. H1 `clamp(46px,6.8vw,96px)` line-height 1.08.

### Section by section
1. **Nav** — a floating glass pill (not full-width bar): max-width 1200, margin-top 22px, radius 999px. Existing logo on the right, links centered, CTA "اطلب خدمتك" (coral) on the left. Keep the existing login button as a glass chip next to it. Links hidden under 900px (keep the existing mobile menu behaviour if there is one).
2. **Hero** — 2-column grid (`1.05fr / .95fr`, gap `clamp(32px,5vw,72px)`), text on the right: eyebrow chip, H1, paragraph, 2 buttons (coral primary + glass secondary), then the 3 existing benefit chips as glass chips with a coral check icon. Visual on the left: the EXISTING logo/brand card placed inside a large glass panel (radius 34px), with two small floating glass stat chips overlapping its corners (the existing 350+ and 85+). Below the hero: one glass stats bar, 4 equal columns centered (350+ / 85+ / 25 / 98%), 2 columns on mobile. Under it, an optional slow marquee of the existing service names (muted white 34% opacity, coral separators, edge fade mask).
3. **Services** — bento grid, 12 columns, gap 20px. Cards alternate spans: 7+5, then 5+7, then 6+6 (all span 12 under 900px). Each card is glass (radius 30px, padding `clamp(26px,3vw,40px)`), min-height ~300px, order inside: small stroke icon + index number (01–06) → coral tag → title (24–30px) → description (grows) → "اطلب الخدمة" link with arrow. Under the grid, one full-width `.ib-glass-coral` banner (the existing "تصميم منفرد أو حزمة خاصة" block) with its button on the left.
4. **Packages** — keep the existing service tabs/selector and their data, restyled as a glass segmented control (selected = coral pill with navy text). Cards: 3-column grid (stack under 1000px), each a glass card, flex column: title → fit text → bold scope line → check-list (grows) → full-width button pinned at the bottom so buttons align across cards. The featured/most-requested card uses `.ib-glass-coral` + a "الأكثر طلباً" badge and is lifted `translateY(-20px)` on desktop only. If a service has a different number of packages, use `repeat(auto-fit,minmax(300px,1fr))`.
5. **Sectors** — master–detail layout: grid `4fr / 8fr`. Right panel: a glass card containing a vertical, scrollable list (max-height 560px) of ALL existing sectors as rows (48px min height); the selected row gets white text, a 3px coral inset bar on the inline-start edge and a coral dot; others muted `#B4B6DC`. Left panel: a large glass detail card with the sector title (28–46px), its description, then the existing "action plan / methodology / recommended services" content (services as coral-text glass chips) and the two buttons. Stacks to one column under 1000px.
6. **Works / Portfolio** — keep the existing category filter, restyled as glass pills (active = coral with navy text). Grid: 3 columns (2 under 1000px, 1 under 700px), gap 20px. Each card: glass, padding 12px, radius 28px; media block radius 20px with `aspect-ratio: 16/10`, `object-fit: cover` (use the existing project image/cover; keep the open-folder/viewer interaction), a glass category chip overlay at top-start; below: title (20px), description (15px, grows), existing result line with a small coral dot, and the existing hashtags as tiny muted chips. All cards the same height.
7. **Partners** — one big glass panel (radius 36px), 2 columns: text + the existing stats on one side; the existing 25 partner logos on the other as a 4–5 column grid of square glass chips (radius 20px) keeping the existing click-to-preview behaviour. If a logo is dark on transparent background, give its tile a light fill `rgba(255,255,255,.92)` so it stays visible.
8. **Vision + About** — 2 equal columns: left/first = `.ib-glass-coral` vision card (large statement 24–36px weight 700, then the existing 100% / 24/7 stats); second = glass "من نحن" card (H2, paragraph, then the two existing features side by side as plain text blocks without backgrounds).
9. **Final CTA** — one large `.ib-glass-coral` panel (radius 40px, centered text, H2 up to 68px, paragraph, 2 buttons).
10. **Footer** — a glass panel with 3 groups (logo + tagline, links, contact: site, @ibt1kar, phone as currently written). Copyright line below, muted. Keep the floating WhatsApp button.

### Motion & accessibility
- Hover: cards lift 6px with a brighter border; buttons lift 3px; 0.25–0.35s ease. Respect `prefers-reduced-motion`.
- Visible `:focus-visible` outline (2px coral). Real `<button>`/`<a>` elements; `aria-label` on icon-only buttons. Text contrast ≥ 4.5:1 over the busiest glow area.
- Responsive: test 390px, 768px, 1024px, 1440px. No horizontal scroll. Wide tables/lists scroll inside their own box.
- Safari fallback: keep `-webkit-backdrop-filter`. Do not use SVG-filter refraction.

### Deliverable
Return the updated code only for what changed (styles + markup/classes). Before finishing, confirm: (a) every original text, logo, image, number and link is still present, (b) login, filters, tabs, sector selector and lightbox still work, (c) no console errors.

---

## PART 2 — CSS (paste into `index.css`, after existing imports)

```css
/* ===== Ibtikar Liquid Glass — add to global CSS ===== */
:root{
  --ib-bg:#070718; --ib-surface:#0F1030; --ib-card:#161845; --ib-navy:#141144;
  --ib-coral:#EF4A3C; --ib-coral-hover:#ff6252; --ib-indigo:#4F3FD6;
  --ib-text:#ffffff; --ib-body:#C9CBEA; --ib-muted:#9A9CC8; --ib-coral-soft:#ffb3aa;
}

.ib-page{position:relative;overflow:hidden;background:var(--ib-bg);color:var(--ib-text)}
.ib-page > .ib-content{position:relative;z-index:1}

/* Ambient backdrop: glass needs colour behind it */
.ib-backdrop{position:absolute;inset:0;pointer-events:none;z-index:0}
.ib-backdrop .grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
  background-size:72px 72px;
  -webkit-mask-image:linear-gradient(180deg,#000,transparent 14%);mask-image:linear-gradient(180deg,#000,transparent 14%)}
.ib-glow{position:absolute;width:860px;height:860px;border-radius:50%}
.ib-glow.indigo{background:radial-gradient(circle,rgba(79,63,214,.5),rgba(79,63,214,0) 68%)}
.ib-glow.coral{background:radial-gradient(circle,rgba(239,74,60,.36),rgba(239,74,60,0) 68%)}
/* usage: place 7–8 glows down the page, alternating sides, e.g.
   <div class="ib-glow indigo" style="top:-6%;right:-14%"></div>
   <div class="ib-glow coral"  style="top:4%;left:-16%"></div>
   <div class="ib-glow coral"  style="top:19%;right:-18%"></div>
   <div class="ib-glow indigo" style="top:34%;left:-18%"></div>
   <div class="ib-glow indigo" style="top:50%;right:-16%"></div>
   <div class="ib-glow coral"  style="top:62%;left:-14%"></div>
   <div class="ib-glow coral"  style="top:78%;right:-14%"></div>
   <div class="ib-glow indigo" style="bottom:-6%;left:-12%"></div> */

/* Glass surfaces */
.ib-glass{
  background:linear-gradient(155deg,rgba(255,255,255,.10),rgba(255,255,255,.035) 55%,rgba(255,255,255,.06));
  border:1px solid rgba(255,255,255,.11);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.24),inset 1px 0 0 rgba(255,255,255,.07),inset 0 -1px 0 rgba(255,255,255,.04),0 24px 60px rgba(2,2,20,.45);
  -webkit-backdrop-filter:blur(22px) saturate(145%);backdrop-filter:blur(22px) saturate(145%)}
.ib-chip{
  background:linear-gradient(155deg,rgba(255,255,255,.10),rgba(255,255,255,.04));
  border:1px solid rgba(255,255,255,.13);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.2);
  -webkit-backdrop-filter:blur(8px) saturate(130%);backdrop-filter:blur(8px) saturate(130%)}
.ib-glass-coral{
  background:linear-gradient(155deg,rgba(239,74,60,.30),rgba(239,74,60,.10) 60%,rgba(255,255,255,.05));
  border:1px solid rgba(239,74,60,.55);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 30px 80px rgba(239,74,60,.22),0 24px 60px rgba(2,2,20,.45);
  -webkit-backdrop-filter:blur(22px) saturate(150%);backdrop-filter:blur(22px) saturate(150%)}

/* Layout */
.ib-container{max-width:1200px;margin:0 auto;padding-inline:clamp(20px,4vw,32px)}
.ib-sec{padding-top:clamp(80px,10vw,128px)}
.ib-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(32px,5vw,72px);align-items:center}
.ib-bento{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:20px}
.ib-c7{grid-column:span 7}.ib-c5{grid-column:span 5}.ib-c6{grid-column:span 6}
.ib-pk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;align-items:stretch}
.ib-split{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:20px;align-items:stretch}
.ib-works-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.ib-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.ib-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}
.ib-logos{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}

@media (min-width:1001px){.ib-pk-feat{transform:translateY(-20px)}}
@media (max-width:1000px){
  .ib-hero,.ib-split,.ib-two{grid-template-columns:minmax(0,1fr)}
  .ib-works-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:900px){.ib-bento>*{grid-column:span 12}.ib-navlinks{display:none!important}}
@media (max-width:700px){
  .ib-stats{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:28px}
  .ib-works-grid{grid-template-columns:minmax(0,1fr)}
  .ib-logos{grid-template-columns:repeat(3,minmax(0,1fr))}
}

/* Section header pattern */
.ib-eyebrow{display:inline-block;padding:7px 16px;border-radius:999px;font-size:14px;font-weight:600;color:#ffd0ca}
.ib-h2{margin:0;font-size:clamp(32px,4.2vw,56px);line-height:1.18;font-weight:700}
.ib-sub{margin:0;font-size:18px;line-height:1.95;color:#B4B6DC;max-width:720px}

/* Buttons */
.ib-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;box-sizing:border-box;
  padding:14px 28px;border-radius:999px;font-weight:700;font-size:16px;transition:transform .25s ease,background .25s ease,border-color .25s ease}
.ib-btn:hover{transform:translateY(-3px)}
.ib-btn-coral{background:var(--ib-coral);color:#070718}
.ib-btn-coral:hover{background:var(--ib-coral-hover)}

/* Cards, rows, pills */
.ib-lift{transition:transform .35s ease,border-color .35s ease}
.ib-lift:hover{transform:translateY(-6px);border-color:rgba(255,255,255,.28)}
.ib-pill{cursor:pointer;min-height:44px;padding:11px 20px;border-radius:999px;font-size:15px;font-weight:600;color:#D5D6F0;transition:background .2s,border-color .2s,color .2s}
.ib-pill:hover{border-color:var(--ib-coral)}
.ib-pill.is-active{background:var(--ib-coral);color:#070718;border-color:var(--ib-coral)}
.ib-row{width:100%;text-align:start;background:none;border:none;border-radius:16px;padding:14px 18px;min-height:48px;
  font-size:16px;font-weight:600;color:#B4B6DC;display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;transition:color .2s}
.ib-row:hover{color:#fff}
.ib-row.is-active{color:#fff;box-shadow:inset -3px 0 0 var(--ib-coral)}   /* RTL: bar on the right edge */
.ib-row .dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2)}
.ib-row.is-active .dot{background:var(--ib-coral)}
.ib-scroll-y{overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.25) transparent}

/* Marquee (optional) */
@keyframes ib-tick{from{transform:translateX(0)}to{transform:translateX(50%)}}
.ib-marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.ib-marquee .track{display:flex;width:max-content;animation:ib-tick 48s linear infinite;font-size:clamp(22px,2.6vw,34px);font-weight:700;white-space:nowrap;color:rgba(255,255,255,.34)}
@media (prefers-reduced-motion:reduce){.ib-marquee .track{animation:none}.ib-lift,.ib-btn{transition:none}}

:focus-visible{outline:2px solid var(--ib-coral);outline-offset:3px}
```
