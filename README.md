# MIST Hub

Premium, responsive campus learning UI built with Next.js, TypeScript, Tailwind CSS and Framer Motion. It uses real Supabase queries and auth actions—not mock data—and deliberately keeps messaging text-only.

## Start

1. Copy `.env.example` to `.env.local` and add your Supabase and Stripe credentials.
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`

The Supabase project must provide the existing tables used by the app: `profiles`, `courses`, `books`, `notes`, `events`, `enrollments`, `book_orders`, `event_registrations`, `payments`, `conversation_members`, and `messages`. Keep RLS enabled and enforce admin role checks server-side.
