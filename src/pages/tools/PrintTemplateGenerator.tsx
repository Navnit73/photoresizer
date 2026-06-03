import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InternalLinks } from "@/components/shared/InternalLinks";
import PrintTemplateApp from "./PrintTemplateApp";
import { Link } from "react-router-dom";
import {
  FileText,
  HelpCircle,
  Image,
  Palette,
  Printer,
  Scissors,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Printer,
    title: "Print-Ready Output",
    description: "Optimized for home printers, pharmacy kiosks, and professional photo labs at 300 DPI.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Scissors,
    title: "Crop Lines Included",
    description: "Thin guide lines around each photo make cutting quick and accurate with no guesswork.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Generate your print sheet in seconds — no software downloads or sign-ups required.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "100% Private",
    description: "All processing happens in your browser. Your photos never leave your device.",
    color: "bg-rose-50 text-rose-600",
  },
];

const SIZE_OPTIONS = [
  { paper: "4×6 inch", photos: "Up to 6 photos", best: "Home printing" },
  { paper: "5×7 inch", photos: "Up to 9 photos", best: "Larger prints" },
  { paper: "A4", photos: "Up to 15 photos", best: "Standard international" },
  { paper: "Letter", photos: "Up to 14 photos", best: "US letter size" },
];

const HOW_TO_STEPS = [
  {
    step: "01",
    title: "Upload Your Passport Photo",
    description:
      "Select a clear, front-facing digital passport photo from your device. Supports JPG, PNG, and WebP formats up to 10 MB.",
  },
  {
    step: "02",
    title: "Choose Paper & Layout",
    description:
      "Select your paper size (4×6, A4, Letter, or custom) and how many copies you want on one sheet. Adjust spacing and margins as needed.",
  },
  {
    step: "03",
    title: "Download & Print",
    description:
      "Get a 300 DPI high-resolution JPG or PDF ready for printing. Cut along the crop lines and use the photos for passport, visa, or ID applications.",
  },
];

const FAQs = [
  {
    q: "How many passport photos fit on a 4x6 inch paper?",
    a: "A standard 4x6 inch (10x15 cm) paper can comfortably fit up to 6 standard 2x2 inch (51x51 mm) or 35x45 mm passport photos. Our tool automatically arranges them for optimal printing with crop lines.",
  },
  {
    q: "How do I print passport photos at home?",
    a: "Simply upload your cropped passport photo to our tool, select your paper size (e.g., 4x6 or A4), and choose how many copies you want. Click 'Generate' to download a 300 DPI high-resolution JPG or PDF. You can then print this file using your home color printer on high-quality photo paper.",
  },
  {
    q: "Is it free to create a print template?",
    a: "Yes, our passport photo print template generator is completely free. You can generate and download your print-ready layout without any cost.",
  },
  {
    q: "Do I need special photo paper?",
    a: "Yes, for official use, you should print your passport photos on high-quality glossy or matte photo paper (depending on your country's requirements). Standard printer paper is usually rejected by government agencies.",
  },
  {
    q: "What paper size should I use?",
    a: "4×6 inch is the most common for home printing. A4 is popular in Europe, Asia, and India. Letter size is standard in the US. Choose whatever your printer supports.",
  },
  {
    q: "Can I use this for visa photos?",
    a: "Yes, the tool supports both 2×2 inch (US/India) and 35×45 mm (Europe/UK/Australia) standard photo sizes, which cover most visa requirements worldwide.",
  },
];

const PAPER_SIZE_TABLE = [
  { size: "4×6 inch", mm: "101.6 × 152.4 mm", photos: "Up to 6 photos", use: "Home printing, pharmacy kiosks" },
  { size: "5×7 inch", mm: "127 × 177.8 mm", photos: "Up to 9 photos", use: "Larger format prints" },
  { size: "A4", mm: "210 × 297 mm", photos: "Up to 15 photos", use: "Europe, Asia, India offices" },
  { size: "Letter", mm: "215.9 × 279.4 mm", photos: "Up to 14 photos", use: "US and North America" },
];

const LAYOUT_OPTIONS = [
  { copies: "4 photos", size: "2×2 inch", paper: "4×6" },
  { copies: "6 photos", size: "2×2 inch", paper: "4×6" },
  { copies: "8 photos", size: "35×45 mm", paper: "A4" },
  { copies: "12 photos", size: "2×2 inch", paper: "A4" },
  { copies: "16 photos", size: "35×45 mm", paper: "A4" },
  { copies: "20 photos", size: "Mixed", paper: "A4" },
];

const INTERNAL_LINKS = [
  { label: "Passport Photo Maker", href: "/passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
  { label: "US Visa Photo Tool", href: "/us-visa-photo" },
  { label: "UK Visa Photo Maker", href: "/uk-visa-photo" },
  { label: "Canada Visa Photo Tool", href: "/canada-visa-photo" },
  { label: "Australia Visa Photo", href: "/australia-visa-photo" },
  { label: "Background Remover", href: "/background-remover" },
  { label: "Image Resizer", href: "/image-resizer" },
  { label: "Compress Image", href: "/compress-image" },
];

export default function PrintTemplateGenerator() {
  return (
    <>
      <SEO
        title="Passport Photo Print Template Generator | Free 4×6 & A4 Layout"
        description="Create a printable passport photo sheet instantly. Upload one passport photo and generate multiple copies on 4×6, A4, or custom paper sizes. 100% free with 300 DPI output."
        url="https://www.photoresizer.co.in/passport-photo-print-template-generator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Passport Photo Print Template Generator",
          applicationCategory: "DesignApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />

        <main className="flex-1">
          {/* ── Hero Section ─────────────────────────────────────────────── */}
          <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 text-lime-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Free Online Tool — No Registration Required
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                Passport Photo Print Template Generator
              </h1>
              <p className="text-slate-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
                Create a printable passport photo sheet instantly. Upload one photo
                and generate multiple copies on 4×6, A4, or custom paper sizes.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto sm:max-w-none">
                {[
                  { value: "4×6 to A4", label: "Paper Sizes" },
                  { value: "300 DPI", label: "Print Quality" },
                  { value: "Instant", label: "Generation" },
                  { value: "100%", label: "Free" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-slate-50 rounded-xl px-3 py-3 sm:py-4 border border-slate-100"
                  >
                    <p className="text-xl sm:text-2xl font-black text-lime-600 leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tool Component ────────────────────────────────────────────── */}
          <section className="py-8 bg-slate-50">
            <div className="container px-4">
              <PrintTemplateApp />
            </div>
          </section>

          {/* ── Features Section ─────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Why Use Our Print Template Generator?
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Stop paying high fees at photo studios. With our free tool, create
                  professional print-ready passport photo sheets in seconds.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {FEATURES.map(({ icon: Icon, title, description, color }) => (
                  <div
                    key={title}
                    className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Example Showcase ─────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  From Photo to Print — See the Results
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Upload your passport photo and generate a professional print sheet ready for submission.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg"
                    alt="Passport photo"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-bold text-slate-800">Step 1: Your Photo</p>
                    <p className="text-xs text-slate-500 mt-1">Upload any compliant passport photo</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                    alt="Photo with measurements"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-bold text-slate-800">Step 2: Layout Preview</p>
                    <p className="text-xs text-slate-500 mt-1">AI generates perfect placement with crop guides</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <a href="http://localhost:8080/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg"
                      alt="4x6 print sheet"
                      className="w-full h-auto object-cover"
                    />
                  </a>
                  <div className="p-4">
                    <a href="http://localhost:8080/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-800 hover:text-lime-600 transition-colors">
                      Step 3: Print Sheet
                    </a>
                    <p className="text-xs text-slate-500 mt-1">300 DPI print-ready template with crop lines</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-10">
                <Link
                  to="#tool"
                  className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Generate Your Print Template Now
                </Link>
              </div>
            </div>
          </section>

          {/* ── How It Works ──────────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
            <div className="container px-4 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  How to Print Passport Photos at Home
                </h2>
                <p className="text-slate-600">
                  Three simple steps to create professional-quality passport photo prints.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                {HOW_TO_STEPS.map(({ step, title, description }) => (
                  <div key={step} className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
                    <div className="w-12 h-12 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4">
                      {step}
                    </div>
                    <h3 className="font-bold text-slate-800 mb-3 text-lg">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  to="/passport-photo-maker"
                  className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors"
                >
                  <Image className="w-4 h-4" />
                  Create Your Passport Photo First
                </Link>
              </div>
            </div>
          </section>

          {/* ── Paper Size Guide ──────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
            <div className="container px-4 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Supported Paper Sizes
                </h2>
                <p className="text-slate-600">
                  Choose the paper size that matches your printer and destination country requirements.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {SIZE_OPTIONS.map(({ paper, photos, best }) => (
                  <div
                    key={paper}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-lime-100 text-lime-700 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{paper}</h3>
                      <p className="text-sm text-slate-600">{photos}</p>
                      <p className="text-xs text-slate-500 mt-1">Best for: {best}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Table */}
              <div className="mt-10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 rounded-tl-xl">Paper Size</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Dimensions</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Photos per Sheet</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 rounded-tr-xl">Common Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PAPER_SIZE_TABLE.map(({ size, mm, photos, use }) => (
                      <tr key={size} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-800">{size}</td>
                        <td className="px-4 py-3 text-slate-600">{mm}</td>
                        <td className="px-4 py-3 text-slate-600">{photos}</td>
                        <td className="px-4 py-3 text-slate-600">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Popular Layouts ───────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
            <div className="container px-4 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Popular Layout Options
                </h2>
                <p className="text-slate-600">
                  Common configurations for passport applications worldwide.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {LAYOUT_OPTIONS.map(({ copies, size, paper }) => (
                  <div
                    key={copies}
                    className="bg-white rounded-xl p-4 border border-slate-200 text-center hover:border-lime-300 transition-colors"
                  >
                    <div className="text-2xl font-black text-lime-600 mb-1">{copies}</div>
                    <div className="text-sm text-slate-600">{size}</div>
                    <div className="text-xs text-slate-500 mt-1">on {paper}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ Section ──────────────────────────────────────────────── */}
          <section className="py-12 sm:py-20 bg-white border-t border-slate-200">
            <div className="container px-4 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {FAQs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-5 hover:border-lime-300 transition-colors"
                  >
                    <h3 className="font-bold text-slate-800 mb-2 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
                      {faq.q}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed pl-7">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Extended SEO Content ───────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
            <div className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                Free Passport Photo Print Template Generator
              </h2>

              <p className="text-slate-600">
                Printing passport photos at home has become one of the easiest and most
                affordable ways to create official photo prints without visiting a photo
                studio or pharmacy. Instead of paying high printing fees for multiple
                copies, you can simply upload one passport image and automatically
                generate a complete printable sheet in seconds.
              </p>

              <p className="text-slate-600">
                Our free Passport Photo Print Template Generator helps users create
                high-quality print-ready layouts for passport, visa, ID card, and
                biometric photos. Whether you need 4 photos, 8 photos, 12 photos, or
                20 passport photos on one sheet, the tool automatically arranges
                everything for perfect printing.
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
                How to Use the Passport Photo Print Tool
              </h3>

              <p className="text-slate-600">Using the tool requires only three simple steps:</p>

              <ol className="text-slate-600 space-y-2">
                <li>Upload your passport photo from your device.</li>
                <li>
                  Select your preferred paper size:
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• 4×6 photo paper — most common for home printing</li>
                    <li>• 5×7 paper — for larger format needs</li>
                    <li>• A4 paper — standard in Europe, Asia, and India</li>
                    <li>• Letter paper — US standard size</li>
                    <li>• Custom dimensions — specify your own size</li>
                  </ul>
                </li>
                <li>Choose the number of copies and click Generate.</li>
              </ol>

              <p className="text-slate-600">
                The system instantly creates a high-resolution printable passport photo
                sheet that you can download as JPG, PNG, or PDF.
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
                Print Multiple Passport Photos from One Image
              </h3>

              <p className="text-slate-600">
                Many people only have one digital passport photo but need several printed
                copies for passport applications, visa applications, government documents,
                student IDs, driving licenses, employment forms, or travel documents.
              </p>

              <p className="text-slate-600">
                Instead of manually copying and resizing images using complicated editing
                software, our template generator automatically duplicates your photo and
                places it correctly on the page.
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
                Why Print Passport Photos at Home?
              </h3>

              <ul className="text-slate-600 space-y-2">
                <li>• Lower cost compared with photo studios</li>
                <li>• Instant generation and download</li>
                <li>• Unlimited copies</li>
                <li>• No waiting time</li>
                <li>• Supports different paper sizes</li>
                <li>• Print anytime</li>
                <li>• Ideal for passport, visa, and ID photos</li>
              </ul>

              <p className="text-slate-600">
                If you already have a printer and photo paper, the total cost per
                passport photo can be extremely low compared with retail printing services.
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
                Best Paper for Passport Photo Printing
              </h3>

              <p className="text-slate-600">
                For best results, use high-quality photo paper rather than regular
                printer paper. Recommended options include glossy photo paper, matte
                photo paper, 4×6 photo sheets, and A4 photo sheets.
              </p>

              <p className="text-slate-600">
                Always print at 300 DPI for sharp details and accurate colors. Avoid
                selecting "Fit to Page" during printing because it can alter the
                official dimensions of the passport photos.
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
                Who Can Use This Tool?
              </h3>

              <p className="text-slate-600">This tool is useful for:</p>

              <ul className="text-slate-600 space-y-1">
                <li>• Passport applicants</li>
                <li>• Visa applicants</li>
                <li>• Students needing ID photos</li>
                <li>• Travelers</li>
                <li>• Government documentation</li>
                <li>• ID card creation</li>
                <li>• Parents printing children's passport photos</li>
                <li>• Professional photographers</li>
              </ul>
            </div>
          </section>

          {/* ── Internal Links ─────────────────────────────────────────────── */}
          <InternalLinks
            links={INTERNAL_LINKS}
            title="Related Tools"
          />
        </main>

        <Footer />
      </div>
    </>
  );
}