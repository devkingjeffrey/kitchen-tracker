# Kitchen Tracker — Setup Guide

This is the first build step: a working login + dashboard shell. No credit
card needed anywhere in this guide.

## What's in this build
- A login page (`/login`)
- A dashboard shell (`/dashboard`) that only loads if you're signed in
- Supabase authentication wired up
- Sign out button

Inventory tracking itself is the next build step — this establishes the
foundation (auth + deployment pipeline) first.

---

## Step 1 — Create your free Supabase project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**, give it a name (e.g. "kitchen-tracker"), set a
   database password (save this somewhere), and pick the region closest to you
3. Once it's created, go to **Project Settings → API**
4. Copy two values — you'll need them in Step 3:
   - **Project URL**
   - **anon public key**

## Step 2 — Create a test user to log in with
Since there's no public sign-up page yet (on purpose — you don't want
strangers signing up to your kitchen's app), add yourself manually:
1. In Supabase, go to **Authentication → Users**
2. Click **Add user** → **Create new user**
3. Enter an email and password — this is what you'll log in with

## Step 3 — Add your keys to the project
1. In this project folder, copy `.env.local.example` to a new file named
   `.env.local`
2. Paste in the **Project URL** and **anon public key** from Step 1

## Step 4 — Run it locally (optional, to preview before deploying)
```
npm install
npm run dev
```
Then open `http://localhost:3000` — you should land on the login page.

## Step 5 — Push to GitHub
1. Create a new repository on [github.com](https://github.com) (free)
2. In this project folder:
```
git init
git add .
git commit -m "Kitchen tracker: login + dashboard shell"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
`.env.local` will **not** be pushed — it's in `.gitignore` on purpose, since
it holds your keys.

## Step 6 — Deploy on Vercel (free)
1. Go to [vercel.com](https://vercel.com), sign up with your GitHub account
2. Click **Add New → Project**, select your repo
3. Before deploying, add your environment variables (same two from Step 1):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**

You'll get a live URL you can open on your phone and add to your home
screen.

---

## Next build step
Once this is deployed and you can log in successfully, come back and we'll
build the actual inventory table — items, quantities, low-stock alerts.
