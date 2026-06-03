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
    title: "100% Nepalese Government Compliant",
    description:
      "Automated verification logic guarantees your photo aligns with Nepal's 35x45 mm requirements and head height criteria.",
  },
  {
    icon: Shield,
    title: "Instant White/Off-White Background",
    description:
      "Nepal requires a plain white or off-white background. Our AI segments your portrait and replaces the background automatically.",
  },
  {
    icon: Check,
    title: "Neutral Expression Check",
    description:
      "Government guidelines require a neutral expression. No smiling, mouth closed, and eyes looking straight ahead.",
  },
  {
    icon: Printer,
    title: "Print-Ready 4x6 Sheet",
    description:
      "Download a single high-quality photo or a 4x6 print sheet featuring multiple copies ready for printing.",
  },
];

const steps = [
  {
    title: "Upload Your Photo",
    description:
      "Take a clear, centered front-facing portrait. Avoid shadows and upload the image file to our tool.",
  },
  {
    title: "Select Nepal Preset",
    description:
      "The tool defaults to Nepal. It automatically targets the 35x45 mm layout and head-to-edge spacing requirements.",
  },
  {
    title: "Process & Download",
    description:
      "Our AI aligns your face, replaces the background, and gives you a compliant Nepalese passport photo.",
  },
];

const faqs = [
  {
    q: "What is the official size of a Nepal passport photo?",
    a: "The photo must measure exactly 35 mm wide by 45 mm high. The head (from chin to top of hair) must occupy between 70% and 80% (29 mm to 34 mm) of the photo.",
  },
  {
    q: "What color should the background be for a Nepal passport?",
    a: "The background must be plain, uniform, white or off-white. There should be no shadows, patterns, or textures visible behind the subject.",
  },
  {
    q: "Can I wear glasses in a Nepal passport photo?",
    a: "No, spectacles or eyeglasses are not permitted in Nepal passport photos. You must remove them before taking the photo.",
  },
  {
    q: "Can I wear head coverings?",
    a: "Head coverings are permitted only for religious reasons, provided they do not obscure your face (from chin to forehead) or cast shadows.",
  },
];

const relatedLinks = [
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "India Passport Photo Maker", href: "/india-passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
];

export default function NepalPassportPhotoMaker() {
  return (
    <>
      <SEO
        title="Nepal Passport Photo Maker | Create 35x45mm Photos Online"
        description="Free online Nepal passport photo maker. Instantly resize and crop your photo to the official 35x45 mm Nepalese standards. AI removes background & centers face."
        url="https://www.photoresizer.co.in/nepal-passport-photo-maker"
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1">
          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="py-14 md:py-20">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-current" />
                Updated for 2026 Nepalese Passport Standards
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  Nepal Passport Photo Maker
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Instantly size, crop, and segment your photo to match Nepalese Passport criteria. Fully automated, fast, and secure.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "Nepal Government Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "Official 35x45mm Preset" },
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
          <section id="tool" className="pb-12">
            <div className="container px-4 max-w-4xl mx-auto">
              <PassportApiTool defaultCountryCode="NP" />
            </div>
          </section>

          {/* ── Features ─────────────────────────────────────────────────────── */}
          <section className="py-14 bg-card border-y border-border">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  Nepalese Photo Standards Checked
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Our tool automatically calibrates your photo to meet Nepal's detailed guidelines.
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
                title="How to Prepare Your Nepalese Passport Photo"
              />
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16 bg-card border-y border-border">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">
              <h2>Official Nepal Passport Photo Requirements (2026 Guidelines)</h2>
              <p>
                Applications submitted to the Department of Passport (DoP) in Kathmandu or Nepalese embassies and consulates abroad require machine-readable, biometric passport photos. Nepal has strict rules regarding shadows, expressions, and clothing.
              </p>
              
              <h3>Technical Standards</h3>
              <ul>
                <li><strong>Dimensions:</strong> Exactly 35 mm wide by 45 mm high.</li>
                <li><strong>Head Height:</strong> The head (from top of hair to bottom of chin) must occupy between 70% and 80% of the photo height (29 mm to 34 mm).</li>
                <li><strong>Background:</strong> Plain white or off-white background. Dark colors or busy backgrounds are not allowed.</li>
                <li><strong>Expression:</strong> Eyes must be open and looking directly at the lens. Mouth closed, neutral expression, no smiling.</li>
              </ul>

              <h3>Important Guidelines</h3>
              <p>
                Do not wear uniforms, camouflage patterns, or civilian clothes that merge with the white background. Glasses are not permitted, and headwear is only allowed for religious reasons under the condition that it does not cast a shadow or obscure any part of your face.
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
