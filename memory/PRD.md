# PRD — Vault 96 Quote Generator

## Original problem statement
"Build a landing page: i want a quote generator website. I will supply the quotes (96 of them) but use placeholders in the meantime. I want the end user to click an image and above the image, the quote displays. When they click the image again, the quote changes. the image should alternate between dead center of the screen and bottom center of the screen. I want the color scheme to be these four colors CED4DA,D0D4D8,202223,0F1418. use a png image as a placeholder I will replace later with a different png. quotes display font is Old Standard TT bold 700 font weight. alternative color schemes on click. make the contrasting colors are used to make sure text is visible"

Follow-up (2026-11-14): "remove top nav and all extra sections — only the generator."

## Discovery answers (verbatim)
- Purpose: A fun page to share quotes; showcase for the collection
- Quote type: Motivational / stoic, motivating to get money
- Extra action: Copy quote button
- Extra info: site should have a very very slight pixelated feel

## Architecture
- React (CRA + craco) frontend only; no backend needed. Backend scaffold left running but unused.
- /app/frontend/src/App.js — single-screen generator (quote panel, medallion, copy button)
- /app/frontend/src/quotes.js — 96 placeholder quotes (4 parts x 24), easy to replace with real quotes
- /app/frontend/public/placeholder.png — pixel hexagon placeholder (user will replace)
- Design source: /app/design/direction.html (Sovereign 96 Vault) + /app/design_guidelines.json

## What's implemented (2026-11-14)
- Single-screen page, no nav/extra sections: hero title + interactive quote console
- Click medallion → next quote (96 placeholders), theme alternates (abyssal #0F1418 / carbon #202223, always paired with light #CED4DA/#D0D4D8 text), emblem alternates dead center ↔ bottom center (padding-based, never overlaps toolbar)
- Quote font: Old Standard TT 700 (Google Fonts); body Futura; mono meta labels
- Copy Quote button with clipboard + toast
- Slight pixelated feel: dot-grid ground + pixelated image rendering
- data-testids: vault-badge, quote-text, quote-meta, quote-medallion, copy-quote-button, copy-quote-label, vault-stage

## Verified
- Click cycles quotes 1→2→3, theme alternates, position alternates center↔bottom (desktop 1920 + mobile 390)
- Copy button shows toast + "Copied" state
- Font randomization: each click picks a random serif display font (Old Standard TT, Cormorant Garamond, Playfair Display, Bodoni Moda, Gloock, Spectral, EB Garamond — all weight 700); toolbar label shows active font; initial load is always Old Standard TT 700

## Implemented later
- 2026-11-14: Font randomization per click (FONTS array in src/App.js, Google Fonts loaded in index.html)
- 2026-11-14: Keyboard advance (Space / ArrowRight advances quote; hint label under medallion); verified via keyboard.press test

## Backlog / pending user input
- P0: User to supply the real 96 quotes (currently placeholders in src/quotes.js)
- P0: User to supply their real PNG (currently /public/placeholder.png)
- P1 (spark): share/X post button alongside copy
- P2: per-quote deep link (?q=NN) for shareable quote URLs

## Backlog / pending user input
- P0: User to supply the real 96 quotes (currently placeholders in src/quotes.js)
- P0: User to supply their real PNG (currently /public/placeholder.png)
- P1 (spark): share/X post button alongside copy
- P2: per-quote deep link (?q=NN) for shareable quote URLs
