# Maya & Viv Adventures — Starter Tier Mockup

Production-quality 4-page static site representing the **Starter package** ($1,000 USD) of the 3-tier website proposal.

## What's here

- `index.html` — Homepage (hero, tours, about teaser, gallery, CTA, footer)
- `about.html` — Story, pull-quote, stats, values
- `tours.html` — Snorkeling + mainland excursion cards, what's-included strip
- `contact.html` — Contact form, info block, embedded San Pedro map
- `assets/css/style.css` — Shared stylesheet (Fraunces + Manrope, 6-color palette, tokens)
- `assets/js/main.js` — Sticky nav, mobile menu, scroll reveals, contact form handler
- `assets/images/` — 20+ photos (mix of real client photos + curated Belize stock)
- `vercel.json` — Deploy config (clean URLs, asset caching)

## Run it locally

From this folder:

```bash
# any one of these works
python3 -m http.server 4000
# or
npx serve .
# or just
open index.html
```

Then visit `http://localhost:4000`.

## Deploy to Vercel

```bash
npm i -g vercel     # once
vercel --prod       # from this folder
```

First run will prompt to link/create a project (interactive). Subsequent deploys are the same one-liner.

## Push to GitHub first (recommended)

```bash
git init
git branch -M main
git add .
git commit -m "Initial Maya & Viv Adventures Starter mockup"

# If gh CLI is installed and authenticated:
gh repo create mayaandviv-website --public --source=. --remote=origin --push

# Or if creating the repo on github.com manually:
# git remote add origin <your-repo-url>
# git push -u origin main
```

## Pre-call checklist — SWAP THESE BEFORE THE DEMO

These are placeholders I used while building. Each is flagged here with the file + line area to update.

### 1. Contact form endpoint (contact.html)
The form action currently points at `https://formspree.io/f/REPLACE_ME`. The form will politely tell visitors the endpoint isn't wired.

- Sign up (free) at [formspree.io](https://formspree.io/) → new form → copy the endpoint URL
- In `contact.html`, find `action="https://formspree.io/f/REPLACE_ME"` and replace with your real Formspree URL

### 2. WhatsApp number (all pages)
Every "WhatsApp" button links to `https://wa.me/5016140507`. If +501 614-0507 is NOT WhatsApp-enabled, either:

- Swap those links to `tel:+5016140507` (phone call instead), OR
- Point the client to register that number with WhatsApp Business first

Files to edit: `index.html`, `tours.html`, `contact.html` — search for `wa.me/5016140507`.

### 3. Tour names + prices (tours.html, index.html)
I used plausible names and "From $XX" prices based on what's common in San Pedro:

- Hol Chan & Shark Ray Alley — $85
- Full-Day Reef Expedition — $125
- Sunset Reef & Beach Bonfire — $95
- Xunantunich Temple Tour — $165
- Lamanai River & Ruins — $185
- Cave Tubing & Zip Line Combo — $195

Swap any of these with their real numbers if you have them (or leave "From $XXX" as starting-price language — safer for mockup).

### 4. Social media URLs (all pages)
Facebook/Instagram/TikTok icons all link to the platform homepages (`https://facebook.com`, etc). Before going live:

- Replace with Maya & Viv's actual profile URLs
- Search all four HTML files for `facebook.com`, `instagram.com`, `tiktok.com`

### 5. Brand logo
The real brand logo is at `assets/images/logo-brand.png` (kept as reference). I used a Fraunces wordmark (`Maya & Viv`) for elegance — if they want the logo mark itself in the nav/footer, say the word and I'll wire it up in a follow-up round.

## Starter-tier guardrails (what's intentionally omitted)

Matches the package scope — these are the upsell hooks for Entrepreneur ($1,650) and Supercharged ($2,000):

- No testimonials/reviews section
- No blog
- No Google Analytics / GTM / tracking pixels
- No SEO JSON-LD / robots.txt / sitemap.xml
- No booking engine or availability calendar
- No cookie consent banner (not needed — no tracking)

## Design decisions (for the client call)

- **Palette:** ocean blue `#0B4F6C`, jungle green `#2E5D3A`, sunset coral `#FF6B47`, warm sand `#FBF7F0`. Respects brand blue/green/white while borrowing the warm-accent energy of the inspiration sites (xsitebelizesailing, napaliexperience).
- **Typography:** Fraunces (display) + Manrope (body) — premium, tropical, intentionally not the default developer-tool fonts.
- **Motion:** Scroll reveals (fade + rise), card hover lifts, CTA color transitions. "Tide, not flash." Honors `prefers-reduced-motion`.
- **Photos:** Mix of real client photos (mother-daughter portrait, actual snorkel shots, real ruins, real guests on boats) and a few curated Belize shots where the scrape had gaps.

## Handoff notes

- All CSS variables are in `:root` at the top of `style.css` — change once, updates everywhere.
- Every page has its own `<title>` and `<meta description>` for tab/share previews.
- `prefers-reduced-motion` respected (animations turn off for users with that setting enabled).
- Lighthouse targets: 95+ performance, 100 accessibility, 100 best practices.
