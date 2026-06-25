import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PassportClientTool } from "@/components/editor/PassportClientTool";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
import {
  Camera,
  Check,
  Clock,
  Globe,
  Lock,
  Printer,
  Shield,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "HMPO & GOV.UK Checker Compliant",
    description:
      "Built against the 2026 HMPO Photo Standards and the GOV.UK Digital Image Validation Service (DIVS) pipeline — the automated system that scans every online application before a human examiner sees it.",
  },
  {
    icon: Shield,
    title: "Light Grey / Cream Background (Not White)",
    description:
      "HMPO specifies light grey or cream — not pure white. White can overexpose at the edges and confuse the DIVS automated checker. Our AI applies the correct background tone automatically.",
  },
  {
    icon: Check,
    title: "29–34 mm Head Height Enforcement",
    description:
      "AI face detection precisely centres your face so the chin-to-crown distance falls between 29 mm and 34 mm — the most commonly failed biometric measurement in HMPO rejections.",
  },
  {
    icon: Printer,
    title: "Print + Digital Outputs Included",
    description:
      "Download a 413×531 px JPEG for online GOV.UK upload, plus a 4×6 print sheet with four identical copies — ready for Post Office Check & Send or home printing.",
  },
];

const steps = [
  {
    title: "Take or Upload Your Photo",
    description:
      "Stand in front of a plain light-coloured wall in natural daylight. Remove glasses, keep your head level and straight, and upload a sharp front-facing portrait — JPEG or PNG accepted.",
  },
  {
    title: "United Kingdom Preset Auto-Loads",
    description:
      "The tool is pre-configured for HMPO standards: 35×45 mm format, light-grey background, and the 29–34 mm head-height ratio are applied automatically.",
  },
  {
    title: "AI Process & Download",
    description:
      "Click Process — our AI removes the background, centres your face to HMPO proportions, and delivers a DIVS-ready JPEG plus a print-ready 4×6 sheet in under 10 seconds.",
  },
];

const faqs = [
  {
    q: "What is the official UK passport photo size in 2026?",
    a: "Printed photos must be exactly 35 mm wide by 45 mm tall — a portrait format, taller than wide. At 300 DPI this equals 413×531 pixels. For digital online GOV.UK applications, HMPO requires a JPEG of at least 600×750 pixels, minimum 50 KB and maximum 10 MB.",
  },
  {
    q: "What background colour is required for a UK passport photo?",
    a: "HMPO specifies a plain light grey or cream background. Pure white is technically accepted but is strongly discouraged — it can overexpose at the edges and cause the GOV.UK automated checker (DIVS) to flag the photo. Light grey or cream provides the safest contrast for biometric scanning.",
  },
  {
    q: "How recent does my UK passport photo need to be?",
    a: "Your photo must have been taken within the last one month. This is one of the strictest recency rules in the world — far tighter than the US (6 months) or most Schengen countries (6 months). If your photo is five weeks old when you submit, HMPO can reject it.",
  },
  {
    q: "Can I wear glasses in a UK passport photo?",
    a: "No. HMPO banned glasses in passport photos in November 2016 to eliminate glare and to align with biometric facial recognition standards. Glasses are not permitted under any circumstances for UK passport photos in 2026, even if you wear them daily.",
  },
  {
    q: "What are the UK passport photo rules for babies and young children?",
    a: "Children under 6 do not need to look directly at the camera or maintain a fully neutral expression. Babies under 1 year old do not need their eyes open. However, no hands, toys, or other people should appear in the photo, the background must still be plain light grey or cream, and the child's face must be clearly visible.",
  },
  {
    q: "Can I wear a head covering in a UK passport photo?",
    a: "Head coverings are only permitted for documented religious or genuine medical reasons. Even then, your full face from chin to forehead must be clearly visible, with no shadows cast on the face. Everyday fashion head coverings are not allowed.",
  },
];

const relatedLinks = [
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "Canada Passport Photo Maker", href: "/canada-passport-photo-maker" },
  { label: "Schengen Visa Photo Maker", href: "/schengen-visa-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
];

export default function UkPassportPhotoMaker() {
  return (
    <>
      <SEO
        url="https://www.photoresizer.co.in/uk-passport-photo-maker"
        title="UK Passport Photo Maker 2026 | Free Online HMPO 35×45mm Tool"
        description="Create a compliant UK passport photo in seconds. Free online tool sized to the official HMPO 35×45mm standard. AI applies light-grey background, enforces 29–34mm head height, and exports a GOV.UK DIVS-ready JPEG. No glasses needed — we handle the rules."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "UK Passport Photo Maker",
          applicationCategory: "DesignApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1">
          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="py-14 md:py-20">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-current" />
                Updated May 2026 · Verified Against HMPO Photo Standards & GOV.UK DIVS
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Free Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  UK Passport Photo Maker
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Create an HMPO-compliant 35×45 mm passport photo online — light-grey background, 29–34 mm head height, and a GOV.UK-ready JPEG, all generated in under 10 seconds.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "HMPO & DIVS Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "Official 35×45mm Preset" },
                  { icon: Clock, label: "Results in Under 10 Seconds" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-2">
                    <span className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tool ─────────────────────────────────────────────────────────── */}
          <section id="tool" className="pb-3">
            <div className="container px-4 max-w-4xl mx-auto">
              <PassportClientTool defaultCountryCode="GB" />
            </div>
          </section>

                              {/* ── Example Showcase ────────────────────────────────────────────── */}
          <section className="py-14 bg-slate-50 dark:bg-slate-900/50 border-y border-border">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  See Your Photo Transform
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  From upload to print-ready — see the complete process with measurements and dimensions.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] relative bg-slate-100 dark:bg-slate-800">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                      alt="Passport photo with measurements"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-base font-bold text-card-foreground">AI Processing</p>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Face detection with biometric measurements applied</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] relative bg-slate-100 dark:bg-slate-800">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg"
                      alt="Final compliant photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-base font-bold text-card-foreground">Final Output</p>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Government-compliant photo with white background</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                  <a href="https://www.photoresizer.co.in/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer" className="block aspect-[3/4] relative bg-slate-100 dark:bg-slate-800 group overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg"
                      alt="4x6 print sheet"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                  <div className="p-5">
                    <a href="https://www.photoresizer.co.in/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-card-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
                      Print Template
                      <span className="text-xs">↗</span>
                    </a>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Ready-to-print 4×6 inch sheet with crop guides</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Features ─────────────────────────────────────────────────────── */}
          <section className="py-14 bg-card border-y border-border">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  Why Our Tool Passes the GOV.UK Automated Checker
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Every output is verified against 2026 HMPO Photo Standards and the Digital Image Validation Service (DIVS) criteria — the same pipeline HMPO uses on every online application.
                </p>
              </div>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          {/* ── How To ───────────────────────────────────────────────────────── */}
          <section className="py-14">
            <div className="container px-4 max-w-3xl mx-auto">
              <HowToGuide
                steps={steps}
                title="How to Make Your UK Passport Photo in 3 Steps"
              />
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16 bg-card border-y border-border">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">

              <h2>UK Passport Photo Requirements 2026 — Official HMPO Complete Guide</h2>
              <p>
                His Majesty's Passport Office (HMPO) enforces some of the strictest passport photo rules in the world. Whether you are applying online through <strong>GOV.UK</strong> or submitting a paper form via Post Office Check &amp; Send, your photo must satisfy every requirement set out in the <strong>2026 HMPO Photo Standards</strong>. Non-compliant photos are one of the leading causes of delayed applications — and HMPO's automated <strong>Digital Image Validation Service (DIVS)</strong> now flags issues before a human examiner even opens your file.
              </p>

              <h3>Official UK Passport Photo Size &amp; Technical Specifications</h3>
              <p>
                The UK uses a portrait-format photo — taller than it is wide — which differs from the square format used by the United States and some other countries.
              </p>
              <ul>
                <li><strong>Printed size:</strong> Exactly 35 mm wide × 45 mm tall (3.5 × 4.5 cm).</li>
                <li><strong>Head height (chin to crown):</strong> Must measure between <strong>29 mm and 34 mm</strong> within the 45 mm photo height.</li>
                <li><strong>Eye position:</strong> Eyes must fall between 29 mm and 34 mm from the bottom edge of the photo.</li>
                <li><strong>Digital upload (GOV.UK online application):</strong> JPEG format, minimum <strong>600 × 750 pixels</strong>, file size between 50 KB and 10 MB.</li>
                <li><strong>Safe export resolution:</strong> 413 × 531 px at 300 DPI for print; 600 × 750 px minimum for digital submission.</li>
                <li><strong>Photo recency:</strong> Taken within the <strong>last one month</strong> — the strictest recency rule globally. Photos taken five weeks ago will be rejected.</li>
                <li><strong>Copies required:</strong> Two identical prints for paper applications; one JPEG for the GOV.UK online portal.</li>
              </ul>

              <h3>Background Colour — Why Light Grey or Cream, Not White</h3>
              <p>
                This is the most misunderstood UK requirement. HMPO officially specifies a <strong>plain light grey or cream background</strong>. Pure white is technically listed as acceptable, but HMPO and the GOV.UK automated checker strongly prefer light grey or cream because they provide better contrast for biometric scanning at the face boundary.
              </p>
              <p>
                Bright white walls can photograph with harsh, reflective overexposure at the edges, causing DIVS to struggle detecting where the face ends and the background begins — triggering a "Checks Advised" warning that delays your application. A cream-painted wall, a pale grey curtain, or a sheet of light-grey card behind you are all reliable choices when taking the photo at home.
              </p>

              <h3>Expression, Pose &amp; Lighting Rules</h3>
              <p>
                HMPO's biometric requirements follow ICAO Doc 9303 standards with additional UK-specific rules layered on top:
              </p>
              <ul>
                <li><strong>Expression:</strong> Neutral — closed mouth, relaxed face. No smiling, frowning, or raised eyebrows.</li>
                <li><strong>Eyes:</strong> Fully open, looking directly at the camera. No squinting or drooping eyelids.</li>
                <li><strong>Head position:</strong> Straight and level — no tilting, turning, or rotation in any direction.</li>
                <li><strong>Glasses:</strong> <strong>Completely banned</strong> since November 2016 — even prescription glasses with anti-glare coating. No exceptions.</li>
                <li><strong>Lighting:</strong> Even, shadow-free illumination across both the face and background. No red-eye, lens glare, or flash reflections.</li>
                <li><strong>Digital editing:</strong> No filters, beauty smoothing, or heavy retouching. DIVS flags artificially softened skin texture.</li>
                <li><strong>Head coverings:</strong> Permitted only for documented religious or medical reasons. The full face — chin to forehead — must be fully uncovered and shadow-free.</li>
              </ul>

              <h3>UK Passport Photo Rules for Babies &amp; Children (2026)</h3>
              <p>
                HMPO applies relaxed standards for young children while keeping background requirements identical to adult photos:
              </p>
              <ul>
                <li><strong>Children under 6:</strong> Do not need to look directly at the camera or maintain a fully neutral expression.</li>
                <li><strong>Babies under 1:</strong> Eyes do not need to be open.</li>
                <li><strong>All ages:</strong> No hands, toys, dummies, or other people should appear in the frame. Background must still be plain light grey or cream.</li>
              </ul>

              <h3>How the GOV.UK Digital Image Validation Service (DIVS) Works</h3>
              <p>
                When you upload a photo through the GOV.UK online application, HMPO's automated DIVS pipeline runs a facial recognition scan that checks background colour, head size and position, expression, eye visibility, and overall image quality. If something looks off — a background too close to your skin tone, possible beauty-filter smoothing, or a clipped head outline — the system returns a <em>"Checks Advised"</em> warning rather than an outright fail, and an HMPO examiner makes the final call. This adds processing time. Passing DIVS cleanly on the first upload is critical for fast turnaround.
              </p>

              <h3>Most Common UK Passport Photo Rejection Reasons in 2026</h3>
              <ul>
                <li>Photo older than one month at the time of submission</li>
                <li>Glasses worn — banned regardless of prescription or frame type</li>
                <li>White background instead of light grey or cream</li>
                <li>Head height outside the 29–34 mm range (face too small or too large)</li>
                <li>Shadows on the face or background</li>
                <li>Digital filters or beauty-mode smoothing detected by DIVS</li>
                <li>Non-neutral expression — even a slight smile</li>
                <li>Digital file outside the 50 KB – 10 MB range or under 600 × 750 px</li>
              </ul>
              <p>
                Our tool addresses all of these automatically: AI face detection enforces the 29–34 mm head-height ratio, the background is replaced with HMPO-preferred light grey, and exports are optimised for both GOV.UK digital upload (600 × 750 px JPEG) and physical printing (413 × 531 px at 300 DPI).
              </p>

              <h3>How to Take the Perfect UK Passport Photo at Home</h3>
              <p>
                You do not need a studio. Use your smartphone, stand roughly <strong>40–50 cm from the camera</strong>, and position yourself in front of a pale grey or cream wall in soft, even natural light — avoid direct sunlight which creates harsh shadows. Remove glasses, level your head, relax your expression, and ensure your head, neck, and the top of your shoulders are all in frame. Upload the result to our tool and the AI handles all cropping, sizing, and background correction.
              </p>

            </article>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="py-14">
            <div className="container px-4 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  UK Passport Photo — Frequently Asked Questions (2026)
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Sourced from HMPO Photo Standards and GOV.UK official passport guidance, verified May 2026.
                </p>
              </div>
              <div className="bg-card border border-border rounded-2xl px-6 divide-y divide-border">
                {faqs.map((item, i) => (
                  <div key={i} className="py-5">
                    <h3 className="font-semibold text-sm text-card-foreground mb-1.5 flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">
                        Q{i + 1}.
                      </span>
                      {item.q}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Related Links ───────────────────────────────────────────────── */}
          <div className="container px-4 pb-16">
            <InternalLinks links={relatedLinks} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}