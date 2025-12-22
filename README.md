# NomadVPN Pro

A full-stack web application for a VPN router setup service targeting digital nomads and remote workers.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Containerization**: Docker Compose

## Features

- **Public Pages**: Home, Services, About, Contact, Consultation, Blog
- **Admin Dashboard**: Lead management, consultation tracking, statistics
- **Forms**: Contact form and multi-step consultation booking
- **SEO**: Optimized metadata, sitemap, robots.txt
- **Responsive**: Mobile-first design with dark theme

## Prerequisites

- Node.js 18+ (or use pnpm/yarn)
- Docker & Docker Compose
- pnpm (recommended) or npm

## Quick Start

### 1. Clone and Install

```bash
cd nomadvpn-pro
pnpm install
```

### 2. Start PostgreSQL

```bash
docker-compose up -d
```

This starts PostgreSQL on port 5432 with:
- Database: `nomadvpn_pro`
- User: `nomadvpn`
- Password: `nomadvpn_secret_2024`

### 3. Set Up Environment

Copy the example environment file:

```bash
cp .env.example .env
```

The default `.env` is already configured for local development.

### 4. Initialize Database

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed initial data (services, sample blog posts)
pnpm db:seed
```

### 5. Start Development Server

```bash
pnpm dev
```

Visit: http://localhost:3000

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema changes (dev) |
| `pnpm db:seed` | Seed database |
| `pnpm db:studio` | Open Prisma Studio GUI |

## Project Structure

```
nomadvpn-pro/
├── docker-compose.yml      # PostgreSQL container
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── blog/           # Blog pages
│   │   └── ...             # Other pages
│   ├── components/         # React components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Header, Footer
│   │   ├── home/           # Homepage sections
│   │   ├── services/       # Service components
│   │   ├── forms/          # Form components
│   │   └── admin/          # Admin components
│   ├── lib/                # Utilities
│   │   ├── db.ts           # Prisma client
│   │   ├── utils.ts        # Helper functions
│   │   └── validations.ts  # Zod schemas
│   └── styles/
│       └── globals.css     # Global styles
└── public/                 # Static assets
```

## Admin Dashboard

Access the admin dashboard at `/admin`.

Default credentials (change in production):
- Username: `admin`
- Password: `nomadvpn_admin_2024`

Features:
- View and manage leads from contact form
- Track consultation requests
- Update lead/consultation status
- View business statistics

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://nomadvpn:...` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `http://localhost:3000` |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `nomadvpn_admin_2024` |

## Database Schema

- **Lead**: Contact form submissions
- **Consultation**: Consultation booking requests
- **Service**: Service tiers/packages
- **BlogPost**: Blog content
- **Order**: Future payment tracking

## Customization

### Changing Colors

Edit the CSS variables in `src/styles/globals.css`:

```css
:root {
  --primary: 187 85% 43%;  /* Cyan */
  --accent: 262 83% 66%;   /* Violet */
  /* ... */
}
```

### Adding Services

Edit the seed data in `prisma/seed.ts` or use Prisma Studio:

```bash
pnpm db:studio
```

### Updating Content

Most content is in the page files under `src/app/`. Edit directly or move to a CMS.

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment

For production, update:
1. `DATABASE_URL` - Point to production PostgreSQL
2. `NEXT_PUBLIC_SITE_URL` - Your domain
3. `ADMIN_USERNAME` / `ADMIN_PASSWORD` - Strong credentials

### Recommended Platforms

- **Vercel**: Easiest for Next.js (connect repo, auto-deploy)
- **Railway**: Good for full-stack with PostgreSQL
- **DigitalOcean App Platform**: Reliable, affordable

## Integrations

### Stripe Payments
Stripe is integrated for all service tiers. Requires:
- `STRIPE_SECRET_KEY` - From Stripe Dashboard
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` - Create webhook at `https://yourdomain.com/api/webhook`

### Resend Email
Email notifications for leads, consultations, and orders. Requires:
- `RESEND_API_KEY` - From Resend.com
- `NOTIFY_EMAIL` - Your notification email

## Railway Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nomadvpn-pro.git
git push -u origin main
```

### 2. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Next.js + Docker

### 3. Add PostgreSQL
1. In Railway dashboard, click "New" → "Database" → "PostgreSQL"
2. Railway auto-connects the database

### 4. Set Environment Variables
In Railway dashboard → your service → "Variables":

```
DATABASE_URL=<auto-provided by Railway>
NEXT_PUBLIC_SITE_URL=https://your-railway-url.railway.app
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NOTIFY_EMAIL=timudai@outlook.com
```

### 5. Run Migrations
In Railway → your service → "Settings" → "Deploy" → add build command:
```
npx prisma migrate deploy && npm run build
```

### 6. Add Custom Domain
1. In Railway → your service → "Settings" → "Domains"
2. Add your custom domain
3. Update DNS at your registrar

## Future Enhancements

- [x] Stripe payment integration
- [x] Email notifications (Resend)
- [ ] Better admin authentication (NextAuth.js)
- [ ] Blog CMS integration
- [ ] Analytics dashboard (Google Analytics)
- [ ] Customer portal

## Support

For issues or questions, contact: timudai@outlook.com | (213) 321-8300

## License

Private - All rights reserved.
