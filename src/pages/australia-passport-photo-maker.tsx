import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PassportApiTool } from "@/components/editor/PassportApiTool";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
import {
  Check,
  Clock,
  Globe,
  Lock,
  Printer,
  Shield,
  ShieldCheck,
  Star,
  FileCheck,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "DFAT & ICAO Compliant — 2026 Standards",
    description:
      "Fully calibrated to the Department of Foreign Affairs and Trade (DFAT) guidelines and ICAO Doc 9303 biometric standards. Outputs 35×45 mm with a head height of 32–36 mm from chin to crown.",
  },
  {
    icon: Shield,
    title: "Pure White or Light-Grey Background",
    description:
      "DFAT requires a plain, shadowless white or light-grey background. Our AI segments your portrait and replaces the background — no studio required.",
  },
  {
    icon: Check,
    title: "Expression & Biometric Checks",
    description:
      "Australian passport assessors use biometric facial recognition. We check for neutral expression, mouth closed, both eyes fully open, no head tilt, and no glasses before you download.",
  },
  {
    icon: Printer,
    title: "Digital File + 4×6 Print Sheet",
    description:
      "Download an 826×1062 px JPEG for digital visa applications (ImmiAccount), plus a 4×6 inch print template with multiple 35×45 mm copies ready for dye-sublimation printing.",
  },
];

const steps = [
  {
    title: "Take or Upload a Clear Headshot",
    description:
      "Use a recent colour photo taken within the last 6 months. Face the camera directly against a light background. Remove glasses. Rear camera at eye level works well — have someone else hold the phone if possible.",
  },
  {
    title: "Select Australia — DFAT 35×45 mm Preset",
    description:
      "The tool applies the official Australian Passport Office preset: 35×45 mm portrait, 826×1062 px digital output, plain white background, and 32–36 mm head height compliance.",
  },
  {
    title: "Download & Print on Glossy Photo Paper",
    description:
      "Save the digital file for visa uploads (ImmiAccount) or take the 4×6 print sheet to an Officeworks, Australia Post, or professional camera store for dye-sublimation printing. Do not use standard inkjet or copy paper.",
  },
];

const faqs = [
  {
    q: "What is the official size of an Australian passport photo in 2026?",
    a: "DFAT specifies a range of 35–40 mm wide by 45–50 mm high. The standard preset used by Australian photo providers is exactly 35×45 mm. Your face (chin to crown) must measure between 32 mm and 36 mm within the frame — occupying approximately 70–80% of the photo height. The digital equivalent is 826×1062 pixels at 600 DPI.",
  },
  {
    q: "What background colour is required for an Australian passport photo?",
    a: "The Australian Passport Office requires a plain, uniform white or light-grey background. There must be no shadows, patterns, textures, or other objects behind the subject. Stand at least 60 cm from the wall when photographing at home to prevent background shadows.",
  },
  {
    q: "Are glasses allowed in Australian passport photos in 2026?",
    a: "No. Glasses have not been permitted in Australian passport photos since 2017. This includes prescription glasses, reading glasses, and tinted lenses. A narrow medical exception exists but requires advance written approval from the Australian Passport Office before your application is lodged. Vision impairment alone is not a valid reason to keep glasses on.",
  },
  {
    q: "Can I smile in my Australian passport photo?",
    a: "No. A neutral expression is mandatory for all applicants aged 3 and over. Your mouth must be closed, and your face must be relaxed — no smiling, frowning, raised eyebrows, or squinting. Both eyes must be fully open and looking directly at the lens. Smiling is one of the most common reasons Australian passport photos are rejected.",
  },
  {
    q: "Do I need to provide printed or digital photos for an Australian passport?",
    a: "Two identical physical printed photos are required for all Australian passport applications. There is no government portal for digital photo upload for passports. Photos must be printed on high-quality glossy photo paper using a dye-sublimation printer — standard inkjet or home printing is not accepted by DFAT. For Australian visa applications (subclass 500, visitor, etc.), a digital 35×45 mm JPEG is uploaded through ImmiAccount.",
  },
  {
    q: "What is a guarantor and do I need one for Australian passport photos?",
    a: "For most adult passport applications, a guarantor must endorse the back of one of your two photos. The guarantor must write 'This is a true photo of [your full name]' and sign it. The guarantor must be an Australian citizen or permanent resident aged 18 or over who has known you for at least 12 months. Standard adult renewals through the APRIL online renewal system may not require a guarantor — always check the instructions on your specific application form.",
  },
  {
    q: "Are head coverings allowed in Australian passport photos?",
    a: "Head coverings are only permitted for genuine religious or medical reasons. Even when worn, your full face — from chin to forehead — must be completely visible with no shadows cast on any facial feature. The covering must not obscure the hairline, cheeks, or chin.",
  },
  {
    q: "What photo is required for an Australian visa application (ImmiAccount)?",
    a: "Australian visa applications submitted through ImmiAccount require a digital 35×45 mm JPEG. The recommended resolution is at least 826×1062 pixels (600 DPI equivalent). The same face coverage, background, expression, and no-glasses rules apply. For applicants applying from countries where an Australian Visa Application Centre (AVAC) is available, biometric photos may also be captured on-site at the centre.",
  },
];

const relatedLinks = [
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "Canada Passport Photo Maker", href: "/canada-passport-photo-maker" },
  { label: "India Passport Photo Maker", href: "/india-passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
  { label: "Australia Visa Photo Maker", href: "/australia-visa-photo-maker" },
];

export default function AustraliaPassportPhotoMaker() {
  return (
    <>
      <SEO
        title="Australia Passport Photo Maker 2026 | Free DFAT-Compliant 35×45mm Tool"
        description="Create a compliant Australian passport photo online in seconds. 35×45mm, 826×1062px, plain white background, DFAT & ICAO standards. Free digital download + 4×6 print sheet."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Australia Passport Photo Maker",
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
                Verified Against DFAT & ICAO 2026 Guidelines — passports.gov.au
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  Australia Passport Photo Maker
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Instantly resize and crop your photo to the official DFAT standard — 35×45 mm, plain white background, 32–36 mm head height. Download a 826×1062 px digital file or a 4×6 print sheet for dye-sub printing.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "DFAT & ICAO Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "Official 35×45 mm Preset" },
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
          <section id="tool" className="pb-3">
            <div className="container px-4 max-w-4xl mx-auto">
              <PassportApiTool defaultCountryCode="AU" />
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
                  Every Australian Photo Rule — Automatically Checked
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  DFAT uses biometric facial recognition at every Australian border. Our tool validates size, head height, background, expression, and glasses before you download.
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
                title="How to Create Your Australian Passport Photo (2026)"
              />
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16 bg-card border-y border-border">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">

              <h2>Australian Passport Photo Requirements 2026 — Complete DFAT Guide</h2>
              <p>
                The Australian Passport Office, operated by the Department of Foreign Affairs and Trade (DFAT), enforces some of the strictest passport photo standards in the world. Photos are verified using biometric facial recognition at Australian borders — a single technical error can pause your entire application. This guide covers every official requirement for Australian passport, visa, and citizenship photos in 2026, verified against passports.gov.au and the DFAT General Photo Guidelines brochure.
              </p>

              <h3>1. Size and Dimensions</h3>
              <p>
                DFAT specifies a valid size range of <strong>35–40 mm wide by 45–50 mm high</strong>. The industry standard — and the preset used by Australia Post, Officeworks, and most professional studios — is exactly 35×45 mm. If a photo exceeds the accepted measurements, the official DFAT guidance explicitly states that you must not trim it to size yourself; a fresh photo must be taken instead.
              </p>
              <ul>
                <li><strong>Physical print size:</strong> 35–40 mm wide × 45–50 mm high (35×45 mm standard)</li>
                <li><strong>Head height (chin to crown):</strong> 32–36 mm — approximately 70–80% of frame height</li>
                <li><strong>Digital file (visa / ImmiAccount):</strong> 826×1062 pixels at 600 DPI</li>
                <li><strong>File format:</strong> JPEG</li>
                <li><strong>Quantity required:</strong> Two identical prints for passport applications</li>
              </ul>

              <h3>2. Background Requirements</h3>
              <p>
                The background must be <strong>plain white or light grey</strong> — uniform across the entire photo with no shadows, patterns, textures, or objects. This is the most common rejection reason at Australian Passport Office counters. When photographing at home, stand at least 60 cm from the background wall to prevent shadow formation. The background must not be the same colour as your clothing.
              </p>

              <h3>3. Expression, Eyes, and Head Position</h3>
              <ul>
                <li>Face the camera directly — no head tilt, rotation, or turning</li>
                <li>Neutral expression only (applies to all applicants aged 3 and over)</li>
                <li>Mouth firmly closed — no smiling, frowning, or raised eyebrows</li>
                <li>Both eyes fully open and looking directly at the lens</li>
                <li>No red-eye, shadows on the face, or reflections on skin</li>
                <li>Natural, unedited skin tones — no filters, beauty modes, or retouching of any kind</li>
              </ul>

              <h3>4. Glasses — Prohibited Since 2017</h3>
              <p>
                Glasses have not been permitted in Australian passport photos since 2017. This prohibition covers prescription glasses, reading glasses, sunglasses, and tinted lenses. A narrow medical exemption exists but requires advance written approval from the Australian Passport Office before lodging your application — vision impairment alone is not a valid reason. Removing glasses is always the safest approach.
              </p>

              <h3>5. Print Quality — Dye-Sublimation Required</h3>
              <p>
                DFAT requires photos to be printed on <strong>high-quality glossy photo paper using a dye-sublimation printer</strong>. DFAT assessors examine prints under a magnifying glass for ink dots, stripes, pixel patterns, smudges, or colour casts. Standard inkjet printers and home printing typically fail this inspection. Acceptable providers in Australia include Australia Post (A$19 bundled with lodgement), Officeworks Kodak Apex kiosks, and professional camera stores.
              </p>

              <h3>6. Guarantor Endorsement</h3>
              <p>
                For most adult passport applications, a guarantor must endorse the back of one of the two required photos by writing <em>"This is a true photo of [your full name]"</em> and signing it. The guarantor must be an Australian citizen or permanent resident aged 18 or over who has known you for at least 12 months — they do not need to hold a passport themselves. Incorrectly completed guarantor declarations are a leading cause of returned applications. Note that standard adult renewals through the APRIL online renewal portal may not require a guarantor; always follow the instructions on your specific form.
              </p>

              <h3>7. Head Coverings</h3>
              <p>
                Head coverings are permitted only for genuine religious or medical reasons. Even when worn, your entire face — from chin to forehead, including both cheeks — must be fully visible. The covering must not cast any shadow on the face or obscure any feature used in biometric identification.
              </p>

              <h3>8. Recency and Appearance</h3>
              <p>
                Photos must have been taken within the <strong>last 6 months</strong> and must reflect your current appearance. If your appearance has changed significantly — new beard, major hairstyle change, or weight change — new photos are required even if your existing photos are less than 6 months old.
              </p>

              <h3>9. Australian Visa Photos (ImmiAccount)</h3>
              <p>
                For Australian visa applications (visitor, student subclass 500, work visas, etc.) submitted through the Department of Home Affairs' ImmiAccount portal, a digital 35×45 mm JPEG is uploaded directly. The recommended resolution is 826×1062 pixels. All the same biometric rules apply: white background, 32–36 mm head height, neutral expression, no glasses. Applicants from countries where an Australian Visa Application Centre (AVAC) operates may also have biometric photos captured on-site.
              </p>

              <h3>10. Common Rejection Reasons in 2026</h3>
              <ul>
                <li>Shadows on the face or background</li>
                <li>Wrong background colour (off-white, cream, or grey)</li>
                <li>Glasses present in the photo</li>
                <li>Smiling or non-neutral expression</li>
                <li>Head height outside the 32–36 mm range (usually too small)</li>
                <li>Photos printed on standard inkjet or copy paper</li>
                <li>Missing or incorrectly worded guarantor endorsement on back of photo</li>
                <li>Photo older than 6 months</li>
              </ul>

              <p>
                <em>Sources: Australian Passport Office — passports.gov.au (Photo Requirements page, April 2026); DFAT General Photo Guidelines brochure; Department of Home Affairs — ImmiAccount photo specifications; ICAO Doc 9303 Part 3. Last verified: June 2026.</em>
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
                  Official answers to the most common questions about Australian passport photo rules in 2026.
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