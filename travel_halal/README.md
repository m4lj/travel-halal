# 🌙 Travel Halal

> A Muslim travel companion app — find mosques, halal food, and prayer times wherever you are.

**Live demo:** https://m4lj.github.io/travel-halal/

[![CI](https://github.com/M4LJ/travel-halal/actions/workflows/deploy.yml/badge.svg)](https://github.com/M4LJ/travel-halal/actions/workflows/deploy.yml)

---

## Features

### 🕌 Mosque Finder
- Detects your location and shows all mosques within 5 km
- Interactive Leaflet map with mosque markers
- Sorted by distance — nearest first
- OSM attribution, data from OpenStreetMap contributors

### 🍽️ Halal Food Finder
- Finds halal restaurants within 5 km using your GPS
- Interactive map with Leaflet
- **Featured section** — 12 globally-famous, manually curated halal restaurants
- Country filter: All / Malaysia / Indonesia / Turkey / UAE / UK / Saudi Arabia / Pakistan
- Disclaimer reminding users to verify JAKIM/MUIS/MUI certification locally

### 🕐 Prayer Reminder
- Auto-detects your timezone and selects the correct Aladhan method (JAKIM for Malaysia, MUIS for Singapore, Kemenag for Indonesia, etc.)
- Shows 6 prayer times: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
- Live countdown to the next fard prayer
- Hijri date from Aladhan's official API
- Results cached for 6 hours (sessionStorage)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v7 |
| Maps | Leaflet + react-leaflet |
| Icons | react-icons (Font Awesome) |
| Testing | Vitest |
| CI/CD | GitHub Actions → GitHub Pages |

---

## APIs Used

| API | Used for | Docs |
|-----|----------|------|
| [Aladhan](https://aladhan.com/prayer-times-api) | Prayer times + Hijri date | Free, no key needed |
| [Overpass API](https://overpass-api.de) | Mosques + halal food (OSM data) | Free, no key needed |

Both APIs are free, CORS-safe, and require no API key.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & run locally

```bash
git clone https://github.com/M4LJ/travel-halal.git
cd travel-halal
npm install
npm run dev
```

Open http://localhost:5173

### Run tests

```bash
npm test          # run once
npm run test:watch  # watch mode
```

### Build for production

```bash
npm run build
npm run preview   # preview the build locally
```

---

## Project Structure

```
src/
├── components/        # Shared UI (Navbar, Footer, ErrorBanner, SkeletonCard, etc.)
├── hooks/             # Custom React hooks (useGeolocation, useOverpass, usePrayerTimes)
├── pages/
│   ├── Home/          # Landing page — hero + feature cards
│   ├── MosqueFinder/  # Mosque map + list
│   ├── HalalFood/     # Food map + list + featured section
│   └── PrayerReminder/# Prayer times, countdown, Hijri date
└── utils/             # haversine, sessionCache, overpassQueries, methodMap
```

---

## Deployment

Deployed to **GitHub Pages** via GitHub Actions on every push to `main`.

Workflow: Lint → Vitest → Vite Build → Deploy to `gh-pages` branch

Base URL is set to `/travel-halal/` in `vite.config.js`.

---

## ⚠️ Halal Disclaimer

Nearby halal food results are **self-reported** by OpenStreetMap contributors.
Always verify halal certification locally (JAKIM, MUIS, MUI, etc.) before dining.
The Featured section is manually curated and periodically reviewed.

---

## Roadmap

- [ ] JAKIM/MUIS certified restaurant database (beyond OSM self-reported)
- [ ] Qiblat compass
- [ ] PWA / service worker for offline prayer times
- [ ] Search + filter by cuisine on the food map
- [ ] Favourite mosques & restaurants (local storage)
- [ ] Vercel / Cloudflare Pages migration

---

## License

MIT — free to use and adapt. Attribution appreciated.

---

*Built with ❤️ for Muslim travellers worldwide.*
