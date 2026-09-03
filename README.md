# frontend

React-gränssnittet för **Niklas Bodega** — ett vandrarhem där gäster söker rum, bokar och recenserar.

**Port (Docker/nginx):** 8087  
**Stack:** React 19, TypeScript, Vite, Tailwind CSS, Axios, React Router

I Docker byggs appen till statiska filer och serveras av nginx. I utveckling körs Vite (`npm run dev`).

## Vad den här tjänsten gör

Frontend är ett SPA. Den har ingen egen databas utan anropar de tre backend-API:erna.

| Sida | Vad den visar |
|------|----------------|
| `/` | Startsida: hero, recensionskarusell, rum |
| `/roomspage` | Rumskatalog med betyg |
| `/searchpage` | Lediga rum efter datum och antal gäster |
| `/login`, `/register` | Konto |
| `/oauth2/redirect` | Återkomst efter Google/GitHub |
| `/newBooking` | Ny bokning (inloggad) |
| `/myBookings` | Mina bokningar, avbokning, recension |
| `/settings` | Profil, logga ut överallt, radera konto |

Axios-instanser (med cookies) ligger i `src/api/AxiosConfig.ts`:

- `VITE_USER_API_URL` → user-service
- `VITE_BOOKING_API_URL` → booking-service
- `VITE_REVIEW_API_URL` → review-service

## Vad backend-tjänsterna gör

| Tjänst | Port | Ansvar |
|--------|------|--------|
| **user-service** | 8084 | Registrering, inloggning, JWT-cookie, profil, OAuth |
| **booking-service** | 8083 | Rumstyper, tillgänglighet, bokningar |
| **review-service** | 8086 | Recensioner, medelbetyg, showcase |

## Hur tjänsterna pratar med varandra

Webbläsaren pratar **direkt** med varje API (ingen API-gateway i lokal Compose). JWT ligger i cookien `jwt` (`withCredentials: true`).

```
Webbläsare (frontend)
    ├── POST /api/auth/login          → user-service
    ├── GET  /api/user                → user-service
    ├── GET  /api/rooms, /api/bookings → booking-service
    └── GET  /api/review/ratings       → review-service

Bakom kulisserna (syns inte från frontend):
    user-service    → booking-service   (aktiva bokningar vid kontoradering)
    booking-service → user-service      (finns användaren vid ny bokning?)
    review-service  → user-service      (visningsnamn vid ny recension)
```

Vite bakas in API-URL:erna vid **build**. Ändrade `VITE_*` kräver ombyggnad av frontend-containern.

## Starta hela systemet

Frontend körs tillsammans med backends via Docker Compose i infra-repot. Clone alla repos som syskonmappar:

```
niklas-bodega/
├── niklas-bodega-infra/
├── user/
├── booking/
├── review-service/
└── frontend/             ← du är här
```

```bash
docker network create proxy-network   # om nätverket inte redan finns
cd ../niklas-bodega-infra
cp .env.example .env
docker compose up --build
```

I `.env` för lokal körning:

```env
VITE_USER_API_URL=http://localhost:8084
VITE_BOOKING_API_URL=http://localhost:8083
VITE_REVIEW_API_URL=http://localhost:8086
```

Öppna **http://localhost:8087**.

Se [niklas-bodega-infra/README.md](../niklas-bodega-infra/README.md) för övriga miljövariabler och databaser.

## Köra frontend lokalt mot Docker-backends

Om backend redan körs i Compose:

```bash
npm install
npm run dev
```

Avkommentera URL:erna i `.env` så att Vite pekar på `localhost:8084/8083/8086`. Vite använder då en annan port än 8087 (ofta 5173).
