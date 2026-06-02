import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PassportApiTool } from "@/components/editor/PassportApiTool";
import { InternalLinks } from "@/components/shared/InternalLinks";
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
  Users,
  Zap,
} from "lucide-react";

// ─── Page-level constants ────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Globe,
    title: "150+ Countries Supported",
    description:
      "Fully compliant presets for the US, UK, Canada, India, Australia, Schengen Area, UAE, Japan, Singapore, and over 140 other nations — specifications loaded automatically when you select a country.",
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Zap,
    title: "1-Click AI Cropping",
    description:
      "Computer vision instantly detects your eyes and chin to crop the photo to exact dimensional requirements, saving you minutes of manual adjustment in desktop editors.",
    color:
      "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Shield,
    title: "Official Background Correction",
    description:
      "Our background-removal engine separates you from any backdrop and replaces it with the official white or off-white colour required by each government — no green screen needed.",
    color:
      "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Printer,
    title: "Print-Ready 4×6 Grid",
    description:
      "Generates a high-resolution 4×6 inch print sheet containing multiple copies of your photo — ready to print at any pharmacy, print shop, or home inkjet printer.",
    color:
      "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Lock,
    title: "Privacy-First Processing",
    description:
      "Photos are processed on ephemeral serverless nodes and discarded immediately after download. We never store, index, or share your biometric images.",
    color: "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400",
  },
  {
    icon: ShieldCheck,
    title: "Biometric Compliance Check",
    description:
      "After processing, a detailed panel shows head-height ratio, eye-position ratio, top-margin clearance, and file-size — all compared against official government thresholds.",
    color: "bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400",
  },
];

const HOW_TO_STEPS = [
  {
    step: "01",
    title: "Take a Portrait Photo",
    description:
      "Stand 4–6 feet from a plain wall under uniform, shadow-free lighting. Look straight at the camera with a neutral expression, both eyes open. Remove glasses.",
  },
  {
    step: "02",
    title: "Select Country & Document Type",
    description:
      "Choose your destination country from the dropdown. The system automatically loads the official dimensional and background requirements for that nation's passport or visa.",
  },
  {
    step: "03",
    title: "Upload & AI-Process",
    description:
      "Drag-and-drop or browse your photo. Click 'Process with AI' — our engine validates head alignment, removes the background, and outputs a compliant high-res JPG within seconds.",
  },
  {
    step: "04",
    title: "Review & Download",
    description:
      "Inspect the biometric analysis panel, then download the individual photo or the 4×6 print sheet. Print at home or at any local photo lab.",
  },
];

const COUNTRIES_SUPPORTED = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "India",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Switzerland",
  "Japan",
  "South Korea",
  "Singapore",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Nepal",
  "Bangladesh",
  "Pakistan",
  "China",
  "Schengen Area",
];

const FAQS = [
  {
    q: "Are my uploaded images stored on your servers?",
    a: "No. Your photo is processed in-memory on ephemeral serverless nodes and is immediately discarded once you download the result. We do not store, index, or sell your biometric data.",
  },
  {
    q: "Which file formats can I upload?",
    a: "We accept PNG, JPG, JPEG, and WebP files up to 10 MB in size. For best results, upload a file that is at least 600×600 pixels.",
  },
  {
    q: "Can I print the downloaded photo at home?",
    a: "Yes. Download the Print Grid and print it on standard 4×6 inch (10×15 cm) glossy photo paper. You can also upload it to any online or in-store photo lab.",
  },
  {
    q: "Why was my submitted photo rejected by the embassy or agency?",
    a: "Common rejection causes include shadows on the face or background, a tilted head, eyes not fully open, glasses worn, or hair covering the eyebrows. Retake the photo from scratch following the on-screen tips and re-process.",
  },
  {
    q: "Do I need to remove my glasses?",
    a: "For most countries — including the US, UK, Canada, and Schengen nations — glasses are not permitted in passport or visa photos. We strongly recommend removing them regardless of country to maximise acceptance rates.",
  },
  {
    q: "What background colour is used after removal?",
    a: "The AI replaces your background with plain white or a very light grey, which meets official requirements for the vast majority of countries. The exact shade is selected automatically based on the country preset you choose.",
  },
  {
    q: "How accurate is the biometric compliance check?",
    a: "Our AI measures head-height ratio (50–69%), eye-position ratio (56–69% from bottom), and top-margin clearance (8–15%) — the three parameters checked by most automated government scanning systems.",
  },
  {
    q: "Is the tool free to use?",
    a: "Yes — the core passport photo maker, background remover, biometric check, and print-sheet generator are all free to use with no registration required.",
  },
  {
    q: "Can I use a selfie or a photo taken on my phone?",
    a: "Yes, phone photos work well. Make sure the selfie is taken from arm's length or further (not a close-up), lighting is even, and the background is plain. Avoid strong backlighting.",
  },
  {
    q: "What are the US passport photo requirements?",
    a: "US passport photos must be 2×2 inches (51×51 mm), in colour, with a plain white or off-white background. Your head must occupy 50–69% of the frame height. Eyes must be open and looking directly at the camera.",
  },
];

const INTERNAL_LINKS = [
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
  { label: "Passport Photo App", href: "/passport-photo-app" },
  { label: "US Visa Photo Tool", href: "/us-visa-photo" },
  { label: "Reduce Photo Size to 50KB", href: "/reduce-photo-size-50kb" },
  { label: "Background Remover", href: "/background-remover" },
  { label: "Image Resizer", href: "/image-resizer" },
  { label: "ID Photo Maker", href: "/id-photo-maker" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: React.FC<any>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <span className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
        <Icon className="w-3.5 h-3.5" />
      </span>
      {label}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: (typeof FEATURES)[0]) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow duration-200">
      <div className={`p-3 rounded-xl shrink-0 h-fit ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function StepCard({ step, title, description }: (typeof HOW_TO_STEPS)[0]) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-md">
          {step}
        </div>
        <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-2" />
      </div>
      <div className="pb-8">
        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-1">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <div className="py-5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-1.5 flex items-start gap-2">
        <span className="text-blue-500 font-bold shrink-0">Q{index + 1}.</span>
        {q}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-7">
        {a}
      </p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PassportPhotoMaker() {
  return (
    <>
      <SEO
        title="Free Online Passport Photo Maker | AI-Compliant in Seconds"
        description="Create government-compliant passport & visa photos in seconds. AI auto-crops, removes background, and generates a print-ready 4×6 sheet for 150+ countries."
        url="https://www.photoresizer.co.in/passport-photo-maker"
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1">
          {/* ── Hero ── */}
          <section className="py-14 md:py-20">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-current" />
                Trusted by travellers in 150+ countries
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5 leading-tight">
                Online Passport Photo{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Maker
                </span>
              </h1>
              <section id="tool" className="pb-8">
                <div className="container px-0">
                  <PassportApiTool />
                </div>
              </section>
              <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                No expensive photo booths. No complex editors. Let our advanced
                AI format your portrait to official biometric standards —
                background removed, face auto-cropped, print grid ready.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <TrustBadge icon={ShieldCheck} label="Biometric Compliant" />
                <TrustBadge icon={Lock} label="Privacy-Safe Processing" />
                <TrustBadge icon={Globe} label="150+ Country Presets" />
                <TrustBadge icon={Clock} label="Results in Seconds" />
              </div>

              {/* Scroll CTA */}
              <a
                href="#tool"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
              >
                <Camera className="w-4 h-4" />
                Create My Passport Photo — Free
              </a>
            </div>
          </section>

          {/* ── Tool ── */}

          {/* ── Features ── */}
          <section className="py-16 bg-white/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  Everything You Need, Nothing You Don't
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
                  Professional biometric photo creation with zero learning
                  curve.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURES.map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            </div>
          </section>

          {/* ── How To ── */}
          <section className="py-16">
            <div className="container px-4 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  How to Create a Passport Photo in 4 Steps
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  The entire process takes under two minutes.
                </p>
              </div>
              <div>
                {HOW_TO_STEPS.map((s) => (
                  <StepCard key={s.step} {...s} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Countries ── */}
          <section className="py-14 bg-white/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  Country-Specific Photo Requirements
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
                  Every country has unique dimensional rules. Our system
                  auto-loads the correct spec — here's a snapshot of popular
                  destinations we support.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                {COUNTRIES_SUPPORTED.map((country) => (
                  <span
                    key={country}
                    className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full"
                  >
                    {country}
                  </span>
                ))}
                <span className="text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 px-3 py-1.5 rounded-full">
                  + 130 more
                </span>
              </div>
            </div>
          </section>

          {/* ── Benefits ── */}
          <section className="py-16">
            <div className="container px-4 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  Who Is This Tool For?
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Users,
                    title: "Frequent Travellers & Visa Applicants",
                    body: "Skip the photo studio queue. Generate a fresh compliant photo from home minutes before submitting an online visa application.",
                  },
                  {
                    icon: Globe,
                    title: "International Students & Workers",
                    body: "Study visa, work permit, residency card — different documents often need different photo sizes. Swap country presets and re-process in seconds.",
                  },
                  {
                    icon: Clock,
                    title: "Last-Minute Passport Renewals",
                    body: "Missed the photo booth closing time? Use our tool at midnight, download the print sheet, and drop it at a pharmacy in the morning.",
                  },
                  {
                    icon: Check,
                    title: "Families & Guardians",
                    body: "Processing photos for children or elderly relatives is easy — our AI adapts to any portrait without extra configuration.",
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 h-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
                        {title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-16 bg-white/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
            <div className="container px-4 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 divide-y divide-slate-100 dark:divide-slate-800">
                {FAQS.map((item, i) => (
                  <FaqItem key={i} {...item} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* ── SEO Article ── */}
          <section className="py-16">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">
              <h2>Official Passport Photo Compliance Guidelines</h2>
              <p>
                Whether applying for a new passport, renewing an existing one,
                or completing an electronic visa application, the quality of
                your photograph has a direct impact on processing speed.
                Government agencies globally use automated optical systems to
                scan biometric parameters on every incoming application — a
                non-compliant photo will be rejected without human review.
              </p>

              <h3>Common Rejection Reasons — and How to Avoid Them</h3>
              <p>
                Heavy shadows are the leading cause of rejection. Lighting must
                be uniform — avoid standing directly under overhead lamps, which
                cast dark rings beneath the eyes. Natural window light or a
                diffused flash produces far better results.
              </p>
              <p>
                In most regions, including the United States, wearing eyeglasses
                is strictly prohibited in passport photos. Even in countries
                that allow them, lenses must have zero reflection and frames
                must not obscure the pupils. We strongly recommend removing
                glasses entirely to maximise acceptance rates.
              </p>
              <p>
                Facial expression must be neutral — no wide smile, smirk, or
                frown. Keep your mouth relaxed, look directly into the camera,
                and ensure both eyes are wide open. Tilting the head even
                slightly can cause automated systems to reject the photo.
              </p>

              <h3>How Our AI Pipeline Works</h3>
              <p>
                Our serverless AI engine uses computer vision to measure exact
                ratios — checking, for instance, whether your head height falls
                within the mandatory 50%–69% vertical boundary. It then
                constructs a multi-photo print sheet formatted for standard 4×6
                inch photographic paper, allowing you to print at a local
                pharmacy for a fraction of the cost of a traditional photo
                studio session.
              </p>

              <h3>Printing Recommendations</h3>
              <p>
                For the sharpest prints, use the Print Grid download on 4×6 inch
                (10×15 cm) glossy photo paper with an inkjet printer set to its
                maximum photo quality. If printing at a lab, upload the file as
                a standard 4×6 print and select "borderless" to avoid unexpected
                white margins.
              </p>
            </article>
          </section>

          {/* ── CTA Banner ── */}
          <section className="py-14">
            <div className="container px-4 max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl shadow-blue-500/20">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                  Ready to Create Your Passport Photo?
                </h2>
                <p className="text-blue-100 mb-7 text-sm leading-relaxed">
                  Join thousands of travellers who skip the photo booth. Free,
                  fast, and fully compliant.
                </p>
                <a
                  href="#tool"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-7 py-3.5 rounded-xl shadow-md hover:bg-blue-50 transition-all duration-200"
                >
                  <Camera className="w-4 h-4" />
                  Start for Free — No Sign Up
                </a>
              </div>
            </div>
          </section>

          {/* ── Internal Links ── */}
          <div className="container px-4 pb-16">
            <InternalLinks links={INTERNAL_LINKS} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
