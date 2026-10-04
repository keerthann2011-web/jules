# Oasis Brewery

A craft brewpub landing page built from a design export.

## Features & Motion System
- Built with React, Tailwind CSS v3, and Vite.
- Implements a unified motion system in `src/motion` using GSAP (ScrollTrigger, Parallax, WaveDivider, Marquee) and Framer Motion (Page Transitions, Modals).
- Includes an animated SVG loader with liquid fill and overflowing foam effects.
- Features a robust GSAP pinned ScrollTrigger SVG animation pour scene in `src/sections/BeerPourScene.tsx`.
- Interactive animated craft flight cards using Framer Motion with simulated ABV/IBU visual indicators.
- Reviews section utilizes an infinite scrolling marquee for tags and an interactive auto-counting slider.
- Includes a live Open/Closed badge simulating IST timezone logic.

## Usage
- Run `npm run dev` to start locally.
- Run `npm run build` to create a production bundle.

## Menu Data & Configuration
- Menu data, categories, and items can be edited inside `src/data/menu.ts`.
- Opening hours and booking link configuration (TODO: reservego.co integration) can be customized directly in the respective component variables.
- Placeholders are used for imagery from the original design doc.

## Fallbacks & A11y
- Fully respects `prefers-reduced-motion` with minimal opacity fallbacks replacing heavy canvas/SVG animations where appropriate.
- Responsive design from 375px upward.

Cheers!
