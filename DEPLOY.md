# Deploy Phone Hustlers (GitHub + Vercel)

This site is a **Vite + React** app. Vercel runs `npm run build` and serves the `dist` folder.

Do **not** commit `.env`. Put secrets in Vercel instead.

---

## Before you deploy

1. **Supabase**
   - Create a project at [supabase.com](https://supabase.com).
   - Open **SQL Editor**, paste all of `supabase/schema.sql`, and **Run** once.
   - Under **Authentication → Users**, add `admin@phonehustler.com` (use **Auto confirm user**).
   - Under **Authentication → URL configuration**, set:
     - **Site URL:** your Vercel URL (you can update this after the first deploy), e.g. `https://phonehustler.vercel.app`
     - **Redirect URLs:** same URL, plus `http://localhost:5173` for local dev.
   - Under **Project Settings → API**, copy:
     - **Project URL** → `VITE_SUPABASE_URL`
     - **anon public** key → `VITE_SUPABASE_ANON_KEY`

2. **Local check (optional)**

   ```bash
   npm install
   npm run build
   ```

   If build passes, Vercel will usually pass too.

---

## Part 1 — Push to GitHub

From the project folder (`phonehustler`):

```bash
git init
git add .
git commit -m "Initial Phone Hustlers site"
```

Create a new empty repo on GitHub (no README if you already have files locally).

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub user and repo name.

**Never push** `.env` — it is listed in `.gitignore`.

---

## Part 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**).
2. Click **Add New… → Project**.
3. **Import** the GitHub repo you just pushed.
4. Vercel should detect **Vite**. Confirm:

   | Setting | Value |
   |--------|--------|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Open **Environment Variables** and add (for **Production**, and optionally Preview/Development):

   | Name | Value |
   |------|--------|
   | `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | your anon public key |

6. Click **Deploy**.

7. When the deploy finishes, open your live URL (e.g. `https://your-project.vercel.app`).

8. Go back to Supabase **Authentication → URL configuration** and set **Site URL** to that exact Vercel URL if you used a placeholder earlier.

---

## Part 3 — After deploy

1. Open **`https://YOUR-VERCEL-URL/admin`**
2. Sign in with your Supabase admin user.
3. If the site still shows old built-in copy, click **Load the current site** once (writes all sections to Supabase).
4. Edit sections and click **Save section** as needed.

Public pages read Supabase when env vars are set. The admin does not need the “Connect Supabase” form on Vercel if `VITE_SUPABASE_*` is set at build time.

---

## Updates later

Push to `main` on GitHub. Vercel redeploys automatically if the project is linked.

```bash
git add .
git commit -m "Describe your change"
git push
```

---

## Troubleshooting

| Problem | What to do |
|--------|------------|
| **404** on `/about-us`, `/admin`, etc. when refreshing | `vercel.json` in the repo should rewrite all routes to `index.html`. Redeploy after it is on `main`. |
| **Admin** shows “Connect Supabase” on Vercel | Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel → Project → Settings → Environment Variables, then **Redeploy**. |
| **Sign-in fails** on live site | In Supabase, add your Vercel URL under Auth **Site URL** and **Redirect URLs**. Confirm the user’s email is confirmed. |
| **Forms don’t save** | Run `supabase/schema.sql` again if needed. Check browser network tab for Supabase errors. |
| **Build fails on Vercel** | Run `npm run build` locally and fix TypeScript errors first. |

---

## Custom domain (optional)

1. Vercel → Project → **Settings → Domains** → add your domain.
2. Update DNS as Vercel instructs.
3. Update Supabase **Site URL** and **Redirect URLs** to use the custom domain.

---

## Security notes

- The **anon** key is safe in the browser; it is limited by Row Level Security in `schema.sql`.
- Do **not** put the Supabase **service_role** key in Vercel env vars for this frontend project.
- Keep admin passwords strong; only trusted people should have Supabase Auth accounts.
