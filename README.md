# 샌프란꼬 (Sanfrankko)

A San Francisco travel guide that installs to your phone's home screen like an app (PWA). No app store needed: just share the link.

**Live:** https://js0kor.github.io/sf-guide/

## Features
- Interactive map with places, categories, and distances from the hotel and conference venue
- Suggested 3-day itinerary and a custom route planner
- Running and cycling routes, plus bike and scooter rental info
- Tip calculator, currency conversion, emergency contacts, and a packing checklist
- Works offline once opened (map data is embedded in the page)

## Files
- `index.html`: the app (map data embedded)
- `manifest.webmanifest`: app name, icons, and full-screen settings
- `sw.js`: service worker for offline caching
- `icons/`: home screen icons (`icon.svg` is the vector source)

## Install on your phone
- **iPhone:** open the link in Safari → Share → "Add to Home Screen"
- **Android:** open the link in Chrome → menu (⋮) → "Install app" or "Add to Home screen"

## Run locally
```
python3 -m http.server 8765
```
Then open http://localhost:8765.

## Updating
After editing `index.html`, bump `VERSION` in `sw.js` (e.g. `sf-guide-v3` → `sf-guide-v4`) and push. Installed copies pick up the new version the next time they open.

If the home screen icon or name doesn't update on a phone, remove the app from the home screen and add it again.

## Notes
- Favorites, visited places, routes, and checklists are saved on each device only (no cross-device sync).
- The app UI is in Korean.
