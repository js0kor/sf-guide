# 샌프란꼬 (Sanfrankko)

A San Francisco travel guide that installs to your phone's home screen like an app (PWA). No app store needed: just share the link.

**Live:** https://js0kor.github.io/sf-guide/

## Features
- Interactive map with places, categories, and distances from the hotel and conference venue
- High-tide map toggle: NOAA flood extent for the next high tide, plus tide times
- Reopens where you left off after a trip to Google Maps
- Suggested 3-day itinerary and a custom route planner
- Running and cycling routes, plus bike and scooter rental info
- Tip calculator with a live USD→KRW exchange rate, emergency contacts, and a packing checklist
- Group expense splitting: log who paid what and get the minimal set of transfers to settle up
- Trip dates with a D-day countdown and today's suggested itinerary
- Changeable hotel location (search by name/address or use current location)
- Install prompt for iPhone and Android
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

### Phone preview in VS Code
1. Install the recommended **Mobile Preview** extension (`lirobi.phone-preview`).
2. Opening the folder starts the **앱 미리보기 서버** task (http://127.0.0.1:5173). Allow automatic tasks when VS Code asks, or run it from **Terminal → Run Task**.
3. Run **Mobile Preview: Show**. The app opens in an iPhone 17 frame (same 402×874 screen as iPhone 16 Pro) and reloads when you save.

Alternative: the **Live Preview** extension with `.vscode/phone.html` shows several phone frames side by side.

## Updating
After editing `index.html`, bump `VERSION` in `sw.js` (e.g. `sf-guide-v4` → `sf-guide-v5`) and push. Installed copies pick up the new version the next time they open.

If the home screen icon or name doesn't update on a phone, remove the app from the home screen and add it again.

## Notes
- Favorites, visited places, routes, checklists, and expenses are saved on each device only (no cross-device sync).
- Hotel search uses OpenStreetMap Nominatim; exchange rates come from open.er-api.com.
- The app UI is in Korean.
