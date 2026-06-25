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
    title: "100% US State Dept Compliant",
    description:
      "Automated verification logic guarantees your photo aligns with strict 2x2 inch dimensions, 600x600px ratio, and head sizing guidelines.",
  },
  {
    icon: Shield,
    title: "Instant Background Removal",
    description:
      "Removes home backdrops and replaces them with a pure, shadowless off-white or stark white background required for US passports.",
  },
  {
    icon: Check,
    title: "No Eyeglasses Detection",
    description:
      "We remind you and help verify that glasses are off, aligning with the State Department's strict rule against eyeglasses in applications.",
  },
  {
    icon: Printer,
    title: "Print-Ready 4x6 Sheet",
    description:
      "Generate an individual digital photo plus a 4x6 print template featuring multiple copies, ready to print at CVS, Walgreens, or home.",
  },
];

const steps = [
  {
    title: "Upload Your Front-Facing Portrait",
    description:
      "Take a picture in front of any wall in bright, even lighting. Upload the JPG, PNG, or WebP file to our tool.",
  },
  {
    title: "Select United States",
    description:
      "The tool is pre-set to the United States. It automatically configures the 2x2 inch layout and 600x600px output constraints.",
  },
  {
    title: "Download HD Photo & Print Sheet",
    description:
      "The AI detects biometric points, processes the backdrop, and renders your download. Save and attach to your passport application.",
  },
];

const faqs = [
  {
    q: "What is the official size of a US passport photo?",
    a: "The physical size must be exactly 2x2 inches (51x51 mm). Digitally, it must be a square between 600x600 pixels and 1200x1200 pixels at 300 DPI.",
  },
  {
    q: "Can I wear glasses in my US passport photo?",
    a: "No, the US Department of State prohibits wearing eyeglasses in passport and visa photos unless there is a verified medical exemption (e.g., recent eye surgery).",
  },
  {
    q: "How large should my head be in the frame?",
    a: "Your head (chin to top of hair) must occupy between 1 inch and 1 3/8 inches (50% to 69%) of the total height of the photo.",
  },
  {
    q: "What color should the background be?",
    a: "The background must be plain white or off-white. There should be no patterns, textures, or shadows behind you.",
  },
];

const relatedLinks = [
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "Canada Passport Photo Maker", href: "/canada-passport-photo-maker" },
  { label: "Schengen Visa Photo Maker", href: "/schengen-visa-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
];

export default function UsPassportPhotoMaker() {
  return (
    <>
      <SEO
        url="https://www.photoresizer.co.in/us-passport-photo-maker"
        title="US Passport Photo Maker | Create 2x2 Inch Photos Online"
        description="Free online US passport photo maker. Instantly resize and crop your photo to the official 2x2 inch (51x51 mm) standard. AI removes background & generates print sheets."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "US Passport Photo Maker",
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
                Updated for 2026 US Department of State Standards
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  US Passport Photo Maker
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Instantly crop, center, and format your photo to the exact 2x2 inch (51x51 mm) requirements. Fast, biometric-compliant, and 100% private.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "Government Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "Official US 2x2\" Preset" },
                  { icon: Clock, label: "Processed in Under 10 Seconds" },
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
              <PassportClientTool defaultCountryCode="US" />
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
                  Why Use Our US Passport Photo Tool?
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Our system aligns with the official regulations to save you time and money.
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
                title="How to Create Your US Passport Photo"
              />
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16 bg-card border-y border-border">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">
              <h2>Official US Passport Photo Requirements (2026 Guidelines)</h2>
              <p>
                Applying for a new United States passport, renewing an old one, or filing a DS-11 / DS-82 application requires submitting a biometric photograph that meets precise government regulations. A poorly sized or incorrect photo is the number one cause of passport application delays.
              </p>
              
              <h3>Detailed Dimensions & Ratios</h3>
              <ul>
                <li><strong>Physical Size:</strong> 2 x 2 inches (51 x 51 mm).</li>
                <li><strong>Head Height:</strong> The head must measure between 1 inch and 1 3/8 inches (25 mm - 35 mm) from the bottom of the chin to the top of the hair.</li>
                <li><strong>Eye Height:</strong> Eyes should be positioned between 1 1/8 inches and 1 3/8 inches (28 mm - 35 mm) from the bottom of the photo.</li>
                <li><strong>Digital Resolution:</strong> 600 x 600 pixels (minimum) to 1200 x 1200 pixels (maximum).</li>
                <li><strong>File Format:</strong> JPEG/JPG format with a file size equal to or less than 240 KB.</li>
              </ul>

              <h3>Poses, Lighting, and Expressions</h3>
              <p>
                Your picture must display a clear, front-facing view of your entire head and shoulders. Maintain a neutral expression or a natural smile with both eyes open. The lighting must be uniform to prevent harsh shadows on your face or behind your head. Ensure your attire contrasts with the white background (avoid white clothing).
              </p>

              <h2>How to Print Your 2x2 Photo</h2>
              <p>
                Our tool automatically compiles your photo into a standard 4x6 inch print template. You can download this template and print it on high-quality glossy photo paper at home, or upload it to any local printing kiosk (such as Walgreens, CVS, or Walmart) for a cheap borderless print.
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
