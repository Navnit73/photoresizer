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
    title: "100% Passport Canada Compliant",
    description:
      "Automated verification logic guarantees your photo aligns with Canadian 50x70 mm dimensions and 31-36 mm face height standards.",
  },
  {
    icon: Shield,
    title: "Instant White Background",
    description:
      "Canada requires a plain white or light-colored background. Our AI segments your portrait and replaces the background automatically.",
  },
  {
    icon: Check,
    title: "Neutral Expression Check",
    description:
      "Passport Canada requires a neutral expression. No smiling, mouth closed, and eyes looking straight ahead.",
  },
  {
    icon: Printer,
    title: "Print-Ready 4x6 Sheet",
    description:
      "Generate an individual digital file or a 4x6 print template featuring multiple copies, ready for printing.",
  },
];

const steps = [
  {
    title: "Upload Your Portrait",
    description:
      "Take a clear, centered photo in even lighting. Upload the JPG, PNG, or WebP file to our tool.",
  },
  {
    title: "Select Canada Preset",
    description:
      "The tool defaults to Canada. It automatically configures the 50x70 mm dimensions and face-height margins.",
  },
  {
    title: "Download HD Photo",
    description:
      "Our AI aligns your face, replaces the background, and generates a compliant photo and print sheet.",
  },
];

const faqs = [
  {
    q: "What is the official size of a Canada passport photo?",
    a: "The photo must be exactly 50 mm wide by 70 mm high (2 inches wide by 2 3/4 inches high). The head height from chin to crown must be between 31 mm and 36 mm.",
  },
  {
    q: "Do I need a photographer stamp on my Canadian passport photo?",
    a: "Yes, for printed applications submitted physically, Passport Canada requires the name and address of the commercial photographer and the date the photo was taken stamped on the back of one photo. If applying digitally, ensure your online application accepts the upload directly.",
  },
  {
    q: "What color should the background be?",
    a: "The background must be plain white or off-white. There must be no shadows, patterns, or textures visible.",
  },
  {
    q: "Can I wear head coverings?",
    a: "Head coverings worn daily for religious beliefs or medical reasons are permitted, provided they do not obscure any part of your face or cast shadows.",
  },
];

const relatedLinks = [
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "Schengen Visa Photo Maker", href: "/schengen-visa-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
];

export default function CanadaPassportPhotoMaker() {
  return (
    <>
      <SEO
        title="Canada Passport Photo Maker | Create 50x70mm Photos Online"
        description="Free online Canada passport photo maker. Instantly resize and crop your photo to the official 50x70 mm Canadian standards. AI replaces background and structures dimensions."
        url="https://www.photoresizer.co.in/canada-passport-photo-maker"
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1">
          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="py-14 md:py-20">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-current" />
                Updated for 2026 Passport Canada Standards
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  Canada Passport Photo Maker
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Perfectly format your photo to the official 50x70 mm (5x7 cm) Passport Canada guidelines. Get automatic background correction and biometric validation.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "Passport Canada Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "Official 50x70mm Preset" },
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
              <PassportApiTool defaultCountryCode="CA" />
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
                  Canadian Passport Photo Rules
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Our tool automatically calibrates your photo to meet Passport Canada's precise guidelines.
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
                title="How to Prepare Your Canadian Passport Photo"
              />
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16 bg-card border-y border-border">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">
              <h2>Official Canadian Passport Photo Requirements (2026 Guidelines)</h2>
              <p>
                Canadian passport applications are subject to some of the most detailed photographic requirements in the world. Passport Canada requires specific sizes, paper types, and certification from a commercial photography studio for physical submittals.
              </p>
              
              <h3>Technical Specifications</h3>
              <ul>
                <li><strong>Dimensions:</strong> 50 mm wide by 70 mm high (2 inches wide by 2 3/4 inches high).</li>
                <li><strong>Face Length:</strong> The distance from the chin to the crown of the head must be between 31 mm (1 1/4 inches) and 36 mm (1 7/16 inches).</li>
                <li><strong>Background:</strong> Plain white or a very light, uniform color. The background must not have shadows or gradient shifts.</li>
                <li><strong>Expression:</strong> Eyes open and clearly visible. Mouth must be closed, neutral expression, no smiling.</li>
              </ul>

              <h3>Important Note on Photographer Stamp</h3>
              <p>
                Please note that for physical paper-based applications, the back of one (1) photo must contain the date the photo was taken, as well as the name and complete address of the photo studio. The photo must have been taken within six months of your application date.
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
