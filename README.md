# AIScan - AI Discoverability Audit Platform

AIScan is a premium SaaS platform designed to audit and score how well businesses are discovered by AI search engines like ChatGPT, Perplexity, and Gemini.

## 🚀 Features

- **AI Visibility Score:** Proprietary scoring algorithm for AI discoverability.
- **Deep Audit:** Real-time scanning of schema, citations, and trust signals.
- **Pro Dashboard:** User accounts via Clerk, Subscription management via Stripe.
- **Insights:** Actionable steps to improve AI recommendations.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Auth:** Clerk
- **Payments:** Stripe
- **Database:** Supabase
- **Styling:** Tailwind CSS + Framer Motion

## 🌐 Deployment (Netlify)

This project is configured for **Netlify** deployment using the Next.js Runtime.

### 1. Environment Variables

Configure the following variables in the Netlify Dashboard:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 2. Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor.

### 3. Build & Deploy

Push to GitHub and connect your repository to Netlify. The `netlify.toml` file handles the configuration automatically.

```bash
# Build Command
npm run build

# Publish Directory
.next
```

## 📄 License

MIT
