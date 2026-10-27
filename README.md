# Phone Hustlers

Marketing site and admin CMS for Phone Hustlers call center (VICIdial, industries, Talk to us form).

**Stack:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Supabase.

---

## First time — push this folder to GitHub

1. Create a **new empty repository** on GitHub (no README, no `.gitignore` — this repo already has them).

2. In this project folder, run:

```bash
git init
git add .
git commit -m "Initial Phone Hustlers site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub account and repository name.

**Do not commit secrets.** `.env` is ignored. Only `.env.example` is tracked.

---

## Run locally

```bash
npm install
cp .env.example .env
```

Edit `.env` and set:

- `VITE_SUPABASE_URL` — Supabase project URL  
- `VITE_SUPABASE_ANON_KEY` — Supabase **anon public** key  

```bash
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). Admin: [http://127.0.0.1:5173/admin](http://127.0.0.1:5173/admin).

---

## Supabase setup (once per project)

1. In [Supabase](https://supabase.com) → **SQL Editor**, paste and run the full file **`supabase/schema.sql`**.
2. **Authentication → Users** — add your admin (e.g. `admin@phonehustler.com`), enable **Auto confirm user**.
3. **Authentication → URL configuration** — add `http://localhost:5173` and your production URL when you have one.

Optional — confirm admin metadata:

```sql
update auth.users
set
  email_confirmed_at = coalesce(email_confirmed_at, now()),
  raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'admin@phonehustler.com';
```

---

## Admin CMS

1. Sign in at `/admin`.
2. If content is not loading from the database, click **Load the current site** once.
3. Pick a section in the sidebar, edit fields, **Save section**.

Talk-to-us submissions appear under **People who want a call** when `inquiries` table exists.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

---

## Deploy to Vercel

See **[DEPLOY.md](./DEPLOY.md)** for GitHub import, environment variables, and post-deploy steps.

**Vercel settings (summary):**

| Setting | Value |
|---------|--------|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

**Environment variables on Vercel:**

| Name | Value |
|------|--------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key |

`vercel.json` in this repo handles client-side routes (`/admin`, `/about-us`, etc.).

---

## Project layout

| Path | Purpose |
|------|---------|
| `src/pages/Home.tsx` | Marketing homepage |
| `src/pages/Admin.tsx` | CMS admin |
| `src/cms/` | Defaults, Supabase client, section editor |
| `supabase/schema.sql` | Database tables, RLS, section seed |
| `public/` | Logo, hero image, static assets |

---

Built by Apex Technology.
