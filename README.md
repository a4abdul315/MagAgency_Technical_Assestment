# FlowSpark — Media Agency Group Technical Test

A pixel-accurate clone of the FlowSpark marketing landing page (Figma design), plus a
Next.js + DynamoDB backend for the lead-generation form and "Schedule a call" booking flow.

## Tech stack

- **Language:** TypeScript
- **Frontend:** Next.js 16 (App Router) + Tailwind CSS v4
- **Backend:** Next.js Route Handlers (`src/app/api/*`)
- **Database:** AWS DynamoDB
- **Forms/validation:** React Hook Form + Zod (same schema drives client-side and server-side validation)
- **Theming:** `next-themes` (light / dark / system)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your AWS credentials — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app **runs and renders fully without AWS credentials** — the API routes catch
DynamoDB errors and return a `503` with a friendly message, and the UI degrades
gracefully (e.g. the booking modal just shows no pre-booked slots). You only need
real credentials to actually persist leads/bookings.

## AWS DynamoDB setup

You need two tables: **Bookings** and **Leads**, both with a simple partition key
named `id` (String). No sort key, no indexes required.

### Option A — AWS Console (click-through)

1. Sign in to the [AWS Console](https://console.aws.amazon.com/) → search for **DynamoDB** → **Create table**.
2. **Table 1:**
   - Table name: `Bookings`
   - Partition key: `id`, type **String**
   - Table settings: leave "Default settings" (on-demand capacity) checked
   - Create table
3. **Table 2:** repeat with table name `Leads`, partition key `id` (String).
4. That's it — DynamoDB is schemaless beyond the key, so the other fields (date,
   time, name, email, phone, notes, consent, etc. — see [Data model](#data-model)
   below) are just written as regular item attributes by the app; you don't
   declare them up front.
5. Create an IAM user (or role) with programmatic access and attach a policy
   scoped to just these two tables:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:Scan", "dynamodb:Query"],
         "Resource": [
           "arn:aws:dynamodb:*:*:table/Bookings",
           "arn:aws:dynamodb:*:*:table/Leads"
         ]
       }
     ]
   }
   ```

6. Generate an **Access key** for that IAM user (IAM → Users → your user →
   Security credentials → Create access key → "Application running outside AWS").
7. Put the key/secret/region into `.env.local` (see `.env.example`).

### Option B — AWS CLI

If you have the AWS CLI configured (`aws configure`):

```bash
aws dynamodb create-table \
  --table-name Bookings \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

aws dynamodb create-table \
  --table-name Leads \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

### Data model

**Bookings** — written by `POST /api/bookings`, read by `GET /api/bookings`:

| Field | Type | Notes |
|---|---|---|
| `id` | String | Partition key, ULID |
| `date` | String | `YYYY-MM-DD` |
| `time` | String | e.g. `"2:00 PM"` |
| `fullName` | String | required |
| `email` | String | required, validated |
| `phone` | String | required |
| `notes` | String | optional |
| `companyName` | String | optional |
| `consent` | Boolean | required, must be `true` |
| `createdAt` | String | ISO timestamp |

`GET /api/bookings` only ever returns `{ id, date, time }` per item (Task 2 spec) —
just enough for the frontend to grey out already-booked slots.

**Leads** — written by `POST /api/leads`:

| Field | Type | Notes |
|---|---|---|
| `id` | String | Partition key, ULID |
| `fullName` | String | required |
| `email` | String | required, validated |
| `consent` | Boolean | required, must be `true` |
| `createdAt` | String | ISO timestamp |

## Deploying to Vercel

1. Push this repo to GitHub (public, per the submission requirements):
   ```bash
   gh repo create flowspark-technical-test --public --source=. --remote=origin --push
   ```
   (or create the repo on github.com and `git remote add origin <url> && git push -u origin main`)
2. Go to [vercel.com/new](https://vercel.com/new), import the GitHub repo.
3. Under **Environment Variables**, add the same values from `.env.local`:
   `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`,
   `DYNAMODB_BOOKINGS_TABLE`, `DYNAMODB_LEADS_TABLE`.
4. Deploy. No build configuration changes are needed — it's a stock Next.js app.

## Project structure

```
src/
  app/
    api/bookings/route.ts   # GET (availability) + POST (create booking)
    api/leads/route.ts      # POST (lead capture)
    page.tsx                # assembles all sections
  components/
    site-header.tsx, hero-section.tsx, features-section.tsx,
    cta-section.tsx, site-footer.tsx, carousel.tsx, lead-form.tsx
    schedule/                # booking modal: context, calendar, time-slots, form
    ui/                      # Button, Checkbox primitives
    icons.tsx                # inlined SVGs exported directly from the Figma file
  lib/
    validation.ts            # Zod schemas shared by client forms + API routes
    dynamodb.ts               # DynamoDB client + table name config
```

## Design-fidelity notes

The design was pulled directly from the Figma file via its REST API (exact
colors, type scale, spacing, and 20 exported icon/logo/illustration assets),
not eyeballed from static mockups. A few things worth knowing:

- **H1 font substitution:** the Figma file uses **Isidora Sans Alt** for the
  hero heading, which is a paid font. I substituted **Plus Jakarta Sans**
  (free, similar geometric weight) rather than bundle a font without a clear
  license. Every other typeface (Quicksand, Open Sans, Inter for the
  modal's date/time picker) is used as-specified via `next/font/google`.
- **Dark-mode input borders:** in the Figma source, the modal's text inputs
  use the same `neutral-600` value for both fill and border in dark mode,
  making the border invisible. I implemented this literally rather than
  silently "fixing" the source design — flagging it here in case you'd
  rather I lighten the border for usability.
- **Carousel progress indicator:** the brief says the indicator "should fill
  over 3 seconds" — I implemented it as a single bar that fills 0→100% per
  slide (not a 3-segment dashed indicator), which matches the literal wording
  and is the more common carousel pattern.
- **Outer rounded-card layout:** the Figma canvas wraps the whole page in a
  gray background with a white rounded card (20px top / 60px bottom radius).
  I implemented this literally as real page chrome rather than treating it as
  a Figma-artboard-only convention.
- **Mobile nav:** the four top nav links (Features/Industries/Pricing/Resources)
  hide below the `lg` breakpoint rather than collapsing into a hamburger menu.
  Three of those four are placeholder anchors with no corresponding page/section
  in this single-page test, so a full mobile drawer felt like more scaffolding
  than the content warranted — worth revisiting if this becomes a multi-page site.
- **Feature list ↔ carousel interaction:** the brief says "each of the 5
  [feature] sections should load a different set of 3 images." I implemented
  this as: clicking a feature list item makes it "active" (teal accent bar)
  and swaps the carousel to that feature's own 3-image Picsum set.

## What's implemented vs. optional

- ✅ Task 1a — layout, client-side validation, 5-feature carousel (auto-advance,
  wraparound, 3s timed indicator, arrows)
- ✅ Task 1b — booking modal (centered, backdrop, closes via X or outside-click)
- ✅ Task 2 — DynamoDB schema, GET/POST `/api/bookings`, POST `/api/leads`,
  validation + error handling on both endpoints
- ✅ Task 3a — light/dark/system theme toggle
- ✅ Task 3b — responsive layout (mobile/tablet/desktop breakpoints)
