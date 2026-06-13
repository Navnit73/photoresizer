# International SEO Fix — Why Traffic Only Comes from India & How to Expand It

## Root Cause Diagnosis

Your site has **6 root causes** suppressing global traffic. The biggest one is the domain itself.

### 1. Country-Code TLD `.co.in` (BIGGEST FACTOR)
Google treats `.co.in` as India-targeted. For a generic tool like a photo resizer, this is the #1 reason Google shows your pages almost exclusively to Indian users. **You cannot fix this without switching domains.** See "Long-term fix" below.

### 2. India-Only Content Signals on Homepage
- `<title>` and meta descriptions lead with "SSC & Govt Exams" and "UPSC, IBPS, PAN, Aadhaar"
- H1 + hero copy mention "SSC, UPSC, and government exams"
- 90% of internal anchor text and nav links point to India-specific exam pages (SSC Photo, UPSC Photo, IBPS Signature, Aadhar, PAN, Voter ID)
- Content sections (`ContentSections.tsx`) repeatedly say "Indian government websites" and "Most Indian government job portals"
- 50KB article is 100% India-focused (IBPS, SSC, Railway Recruitment Boards)

### 3. Missing Locale / International Signals
- No `og:locale` meta tags (now added)
- No `Content-Language` HTTP header (now added)
- No `og:locale:alternate` for English-US/GB/AU/CA (now added)
- No `target="all"` distribution meta (now added)

### 4. International Pages Have No Hreflang Or Locale Tags
The US/UK/CA/AU/Schengen pages exist and are in the sitemap, but:
- They don't declare `hreflang` to differentiate from the root
- They have no `og:locale` tags (e.g. `en_US`, `en_GB`)
- They don't include a `inLanguage` field in their structured data
- Google treats them as duplicate content of the homepage

### 5. Sitemap Has Almost No International Pages
Looking at `public/sitemap.xml`:
- ~100 URLs total
- Of those, only **8 are explicitly international** (US, UK, CA, AU, Schengen, IN, Nepal passport makers + print template)
- The rest are all India exam/ID/blog URLs
- Google sees the site as overwhelmingly India-focused

### 6. Backlink Profile (Outside Repo, Needs Check)
Most backlinks likely come from Indian education/job sites that link to "SSC photo resizer" / "UPSC photo size" anchor text. Google uses backlink anchor text as a strong geo-signal.

---

## Fixes Already Applied (Code Changes)

1. **`src/components/SEO.tsx`** — Added `og:locale`, `og:locale:alternate`, `content-language`, and `target` meta tags
2. **`index.html`** — Same locale/distribution signals added to static head
3. **`vercel.json`** — Added `Content-Language: en` HTTP header
4. **`src/pages/Index.tsx`** — Changed H1 hero copy and "Didn't crack your government exam" CTA to a globally appealing message
5. **`src/pages/Home.tsx`** — Updated meta description to lead with global use cases (passports, visas) before Indian exams
6. **`index.html`** — Updated `<title>`, `og:title`, `twitter:title` to lead with global use cases

---

## Manual Steps You MUST Do in Google Search Console

These cannot be done in code. Open **Google Search Console → Settings → International Targeting**:

1. Go to https://search.google.com/search-console/settings
2. Select `https://www.photoresizer.co.in/` property
3. Click the **International Targeting** tab (Legacy tools)
4. If "Target users in:" is currently set to **India**, change it to **Unlisted**
5. Save

This single change is the highest-impact fix after the domain.

---

## Additional Required Work (Not Done Yet)

### A. Add Hreflang + Locale Tags to International Pages
Each international passport page (`us-passport-photo-maker.tsx`, `uk-passport-photo-maker.tsx`, `canada-passport-photo-maker.tsx`, `australia-passport-photo-maker.tsx`, `schengen-visa-photo-maker.tsx`) needs:

```jsx
<SEO
  ...
  // Add these props to your SEO component:
  locale="en_US"   // or en_GB, en_CA, en_AU
  alternateLocales={[
    { lang: "en_US", url: "https://www.photoresizer.co.in/us-passport-photo-maker" },
    { lang: "en_GB", url: "https://www.photoresizer.co.in/uk-passport-photo-maker" },
    { lang: "en_CA", url: "https://www.photoresizer.co.in/canada-passport-photo-maker" },
    { lang: "en_AU", url: "https://www.photoresizer.co.in/australia-passport-photo-maker" },
    { lang: "en",    url: "https://www.photoresizer.co.in/" },
  ]}
/>
```

The SEO component then needs to render one `<link rel="alternate" hreflang="...">` per locale plus `x-default`.

### B. Long-term: Move Off `.co.in`
The .co.in TLD will keep capping your global ceiling. Plan a move to:
- **`photoresizer.io`** (best — neutral TLD, good for tech tools)
- **`photoresizer.com`** (if available — strongest, but expensive)
- **`photoresizer.app`** (good alternative, signals "application/tool")

Use 301 redirects from every `.co.in` URL to the new domain. This typically doubles organic traffic in 3–6 months for global-focused tools.

### C. Rebalance Homepage Content
Even with the title/meta fix, the body content on the homepage still leads with Indian content. Consider:
- Splitting the homepage into a globally generic one with a "For India: SSC/UPSC/IBPS tools" section lower down
- Moving the 50KB compression page to a `/in/` subfolder (e.g. `/in/50kb-photo-resizer`) and creating global versions for other use cases (LinkedIn headshot, Instagram post, Discord avatar, etc.)
- Adding use-case pages for global needs: LinkedIn profile photo, Instagram story, Discord server icon, YouTube thumbnail, Twitter header, Facebook cover

### D. Add International Blog Topics
You have ~30 blog posts. Almost all are India-exam-focused. Add ~10 globally-focused posts:
- "US passport photo size requirements 2026"
- "Schengen visa photo specifications"
- "LinkedIn profile photo size & best practices"
- "How to resize photo for UK passport"
- "Australian visa photo 35x45 vs 45x45"
- "Best photo size for Instagram reels"
- "Canada PR photo requirements"
- "Resize photo for US visa DS-160"
- "Photo size for UK driving licence"
- "Best photo dimensions for Twitter/X header"

### E. Submit Updated Sitemap to GSC
After making all the above changes, re-submit `https://www.photoresizer.co.in/sitemap.xml` in Google Search Console.

---

## Expected Impact Timeline

| Change | Time to See Effect | Expected Lift |
|---|---|---|
| GSC un-restrict geo-targeting | 1–2 weeks | 30–50% more non-IN impressions |
| Hreflang + locale tags on intl pages | 2–4 weeks | 20–40% more clicks on intl pages |
| Rebalanced homepage content | 4–8 weeks | 50–100% more non-IN traffic |
| International blog posts | 2–6 months | Compounds over time |
| Domain migration to .com/.io | 3–6 months | 100–300% global traffic |

---

## What NOT To Do

- **Don't** mass-delete the India exam pages — they ARE your top traffic source. Just demote them on the homepage, don't remove them.
- **Don't** add auto-redirects based on visitor country — Google penalizes cloaking.
- **Don't** stuff "global" keywords into India-focused pages — it dilutes relevance for both.
- **Don't** change the canonical to point to international subpages — canonicals should be self-referential.
