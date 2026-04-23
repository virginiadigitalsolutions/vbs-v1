# Virginia Business Solutions Website

Production website and admin CMS for Virginia Business Solutions. The app is built with Next.js App Router, Prisma, MySQL, NextAuth, Tailwind CSS, and Playwright.

## What This App Includes

- Public marketing pages for digital skills, courses, career guides, resources, contact, and learning hub content.
- Admin dashboard for pages, sections, media, users, site settings, enquiries, affiliates, and blog content.
- Dynamic CMS-driven page sections using Prisma models.
- Contact form with optional SMTP email notifications and user confirmations.
- Media upload support through Cloudinary and local upload records.
- SEO support through metadata, sitemap, robots, JSON-LD, Google site verification, Google Analytics, Vercel Analytics, and Vercel Speed Insights.
- End-to-end tests for public and admin flows with Playwright.

## Tech Stack

- Next.js 16
- React 19
- Prisma 6
- MySQL
- NextAuth
- Tailwind CSS 4
- Cloudinary
- Nodemailer
- OpenAI API for admin learning-hub generation
- Playwright

## Project Structure

```text
app/                    Next.js App Router routes, layouts, API routes
app/(public)/           Public website pages and public layout
app/admin/              Admin dashboard pages
app/api/                Auth, CMS, upload, contact, search, and admin APIs
components/             Shared UI, public sections, admin components
lib/                    Database, auth, mailer, Cloudinary, blog, utilities
prisma/                 Prisma schema, migrations, seed script
public/                 Static assets, manifest, uploaded files
tests/e2e/              Playwright end-to-end tests
```

## Requirements

- Node.js 20 or newer recommended
- npm
- MySQL database
- Cloudinary account for production media uploads
- SMTP mailbox for contact form email delivery

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-secure-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

ADMIN_EMAIL=
ADMIN_PASSWORD=

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Virginia Business Solutions <your-email@gmail.com>"
ADMIN_NOTIFICATION_EMAIL="admin@virginiabusinesssolutions.in"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

OPENAI_API_KEY="your-openai-api-key"
```

Notes:

- `DATABASE_URL` is required for Prisma and the CMS.
- `NEXTAUTH_SECRET` should be a strong random secret in production.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used by the seed script to create the initial admin user.
- SMTP variables are optional for local development, but contact emails are skipped when SMTP is not configured.
- `OPENAI_API_KEY` is only required for the admin AI content generation endpoint.

## Local Setup

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Seed the initial admin user and default content:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Admin login is available at `http://localhost:3000/admin/login`.

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build locally.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run seed
```

Runs `prisma/seed.js`.

```bash
npm run test:e2e
```

Builds the app and runs Playwright tests.

```bash
npm run test:e2e:headed
```

Runs Playwright in headed mode.

```bash
npm run test:e2e:ui
```

Opens the Playwright test UI.

## Database Workflow

The Prisma schema is in `prisma/schema.prisma`.

Useful commands:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma studio
```

Use `migrate dev` while developing schema changes locally. Use `migrate deploy` in production or CI.

## Admin Features

The admin area supports:

- Dashboard overview
- Page and section management
- Learning hub posts, categories, and authors
- Media library
- Contact enquiries
- Affiliate links
- Site settings
- User management
- SMTP test email

Roles are defined in Prisma as `SUPER_ADMIN`, `EDITOR`, and `VIEWER`.

## SEO And Analytics

The root layout includes:

- Google site verification
- Google Analytics measurement ID: `G-Q1LM9373N7`
- Vercel Analytics
- Vercel Speed Insights
- App metadata, manifest, sitemap, robots, and JSON-LD helpers

Set `NEXT_PUBLIC_SITE_URL` in production so canonical metadata, sitemap, robots, and structured data point to the live domain.

## Testing

Playwright specs live in `tests/e2e`.

Run all e2e tests:

```bash
npm run test:e2e
```

Run a specific test file:

```bash
npx playwright test tests/e2e/public/home.spec.js
```

## Deployment Checklist

Before deploying:

- Set all production environment variables.
- Run `npm run build`.
- Run `npx prisma migrate deploy` against the production database.
- Run `npm run seed` only when you need to create or refresh initial admin/default data.
- Confirm `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` use the production domain.
- Confirm SMTP and Cloudinary credentials are valid.
- Confirm Google Analytics and Google Search Console verification are active.

## Maintenance Notes

- Public pages are mainly under `app/(public)`.
- Dynamic slug pages are handled by `app/[slug]/page.jsx`.
- CMS section rendering is handled by `components/SectionRenderer.jsx` and `components/sections`.
- Mail behavior is centralized in `lib/mailer.js`.
- Database access is centralized in `lib/db.js`.
- Upload behavior is handled by `app/api/upload/route.js` and `lib/cloudinary.js`.
