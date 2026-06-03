import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PassportApiTool } from "@/components/editor/PassportApiTool";
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
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "2026 ICAO & Passport Seva Compliant",
    description:
      "Fully updated to the September 2025 MEA mandate — outputs 35×45 mm portrait format (630×810 px digital) with 80–85% face coverage as required by ICAO Doc 9303 and the Passport Seva GPSP 2.0 portal.",
  },
  {
    icon: Shield,
    title: "Pure White Background — AI Segmented",
    description:
      "The Passport Seva portal's automated biometric check rejects off-white, cream, or grey backgrounds. Our AI removes your background and replaces it with a pixel-perfect pure white — guaranteed to pass the portal's colour validation.",
  },
  {
    icon: Check,
    title: "80–85% Face Coverage Enforcement",
    description:
      "The new ICAO rules tightened head-to-frame ratios from 70–80% to 80–85%. Our tool auto-crops and centres your face to hit the required range, so your upload won't be silently rejected by the portal.",
  },
  {
    icon: Printer,
    title: "Digital Upload & Print-Ready Output",
    description:
      "Get a 630×810 px JPEG under 250 KB for Passport Seva / mPassport portal upload, plus a 4×6 inch print sheet with multiple copies sized at 35×45 mm for PSK and VFS submission.",
  },
];

const steps = [
  {
    title: "Upload a Clear Front-Facing Photo",
    description:
      "Use a recent colour photo taken against a light background. Face the camera directly with eyes open. Avoid glasses, heavy shadows, and filters. Smartphone photos work fine.",
  },
  {
    title: "Select India — ICAO 35×45 mm Preset",
    description:
      "The tool defaults to the current Indian standard: 35×45 mm portrait, 630×810 px digital file, plain white background, and 80–85% face coverage per the September 2025 MEA update.",
  },
  {
    title: "Download & Submit",
    description:
      "Save the JPEG for Passport Seva / mPassport portal upload (under 250 KB) or download the 4×6 print sheet for physical submission at a PSK, VFS, or BLS centre.",
  },
];

const faqs = [
  {
    q: "What is the official Indian passport photo size in 2026?",
    a: "As of September 1, 2025, the Ministry of External Affairs (MEA) mandates 35×45 mm (width × height) in portrait orientation, aligned with ICAO Doc 9303. The old 2×2 inch (51×51 mm) square format is no longer accepted by the Passport Seva or mPassport portals. For digital upload, the file must be exactly 630×810 pixels, JPEG format, under 250 KB.",
  },
  {
    q: "What face coverage is required in the new 2026 standard?",
    a: "Under the updated ICAO rules enforced since September 2025, your face (chin to crown of head, including hair) must occupy 80–85% of the photograph height. This is tighter than the old 70–80% rule. In a 630×810 px image, your face should span roughly 648–689 pixels vertically. Photos meeting only the old standard will be rejected.",
  },
  {
    q: "What background colour is required for an Indian passport photo?",
    a: "The background must be plain white — not off-white, cream, or light grey. The Passport Seva portal runs automated background colour validation and will reject any photo with even a slight tint. Shadows behind the head or on the face are also grounds for rejection.",
  },
  {
    q: "Can I wear glasses in my Indian passport photo in 2026?",
    a: "No. As of September 2025, glasses are not permitted under any circumstances. The Passport Seva portal's automated system will reject photos with glasses, even if there is no visible glare. You must remove all eyewear before taking your passport photo.",
  },
  {
    q: "Are head coverings allowed in Indian passport photos?",
    a: "Head coverings are permitted only for genuine religious reasons. Even when worn, your full face — from chin to forehead — must be completely visible, and the covering must not cast shadows on your face. It must not obscure any facial feature used for biometric identification.",
  },
  {
    q: "What photo size should NRIs use when applying from the USA?",
    a: "NRIs applying through the Passport Seva (GPSP 2.0) portal use 630×810 px digital upload regardless of location. However, for physical copies submitted via VFS or CKGS centres in the US, prints must be 35×45 mm. Note: CKGS specifically requires 2×2 inch printed copies alongside the 630×810 px digital file — always confirm with your specific centre.",
  },
  {
    q: "How do I upload my photo to the Passport Seva portal?",
    a: "Log into passportindia.gov.in or mportal.passportindia.gov.in (GPSP 2.0). The photo upload field accepts JPEG only, exactly 630×810 pixels, maximum 250 KB. PNG files and files above 250 KB are rejected without a clear error message. Always upload from a desktop browser — mobile browsers trigger additional Passport Seva validation errors.",
  },
  {
    q: "Is the same photo standard used for OCI cards and Indian e-Visa?",
    a: "For OCI (Overseas Citizen of India) card applications, the same 35×45 mm / 630×810 px ICAO standard applies. For Indian e-Visa applications via indianvisaonline.gov.in, the requirement is 35×45 mm JPEG, maximum 1 MB. Our tool supports all three document types.",
  },
];

const relatedLinks = [
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "Canada Passport Photo Maker", href: "/canada-passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
  { label: "OCI Card Photo Maker", href: "/oci-card-photo-maker" },
  { label: "India e-Visa Photo Maker", href: "/india-evisa-photo-maker" },
];

export default function IndiaPassportPhotoMaker() {
  return (
    <>
      <SEO
        title="India Passport Photo Maker 2026 | 35×45mm ICAO Compliant — Free Online Tool"
        description="Create a compliant Indian passport photo for 2026. Updated to the September 2025 MEA mandate: 35×45mm (630×810px), 80–85% face coverage, pure white background. Free, instant, Passport Seva ready."
        url="https://www.photoresizer.co.in/india-passport-photo-maker"
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1">
          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="py-14 md:py-20">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-current" />
                Updated: September 2025 ICAO Mandate — New 35×45 mm Standard
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  India Passport Photo Maker
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                Generate a 2026-compliant Indian passport photo in seconds. Outputs 35×45 mm / 630×810 px JPEG ready for Passport Seva portal upload, PSK counters, VFS, and Indian e-Visa applications.
              </p>

              {/* ── Breaking change alert ── */}
              <div className="inline-flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-xs font-medium px-4 py-3 rounded-xl mb-8 text-left max-w-xl mx-auto">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Important (September 2025 Change):</strong> India replaced the old 2×2 inch (51×51 mm) square with the ICAO 35×45 mm portrait format. Submitting the old size is now the #1 rejection reason on the Passport Seva portal.
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "MEA & Passport Seva Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "35×45 mm ICAO Preset" },
                  { icon: Clock, label: "Ready in Under 10 Seconds" },
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
          <section id="tool" className="pb-12">
            <div className="container px-4 max-w-4xl mx-auto">
              <PassportApiTool defaultCountryCode="IN" />
            </div>
          </section>
  {/* ── Example Showcase ────────────────────────────────────────────── */}
          <section className="py-1">
            <div className="container px-2 max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  See Your Photo Transform
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  From upload to print-ready — see the complete process with measurements and dimensions.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-clean-sm">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                    alt="Passport photo with measurements"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-bold text-card-foreground">AI Processing</p>
                    <p className="text-xs text-muted-foreground mt-1">Face detection with biometric measurements applied</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-clean-sm">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg"
                    alt="Final compliant photo"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-bold text-card-foreground">Final Output</p>
                    <p className="text-xs text-muted-foreground mt-1">Government-compliant photo with white background</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-clean-sm">
                  <a href="http://localhost:8080/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg"
                      alt="4x6 print sheet"
                      className="w-full h-auto object-cover"
                    />
                  </a>
                  <div className="p-4">
                    <a href="http://localhost:8080/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-card-foreground hover:text-primary transition-colors">
                      Print Template
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">Ready-to-print 4×6 inch sheet with crop guides</p>
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
                  Built for the 2026 Indian Passport Standard
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Every parameter — size, face coverage, background — automatically meets the September 2025 MEA/ICAO update enforced on the Passport Seva and mPassport portals.
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
                title="How to Make Your Indian Passport Photo (2026)"
              />
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16 bg-card border-y border-border">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">

              <h2>Indian Passport Photo Requirements 2026 — Complete Official Guide</h2>
              <p>
                India's Ministry of External Affairs (MEA) updated its passport photo standards effective <strong>September 1, 2025</strong>, mandating full alignment with ICAO Doc 9303 biometric photo guidelines. These rules are enforced automatically by the Passport Seva (GPSP 2.0) and mPassport portals — non-compliant photos are rejected at upload without manual review. This guide covers every official specification for passport, OCI card, and e-Visa applications in 2026.
              </p>

              <h3>1. Size: The Critical 2025 Change</h3>
              <p>
                India replaced the old <strong>2×2 inch (51×51 mm) square format</strong> with the <strong>35×45 mm portrait format</strong> (width × height), aligned with global ICAO standards. This affects all applications made through Passport Seva Kendras (PSK), the online Passport Seva portal, and Indian missions abroad. Using the old square size is currently the single most common rejection reason on the Passport Seva portal.
              </p>
              <ul>
                <li><strong>Physical print size:</strong> 35 mm × 45 mm (portrait)</li>
                <li><strong>Digital upload (Passport Seva / mPassport):</strong> Exactly 630 × 810 pixels</li>
                <li><strong>File format:</strong> JPEG only (PNG is rejected)</li>
                <li><strong>File size:</strong> Under 250 KB (compress without changing pixel dimensions)</li>
              </ul>

              <h3>2. Face Coverage: Tighter Than Before</h3>
              <p>
                The September 2025 ICAO update raised the required face coverage from 70–80% to <strong>80–85% of the photograph height</strong>. This is measured from your chin to the crown of your head (including hair). In a 630×810 px image, your face must span approximately 648–689 pixels — leaving only 60–80 pixels of space above your head. Photos taken under the older, looser standard will now be rejected.
              </p>

              <h3>3. Background Requirements</h3>
              <p>
                The background must be <strong>plain white</strong>. Off-white, cream, and light grey are no longer accepted under the automated ICAO validation used by the Passport Seva portal. There must be no shadows on the background or on the face, no patterns, and no other objects. If photographing at home, stand at least one metre from a white wall to prevent shadow formation.
              </p>

              <h3>4. Expression, Gaze, and Lighting</h3>
              <ul>
                <li>Look directly into the camera lens — no head tilt or rotation</li>
                <li>Neutral expression, mouth closed (no smiling, no frowning)</li>
                <li>Eyes fully open and clearly visible</li>
                <li>Natural skin tones — no filters, beauty modes, or AI smoothing</li>
                <li>Even lighting across the face — no glare, red-eye, or harsh shadows</li>
              </ul>

              <h3>5. Glasses: Fully Prohibited Since September 2025</h3>
              <p>
                Glasses and spectacles are <strong>not permitted under any circumstances</strong> as of September 2025. The Passport Seva portal's biometric system will automatically reject photos containing glasses, even if there is no visible lens glare. This applies regardless of whether glasses are worn for vision correction. There is no medical exception for standard corrective lenses.
              </p>

              <h3>6. Head Coverings</h3>
              <p>
                Religious head coverings (turban, hijab, etc.) are permitted provided the entire face — from chin to forehead, including both cheeks and ears — remains fully visible. The covering must not cast shadows on any part of the face, and no facial features used for biometric identification may be obscured.
              </p>

              <h3>7. Document-Specific Requirements at a Glance</h3>
              <ul>
                <li><strong>Indian Passport (PSK / domestic):</strong> 35×45 mm print; 630×810 px JPEG under 250 KB for Passport Seva upload</li>
                <li><strong>OCI Card:</strong> Same 35×45 mm / 630×810 px ICAO standard</li>
                <li><strong>Indian e-Visa:</strong> 35×45 mm JPEG, maximum 1 MB, via indianvisaonline.gov.in</li>
                <li><strong>NRI via VFS Global:</strong> 35×45 mm prints + 630×810 px digital upload to Passport Seva</li>
                <li><strong>NRI via CKGS (USA):</strong> 630×810 px digital upload + 2×2 inch printed copies for the physical packet</li>
              </ul>

              <h3>8. Child Passport Photos</h3>
              <p>
                Children are subject to the same 35×45 mm / 630×810 px standard. Infants under approximately one year of age are allowed some flexibility on eye openness. Children must be photographed alone — no hands, arms, toys, or other people may be visible in the frame.
              </p>

              <h3>9. Common Rejection Reasons in 2026</h3>
              <ul>
                <li>Submitting the old 2×2 inch (51×51 mm) square format</li>
                <li>File over 250 KB or in PNG format on the Passport Seva portal</li>
                <li>Wrong pixel dimensions (must be exactly 630×810 px)</li>
                <li>Face coverage below 80% (common with photos taken for the old standard)</li>
                <li>Background that is off-white, grey, or has any shadow</li>
                <li>Glasses worn in the photo</li>
                <li>Uploading from a mobile browser (use desktop for Passport Seva)</li>
              </ul>

              <p>
                <em>Sources: passportindia.gov.in — Guidelines for ICAO Compliant Photographs (mPassport portal); Ministry of External Affairs, Government of India; ICAO Doc 9303 Part 3 (biometric passport standards); indianvisaonline.gov.in (e-Visa photo specifications). Last verified: June 2026.</em>
              </p>

            </article>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="py-14">
            <div className="container px-4 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-sm">
                  Common questions about Indian passport photo rules for 2026.
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