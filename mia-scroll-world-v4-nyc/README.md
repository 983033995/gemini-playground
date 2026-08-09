# Mia Across America — V4 / New York Vertical Slice

A native-scroll-controlled Three.js travel world following Mia through the first New York chapter:

1. Arrival walk
2. Street follow shot
3. Subway entrance / stairs
4. Platform wait
5. Train occlusion transition
6. Subway interior
7. Times Square exit reveal
8. Check-in / photo stamp

## Architecture

- One persistent `THREE.Scene`
- Native `window.scrollY` is the exact state
- Smoothed scroll state drives camera, Mia pose blending, train motion and atmosphere
- Scene changes are hidden behind darkness / train occlusion
- 2.5D original SVG art assets live on real Three.js planes at different Z depths
- Mia is a layered rig: front/back head, front/back body, arms, legs, backpack and camera
- Walk / stairs / wait / sit / photo poses are reversible and scroll-driven
- Mobile uses an independent camera offset / FOV rule
- `prefers-reduced-motion` reduces smoothing

## Run

Serve the directory over HTTP, then open `index.html`.

For QA jumps you can use:

- `?p=0.05`
- `?p=0.20`
- `?p=0.30`
- `?p=0.40`
- `?p=0.50`
- `?p=0.60`
- `?p=0.75`
- `?p=0.92`

The production page imports Three.js r179 from jsDelivr. All project-specific art assets are local SVG files under `public/assets/`.
