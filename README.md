# SteveShip

A responsive shipping/logistics website built with plain HTML, CSS and JavaScript.

## Files

- `index.html` — page structure and content
- `css/style.css` — responsive design system, components and animations
- `js/script.js` — mobile navigation, scroll reveals, counters, tracking demo and quote-form feedback

## Run

Open `index.html` directly in a browser, or use VS Code Live Server.

## Demo tracking

Try:

`STV-20481`

The tracking form is intentionally front-end only. Connect it to your real tracking API/backend when the site is ready for production.

## Design approach

The site uses a performance-conscious approach: CSS transforms/opacity for motion, IntersectionObserver for scroll reveals, semantic HTML, keyboard-visible focus states and a reduced-motion fallback. These follow the uploaded modern web design guidance. The source recommends performance-first design, progressive enhancement, purposeful micro-interactions and reduced-motion support.
