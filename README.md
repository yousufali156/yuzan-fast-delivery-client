# yuzan-fast-delivery-client

A blazing‑fast, mobile‑first **delivery web client** for food, grocery, and courier services. Built for speed, reliability, and a smooth checkout and live‑tracking experience.

> If you cloned this repo and just want to run it locally, jump to **[Quick Start](#quick-start)**.

---

## ✨ Features

* **Home feed** with categories, search, featured vendors, and deals
* **Vendor pages** with menus/catalog, ratings, opening hours, and delivery ETA
* **Cart & checkout** with promo codes, tips, and multiple addresses
* **Authentication** (email/OTP/social – pluggable)
* **Order tracking** with live status updates via WebSocket
* **Map & routing** (customer, vendor, and rider locations)
* **Payments** (Stripe by default, easily swap provider)
* **Localization (i18n)** with RTL support; sample locales `en` and `bn`
* **Responsive UI** (PWA-ready) with offline caching for core routes
* **Accessibility** (WCAG-friendly components)

---

## 🧱 Tech Stack

* **React 18 + Vite + TypeScript**
* **UI**: Tailwind CSS, Headless UI, Radix Primitives
* **State/Data**: React Query (TanStack Query) + Zustand or RTK (choose one)
* **Routing**: React Router v6
* **Networking**: Axios w/ interceptors
* **Realtime**: Socket.IO client (pluggable)
* **Maps**: Mapbox GL JS (or Leaflet fallback)
* **i18n**: i18next + react-i18next
* **Testing**: Vitest + Testing Library + Playwright (e2e optional)
* **Quality**: ESLint, Prettier, TypeScript strict

---

## 📁 Project Structure

```
└─ src/
   ├─ app/
   │  ├─ main.tsx              # App entry
   │  ├─ router.tsx            # Route config
   │  └─ providers/            # Query/Theme/I18n/Store providers
   ├─ assets/                  # Static assets
   ├─ components/              # Reusable UI components
   ├─ features/
   │  ├─ auth/
   │  ├─ cart/
   │  ├─ checkout/
   │  ├─ orders/
   │  ├─ vendors/
   │  └─ tracking/
   ├─ hooks/
   ├─ lib/                     # axios, socket, map, utils
   ├─ pages/                   # route pages (Home, Vendor, Checkout, Profile)
   ├─ store/                   # Zustand or Redux slices
   ├─ styles/                  # Tailwind config and globals
   ├─ types/                   # global TS types
   └─ i18n/                    # locale files
```

---

## 🔧 Requirements

* Node.js **>= 18** and npm or pnpm/yarn
* A running **API server** (see `VITE_API_BASE_URL` below)
* Optional: Map provider key, Stripe publishable key, Socket server URL

---

## ⚡ Quick Start

```bash
# 1) Install deps
pnpm install    # or: npm install / yarn

# 2) Create environment file
cp .env.example .env

# 3) Run dev server
pnpm dev        # or: npm run dev / yarn dev

# 4) Build for production
pnpm build      # output to /dist
pnpm preview    # serve built assets locally
```

---

## 🔐 Environment Variables

Create a `.env` (or `.env.local`) with the following keys:

```ini
# Core
VITE_APP_NAME=yuzan-fast-delivery
VITE_API_BASE_URL=https://api.example.com
VITE_SOCKET_URL=https://realtime.example.com

# Maps (choose one provider)
VITE_MAPBOX_TOKEN=your_mapbox_public_token
# OR
VITE_GOOGLE_MAPS_KEY=your_google_maps_browser_key

# Payments
VITE_STRIPE_PK=pk_test_123456789

# i18n
VITE_DEFAULT_LOCALE=en
VITE_FALLBACK_LOCALE=en
```

> ⚠️ Never commit secrets. Use project/CI secrets or environment provisioning in your host.

---

## 🛒 Key Flows

1. **Browse vendors** → filter by cuisine/category, delivery fee, ETA
2. **Add items to cart** → upsells, modifiers, special instructions
3. **Address & delivery options** → save multiple addresses; scheduled delivery
4. **Payment** → third‑party provider; handle SCA/3DS if enabled
5. **Order tracking** → listen on `order:{id}` via WebSocket; map driver location
6. **Support & issues** → in‑app chat/email; SLA timers

---

## 🔌 API Contracts (example)

These are **illustrative**; adjust to your backend.

### Auth

* `POST /auth/otp` → { phoneOrEmail }
* `POST /auth/verify` → { code, token }
* `GET /me` → returns profile, addresses, preferences

### Vendors & Catalog

* `GET /vendors?lat=..&lng=..&q=..&category=..`
* `GET /vendors/:id`
* `GET /vendors/:id/items`

### Cart & Orders

* `POST /cart` → create/update (idempotent)
* `POST /orders` → create order
* `GET /orders/:id`
* WebSocket channel: `order:{id}` → `{ status, eta, driverLocation }`

---

## 🧪 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 4173",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "e2e": "playwright test"
  }
}
```

---

## 🎨 Theming & UI

* Tailwind configured in `tailwind.config.ts` with design tokens
* Light/dark mode via `data-theme` attribute
* Reusable components in `src/components` (Button, Input, Card, Sheet, Dialog)
* Skeleton loaders & optimistic updates for snappy UX

---

## 🌍 Localization (i18n)

* Add new locales under `src/i18n/locales/<code>.json`
* Use `useTranslation()` and keys like `t('checkout.pay_now')`
* RTL enabled automatically for languages like Arabic

---

## 🧭 Maps & Tracking

* Map abstraction in `src/lib/map.ts`
* Driver and user markers rendered with clustering when needed
* Fallback to static ETA when realtime unavailable

---

## 💳 Payments

* Stripe Elements mounted on checkout
* 3DS handled by `stripe.confirmPayment` result states
* Swap provider by implementing `src/lib/payments/provider.ts`

---

## 🧰 Dev Tips

* Use **React Query** for server state; cache keys under `src/lib/keys.ts`
* Keep components presentational; place data hooks under `src/features/*/hooks`
* Prefer **Zod** schemas for request/response validation if used

---

## 🚀 Deployment

### Static hosting (recommended)

1. `pnpm build` → uploads `/dist` to CDN (Netlify, Vercel, Cloudflare)
2. Set env vars in host dashboard
3. Configure SPA fallback to `/index.html`

### Docker

```Dockerfile
# stage 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# stage 2: serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🧯 Troubleshooting

* **Blank page in production** → check SPA fallback and `VITE_*` envs at build time
* **Maps not loading** → invalid key or domain restrictions
* **WebSocket disconnects** → mismatched `VITE_SOCKET_URL` protocol (use wss on HTTPS)
* **CORS errors** → configure API server `Access-Control-Allow-Origin`
* **Slow first paint** → enable code‑splitting and prefetch critical routes

---

## ✅ Checklist before go‑live

* [ ] SEO: meta tags, manifest, PWA icons
* [ ] Error boundaries & toast notifications
* [ ] A11y: keyboard traps, focus states, color contrast
* [ ] Analytics + consent
* [ ] Sentry (or similar) enabled with source maps

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit with Conventional Commits (e.g., `feat(cart): add tip selector`)
4. Open a PR with screenshots and notes

---

## 📝 License

MIT © Your Company

---

## 📎 Example `.env.example`

```ini
VITE_APP_NAME=yuzan-fast-delivery
VITE_API_BASE_URL=http://localhost:4000
VITE_SOCKET_URL=ws://localhost:4001
VITE_MAPBOX_TOKEN=
VITE_STRIPE_PK=
VITE_DEFAULT_LOCALE=en
VITE_FALLBACK_LOCALE=en
```

---

## 📚 Appendix

* **Architecture decisions** tracked in `/docs/adr/*`
* **Mocks** under `/mocks` with MSW for local API stubs
* **Test accounts** documented in `/docs/test-accounts.md`

> Need a tailored README with your exact endpoints and UI? Tell me your tech choices and I’ll adapt this file for you.