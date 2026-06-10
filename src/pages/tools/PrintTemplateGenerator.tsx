import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InternalLinks } from "@/components/shared/InternalLinks";
import PrintTemplateApp from "./PrintTemplateApp";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17H17V9m0 0L12 4m5 5l-5 5M7 7h.01M7 12h.01M7 17h.01" />
      </svg>
    ),
    title: "Print-Ready 300 DPI",
    description: "Optimized for home printers, pharmacy kiosks, and professional photo labs.",
    accent: "indigo",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Crop Lines Included",
    description: "Precise guide lines around each photo make cutting quick and accurate.",
    accent: "indigo",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Instant Generation",
    description: "Generate your print sheet in seconds — no downloads or sign-ups required.",
    accent: "indigo",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "100% Private",
    description: "All processing happens in your browser. Your photos never leave your device.",
    accent: "indigo",
  },
];

const HOW_TO_STEPS = [
  {
    step: "1",
    title: "Upload Your Passport Photo",
    description: "Select a clear, front-facing digital passport photo. Supports JPG, PNG, and WebP up to 10 MB.",
  },
  {
    step: "2",
    title: "Choose Paper & Layout",
    description: "Select your paper size (4×6, A4, Letter, or custom) and the number of copies. Adjust spacing and margins.",
  },
  {
    step: "3",
    title: "Download & Print",
    description: "Download a 300 DPI high-resolution JPG or PDF, cut along crop lines, and use for passport or visa applications.",
  },
];

const FAQs = [
  {
    q: "How many passport photos fit on a 4×6 inch paper?",
    a: "A standard 4×6 inch (10×15 cm) paper comfortably fits up to 6 standard 2×2 inch (51×51 mm) or 35×45 mm passport photos. Our tool automatically arranges them with crop lines.",
  },
  {
    q: "How do I print passport photos at home?",
    a: "Upload your cropped passport photo, select your paper size (e.g., 4×6 or A4), and choose how many copies. Download the 300 DPI JPG or PDF and print using your home color printer on high-quality photo paper.",
  },
  {
    q: "Is it free to create a print template?",
    a: "Yes, our passport photo print template generator is completely free with no registration required.",
  },
  {
    q: "Do I need special photo paper?",
    a: "For official use, print on high-quality glossy or matte photo paper. Standard printer paper is usually rejected by government agencies.",
  },
  {
    q: "What paper size should I use?",
    a: "4×6 inch is most common for home printing. A4 is popular in Europe, Asia, and India. Letter is standard in the US.",
  },
  {
    q: "Can I use this for visa photos?",
    a: "Yes. The tool supports 2×2 inch (US/India) and 35×45 mm (Europe/UK/Australia) sizes, covering most visa requirements worldwide.",
  },
];

const PAPER_TABLE = [
  { size: "4×6 inch", mm: "101.6 × 152.4 mm", photos: "Up to 6", use: "Home printing, pharmacy kiosks" },
  { size: "5×7 inch", mm: "127 × 177.8 mm", photos: "Up to 9", use: "Larger format prints" },
  { size: "A4", mm: "210 × 297 mm", photos: "Up to 15", use: "Europe, Asia, India" },
  { size: "Letter", mm: "215.9 × 279.4 mm", photos: "Up to 14", use: "US and North America" },
];

const INTERNAL_LINKS = [
  { label: "Passport Photo Maker", href: "/passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "Canada Passport Photo Maker", href: "/canada-passport-photo-maker" },
  { label: "Australia Passport Photo Maker", href: "/australia-passport-photo-maker" },
  { label: "Background Remover", href: "/background-remover" },
  { label: "Image Resizer", href: "/image-resizer" },
  { label: "Compress Image", href: "/compress-image" },
];

export default function PrintTemplateGenerator() {
  return (
    <>
      <SEO
        title="Passport Photo Print Template Generator | Free 4×6 & A4 Layout"
        description="Create a printable passport photo sheet instantly. Upload one passport photo and generate multiple copies on 4×6, A4, or custom paper sizes. 100% free, 300 DPI, no sign-up."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Passport Photo Print Template Generator",
          applicationCategory: "DesignApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1">
   {/* ── Tool ─────────────────────────────────────────── */}
          <section className="py-8 sm:py-12 bg-gray-50" id="tool">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <PrintTemplateApp />
            </div>
          </section>
          {/* ── Hero ─────────────────────────────────────────── */}
          <section className="bg-white border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
              <div className="text-center max-w-3xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Free Online Tool — No Registration Required
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
                  Passport Photo{" "}
                  <span className="text-indigo-600">Print Template</span>{" "}
                  Generator
                </h1>
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                  Upload one photo and instantly create a print-ready sheet with multiple copies — for 4×6, A4, and more.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {[
                    { value: "4×6 – A4", label: "Paper Sizes" },
                    { value: "300 DPI", label: "Print Quality" },
                    { value: "Instant", label: "Generation" },
                    { value: "Free", label: "No Sign-up" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                      <p className="text-xl sm:text-2xl font-black text-indigo-600 leading-none">{value}</p>
                      <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

       

          {/* ── Features ─────────────────────────────────────── */}
          <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Why Choose Us</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Professional Results in Seconds
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Stop overpaying at photo studios. Our free tool creates print-ready passport photo sheets that meet international standards.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {FEATURES.map(({ icon, title, description }) => (
                  <div key={title} className="group bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-2xl p-6 transition-all duration-200">
                    <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white rounded-xl flex items-center justify-center mb-4 transition-all duration-200">
                      {icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How It Works ─────────────────────────────────── */}
          <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Simple Process</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  How to Print Passport Photos at Home
                </h2>
                <p className="text-gray-500">Three steps to create professional-quality passport photo prints.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {HOW_TO_STEPS.map(({ step, title, description }, i) => (
                  <div key={step} className="relative bg-white rounded-2xl p-7 border border-gray-200 shadow-sm text-center">
                    {i < 2 && (
                      <div className="hidden md:block absolute top-10 -right-3 z-10 text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-5 shadow-lg shadow-indigo-200">
                      {step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href="#tool"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Generate Your Print Template
                </a>
              </div>
            </div>
          </section>

          {/* ── Paper Sizes ──────────────────────────────────── */}
          <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Supported Formats</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Paper Size Guide</h2>
                <p className="text-gray-500">
                  Choose the paper size that matches your printer and country requirements.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="text-left px-5 py-4 font-semibold rounded-tl-2xl">Paper Size</th>
                      <th className="text-left px-5 py-4 font-semibold">Dimensions</th>
                      <th className="text-left px-5 py-4 font-semibold">Photos / Sheet</th>
                      <th className="text-left px-5 py-4 font-semibold rounded-tr-2xl">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {PAPER_TABLE.map(({ size, mm, photos, use }, idx) => (
                      <tr key={size} className={`hover:bg-indigo-50 transition-colors ${idx === PAPER_TABLE.length - 1 ? "rounded-b-2xl" : ""}`}>
                        <td className="px-5 py-4 font-semibold text-gray-900">{size}</td>
                        <td className="px-5 py-4 text-gray-500 font-mono text-xs">{mm}</td>
                        <td className="px-5 py-4">
                          <span className="bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-full text-xs font-bold">{photos}</span>
                        </td>
                        <td className="px-5 py-4 text-gray-500">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Example Showcase ─────────────────────────────── */}
          <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">See It In Action</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">From Photo to Print</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Upload your passport photo and get a professional print sheet ready for submission.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
                    label: "Step 1",
                    title: "Your Photo",
                    sub: "Upload any compliant passport photo",
                    href: null,
                  },
                  {
                    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
                    label: "Step 2",
                    title: "Layout Preview",
                    sub: "Auto-placed with crop guides",
                    href: null,
                  },
                  {
                    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg",
                    label: "Step 3",
                    title: "Print Sheet",
                    sub: "300 DPI template with crop lines",
                    href: "https://www.photoresizer.co.in/passport-photo-print-template-generator",
                  },
                ].map(({ img, label, title, sub, href }) => (
                  <div key={label} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="overflow-hidden">
                      <img src={img} alt={`${title} - Passport Photo Print Template`} className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{label}</span>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="block text-base font-bold text-gray-900 hover:text-indigo-600 transition-colors mt-1">{title}</a>
                      ) : (
                        <p className="text-base font-bold text-gray-900 mt-1">{title}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────── */}
          <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Got Questions?</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3">
                {FAQs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:bg-indigo-50 transition-colors list-none">
                      <span>{faq.q}</span>
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── SEO Content ──────────────────────────────────── */}
          <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Free Passport Photo Print Template Generator
              </h2>

              <div className="prose prose-gray max-w-none text-gray-600 space-y-5 text-[15px] leading-relaxed">
                <p>
                  Printing passport photos at home is one of the easiest and most affordable ways to create official photo prints without visiting a studio or pharmacy. Upload one passport image and instantly generate a complete printable sheet.
                </p>
                <p>
                  Our free generator supports every major format — 4×6, 5×7, A4, and Letter paper — and automatically arranges photos with precision crop guides, so you never need complicated editing software.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">Why Print at Home?</h3>
                <ul className="space-y-2 text-gray-600">
                  {[
                    "Lower cost vs. photo studios — pay only for paper and ink",
                    "Instant generation and download, no waiting",
                    "Unlimited copies from a single upload",
                    "Supports passport, visa, and ID card sizes worldwide",
                    "Works on any device — phone, tablet, or desktop",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">Best Paper for Passport Photos</h3>
                <p>
                  Use high-quality glossy or matte photo paper. Always print at 300 DPI and avoid "Fit to Page" — it can alter the official photo dimensions required by government agencies.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">Who Uses This Tool?</h3>
                <p>
                  Passport and visa applicants, students, travelers, parents printing children's photos, ID card applicants, and professional photographers who need quick client-ready layouts.
                </p>
              </div>
            </div>
          </section>

          {/* ── CTA Banner ───────────────────────────────────── */}
          <section className="py-14 bg-indigo-600 border-t border-indigo-700">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                Ready to print your passport photos?
              </h2>
              <p className="text-indigo-200 mb-8 text-base">
                Free, instant, and 100% private — everything happens in your browser.
              </p>
              <a
                href="#tool"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Generate Print Template Free
              </a>
            </div>
          </section>

          {/* ── Internal Links ───────────────────────────────── */}
          <InternalLinks links={INTERNAL_LINKS} title="Related Tools" />
        </main>

        <Footer />
      </div>
    </>
  );
}