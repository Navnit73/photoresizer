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
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "EU Visa Code Regulation Compliant",
    description:
      "Verified against EU Visa Code Regulation (EC) No 810/2009 — the governing standard enforced by all 29 Schengen member-state consulates and VFS Global centres worldwide.",
  },
  {
    icon: Shield,
    title: "VFS-Safe Light Grey Background",
    description:
      "VFS Global's automated biometric system rejects dark or patterned backdrops. Our AI applies a plain light-grey background that clears both in-person and digital upload checks.",
  },
  {
    icon: Check,
    title: "ICAO Doc 9303 Face Alignment",
    description:
      "Aligns with International Civil Aviation Organization (ICAO) Doc 9303 biometric standards used at European immigration controls and eGates across the Schengen Area.",
  },
  {
    icon: Printer,
    title: "Print-Ready 4×6 Sheet + Digital JPG",
    description:
      "Download a 413×531 px digital JPEG (300 DPI) for online VFS uploads, plus a 4×6 print sheet with two identical copies for physical consulate submission.",
  },
];

const steps = [
  {
    title: "Upload Your Photo",
    description:
      "Take a sharp, front-facing portrait in good natural light. Stand at least 40 cm from the camera, keep your head straight, and upload the image — JPEG or PNG accepted.",
  },
  {
    title: "Select Schengen Area Preset",
    description:
      "The tool automatically loads the official 35×45 mm Schengen preset and ICAO biometric parameters. No manual sizing needed.",
  },
  {
    title: "AI Process & Download",
    description:
      "Our AI crops to the correct head-height ratio (70–80%), removes background clutter, and delivers a VFS-compliant JPEG ready for digital upload or printing.",
  },
];

const faqs = [
  {
    q: "What is the official size of a Schengen visa photo in 2026?",
    a: "The photo must measure exactly 35 mm wide by 45 mm high (3.5 × 4.5 cm / approx. 1.38 × 1.77 inches). This standard is harmonised across all 29 Schengen member states under EU Visa Code Regulation (EC) No 810/2009. For digital VFS uploads, export at 413 × 531 pixels at 300 DPI.",
  },
  {
    q: "What background colour is required for a Schengen visa photo?",
    a: "A plain white or light-grey background is the safest choice — accepted by all 29 Schengen countries. France and some VFS centres also accept light blue. Patterned, dark, or textured backgrounds are rejected. White is recommended when you are unsure which member state will process your application.",
  },
  {
    q: "How recent must my Schengen visa photo be?",
    a: "Your photo must have been taken within the last 6 months. If your appearance has changed significantly — hair, beard, or weight — you must take new photos even if the previous ones are under 6 months old.",
  },
  {
    q: "How many photos do I need for a Schengen visa application?",
    a: "Most consulates and VFS centres require two identical biometric photographs — one affixed to the application form and one for the visa sticker. It is advisable to print 4–6 copies for safety. Digital applications through VFS Global require one JPEG upload.",
  },
  {
    q: "Can I wear glasses in a Schengen visa photo?",
    a: "Glasses are strongly discouraged in 2026. France, Germany, the Netherlands, and Czech Republic explicitly recommend removing them. Italy, Spain, and Portugal allow glasses only if there is zero glare and the eyes are fully visible. The safest approach: remove glasses entirely to prevent rejection.",
  },
  {
    q: "Can I smile in a Schengen visa photo?",
    a: "No. A neutral facial expression with a closed mouth is mandatory. Eyes must be fully open, looking directly at the camera. No smiling, squinting, or raised eyebrows are permitted under ICAO biometric standards.",
  },
];

const relatedLinks = [
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "Canada Passport Photo Maker", href: "/canada-passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
];

export default function SchengenVisaPhotoMaker() {
  return (
    <>
      <SEO
        title="Schengen Visa Photo Maker 2026 | Free Online 35×45mm Tool"
        description="Create a compliant Schengen visa photo in seconds. Free online tool resizes your photo to the official 35×45 mm (413×531 px) standard for all 29 Schengen countries. AI background removal, ICAO-verified, VFS-ready JPEG download."
        url="https://www.photoresizer.co.in/schengen-visa-photo-maker"
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1">
          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="py-14 md:py-20">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-current" />
                Updated for 2026 · EU Visa Code Regulation (EC) No 810/2009
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Free Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  Schengen Visa Photo Maker
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Generate a biometrically valid 35×45 mm photo accepted by all 29 Schengen member states and VFS Global — France, Germany, Italy, Spain, Netherlands, Switzerland and more.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "ICAO Doc 9303 Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "All 29 Schengen States" },
                  { icon: Clock, label: "VFS-Ready in Under 10 Seconds" },
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
              <PassportApiTool defaultCountryCode="EU" />
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
                  <a href="https://www.photoresizer.co.in/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg"
                      alt="4x6 print sheet"
                      className="w-full h-auto object-cover"
                    />
                  </a>
                  <div className="p-4">
                    <a href="https://www.photoresizer.co.in/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-card-foreground hover:text-primary transition-colors">
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
                  Why Our Schengen Visa Photo Tool Passes Every Check
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Built on 2026 EU Visa Code standards and VFS Global digital upload specifications to eliminate the most common rejection reasons.
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
                title="How to Make Your Schengen Visa Photo in 3 Steps"
              />
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16 bg-card border-y border-border">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">

              <h2>Schengen Visa Photo Requirements 2026 — Official Complete Guide</h2>
              <p>
                Every Schengen visa application — whether submitted online through VFS Global or in person at a consulate — requires at least two identical biometric photographs. The specifications are harmonised across all 29 Schengen member states under <strong>EU Visa Code Regulation (EC) No 810/2009</strong> and the <strong>ICAO Doc 9303</strong> international biometric standard. A non-compliant photo is one of the most common reasons for immediate rejection during the VFS pre-check stage, often delaying your appointment and application timeline by weeks.
              </p>

              <h3>Official Schengen Photo Dimensions &amp; Technical Specifications</h3>
              <p>
                The physical print must measure exactly <strong>35 mm wide × 45 mm tall</strong> (3.5 × 4.5 cm, approximately 1.38 × 1.77 inches). This is a taller, narrower format than the American 2×2 inch (51×51 mm) passport photo — do not substitute one for the other.
              </p>
              <ul>
                <li><strong>Physical print size:</strong> 35 × 45 mm — mandatory for all 29 Schengen countries.</li>
                <li><strong>Digital upload (VFS Global):</strong> JPEG format, minimum 400 × 514 px, recommended export at <strong>413 × 531 px at 300 DPI</strong>, maximum file size 5 MB.</li>
                <li><strong>Head height:</strong> Face from chin to top of hair must occupy <strong>70–80% of the photo height</strong> (32 mm to 36 mm in a physical print).</li>
                <li><strong>Resolution:</strong> Minimum 300 DPI for print; sharp focus with no pixelation or blur.</li>
                <li><strong>Copies required:</strong> Two identical prints for physical applications; one JPEG for VFS digital submission.</li>
                <li><strong>Photo age:</strong> Must have been taken within the <strong>last 6 months</strong>.</li>
              </ul>

              <h3>Background Colour Rules for 2026</h3>
              <p>
                The background must be <strong>plain, uniform, and light in colour</strong>. White is the universally safest choice — accepted by all 29 Schengen member states. Light grey is widely accepted (Germany, Netherlands, Austria) and light blue is accepted by France. Dark, patterned, or textured backgrounds are rejected at every centre.
              </p>
              <p>
                VFS Global's automated biometric system runs background-tone checks during digital uploads. Even a slightly off-white or gradient background can fail the automated pre-check. When in doubt, use plain light grey or white.
              </p>

              <h3>Face, Pose &amp; Expression Requirements</h3>
              <p>
                Your face must be fully visible, centred in the frame, and occupy 70–80% of the photo height. Strict ICAO Doc 9303 standards apply:
              </p>
              <ul>
                <li><strong>Expression:</strong> Neutral — closed mouth, no smile, no raised eyebrows.</li>
                <li><strong>Eyes:</strong> Fully open, looking directly at the camera. No squinting or drooping eyelids.</li>
                <li><strong>Head position:</strong> Straight and level — no tilting, turning, or rotation.</li>
                <li><strong>Lighting:</strong> Even, shadow-free illumination across the face and background. No red-eye, glare, or flash reflections.</li>
                <li><strong>Glasses:</strong> Strongly discouraged. France, Germany, Netherlands, and Czech Republic recommend removing them. If worn, zero glare and fully visible eyes are mandatory. The safest approach: remove glasses entirely.</li>
                <li><strong>Head coverings:</strong> Only permitted for documented medical or religious reasons; face must remain fully uncovered.</li>
              </ul>

              <h3>Country-Specific Notes for 2026</h3>
              <p>
                While photo specifications are standardised, enforcement strictness varies by country. <strong>France (TLScontact)</strong> and <strong>Germany (VFS Global)</strong> run the most rigorous automated biometric checks — even minor background-tone deviations can trigger rejection. France additionally requires photos to be printed by an approved photo lab in certain cities. <strong>Italy and Spain</strong> tend to be slightly more lenient at in-person drop-offs but still reject white-background errors and non-neutral expressions. Apply the strictest standard (35×45 mm, light-grey background, taken within 6 months) regardless of which member state is processing your application.
              </p>

              <h3>Most Common Rejection Reasons — and How to Avoid Them</h3>
              <ul>
                <li>Wrong photo size (e.g., US 2×2 inch submitted instead of 35×45 mm)</li>
                <li>Face height outside the 70–80% range (too small or too close to the edge)</li>
                <li>Non-plain background — patterns, shadows cast on the backdrop, or gradient tone</li>
                <li>Photo older than 6 months</li>
                <li>Glasses causing glare or obscuring part of the eye</li>
                <li>Smiling, mouth open, or non-neutral expression</li>
                <li>Poor lighting — shadows on the face or uneven illumination</li>
                <li>Digital file outside VFS accepted dimensions or exceeding 5 MB</li>
              </ul>
              <p>
                Our tool addresses every one of these automatically: AI-powered face detection centres and resizes your photo to the precise 70–80% head ratio, applies a compliant light-grey background, and exports a 413×531 px JPEG at 300 DPI — ready for both digital VFS upload and physical printing.
              </p>

              <h3>How to Take the Perfect Source Photo at Home</h3>
              <p>
                You do not need a professional studio. Use a smartphone, stand <strong>at least 40–50 cm from the camera</strong>, and face a plain white wall in natural daylight (avoid direct sunlight which creates harsh shadows). Keep your head level, look directly into the lens, and relax your expression. Ensure your shoulders and the top of your head are both in frame. Upload the result to our tool — the AI handles all cropping, sizing, and background correction automatically.
              </p>

            </article>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="py-14">
            <div className="container px-4 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  Schengen Visa Photo — Frequently Asked Questions (2026)
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Sourced from EU Visa Code Regulation (EC) No 810/2009 and VFS Global official guidelines.
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