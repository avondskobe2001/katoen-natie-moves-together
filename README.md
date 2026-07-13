# Katoen Natie Moves Together

A global corporate sports community platform where Katoen Natie employees and partners worldwide unite through sport — cycling, football predictions, running/walking challenges, and more.

**Tagline:** One Company. One Movement.

## Features

- **Dashboard** — Global activity map, live stats, current challenges, leaderboards
- **Challenges Hub** — Tour de France virtual stages, distance goals, company challenges
- **Predictions Arena** — Football prediction leagues (World Cup, Nations League, Euros, AFCON)
- **Community Feed** — Activity wall with achievements from terminals worldwide
- **Leaderboards** — Global, regional, per-sport, per-terminal rankings
- **Profiles & Teams** — Employee profiles, department/country/terminal teams
- **About** — Sponsorships (INEOS Grenadiers, Club Brugge, Antwerp Marathon), wellbeing

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + custom shadcn/ui components
- **Supabase** — Auth, PostgreSQL database, storage (schema included)
- **next-intl** — English (primary) + Dutch
- **PWA ready** — Web manifest, installable

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm 9+
- (Optional) Supabase account for production auth/database

### Installation

```bash
git clone <repository-url>
cd katoen-natie-moves-together
npm install
cp .env.local.example .env.local
```

### Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The app runs with sample data when Supabase is not configured.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Enable Email auth (or SSO) in Authentication settings
4. Copy project URL and anon key to `.env.local`
5. (Optional) Configure Storage bucket for feed post images

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # i18n routes (en, nl)
│   │   ├── page.tsx       # Dashboard
│   │   ├── challenges/
│   │   ├── predictions/
│   │   ├── community/
│   │   ├── leaderboards/
│   │   ├── profiles/
│   │   ├── teams/
│   │   └── about/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                # shadcn-style primitives
│   ├── layout/            # Header, Footer
│   ├── home/              # Dashboard components
│   ├── challenges/
│   ├── predictions/
│   ├── profiles/
│   ├── teams/
│   └── shared/
├── data/
│   └── sample-data.ts     # Katoen Natie themed sample data
├── lib/
│   ├── supabase/
│   ├── i18n/
│   └── utils.ts
├── types/
└── middleware.ts          # next-intl locale routing
messages/
├── en.json
└── nl.json
supabase/
└── schema.sql
public/
├── manifest.json          # PWA manifest
└── icon.svg
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Any Node.js host supporting Next.js 16:

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your hosting environment.

## Branding

| Token | Value | Usage |
|-------|-------|-------|
| KN Blue | `#003d7a` | Primary brand, headers |
| KN Blue Light | `#1a5a9e` | Borders, accents |
| KN Blue Dark | `#061220` | Background depth |
| KN Orange | `#f5a623` | CTAs, highlights |
| KN Yellow | `#ffc72c` | Gradients, accents |

Dark mode is the default theme.

## License

Proprietary — Katoen Natie NV. Internal use.