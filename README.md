# GreenLeaf Landscaping

A full-featured landscaping business website built with React, Convex, and Tailwind CSS.

## Features

### Public Site
- **Home** — Hero, services preview, why-choose-us, portfolio mosaic, CTA banner, testimonials carousel
- **About** — Story, values, team grid
- **Services** — 10-service grid with dark CTA
- **Gallery** — Masonry layout, filterable by category, lightbox with keyboard nav
- **Contact** — Split layout, Google Maps embed, form saves to database

### Admin Panel (`/admin`)
- **Overview** — Stats dashboard, recent leads, quick links
- **Leads** — Expandable rows, status pipeline, notes, email/call/delete
- **Gallery CMS** — Add/edit/delete/toggle visibility
- **Testimonials CMS** — Star picker, visibility toggle
- **Users** — Role promotion/demotion

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Convex (backend + database)
- Hercules Auth (OIDC)
- Framer Motion (motion)
- shadcn/ui components

## Setup

1. Install dependencies: `pnpm install`
2. Set up Convex: `npx convex dev`
3. Configure environment variables (see Hercules platform secrets)
4. Run: `pnpm dev`

## Admin Access

The first admin must be set manually: find your user record in the Convex database and set `role` to `"admin"`. After that, you can grant admin to others from `/admin/users`.
