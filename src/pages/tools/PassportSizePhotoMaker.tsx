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

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Globe,
    title: "All Major International Formats",
    description:
      "Supports every globally recognised specification — 35×45 mm, 51×51 mm (2×2 in), 50×70 mm, 33×48 mm, 40×60 mm, and dozens more — loaded automatically when you choose your country.",
  },
  {
    icon: Check,
    title: "Precision Biometric Calibration",
    description:
      "Dynamically computes chin-to-crown positions to ensure your face occupies the 50%–69% vertical threshold required by ICAO biometric standards and accepted worldwide.",
  },
  {
    icon: Shield,
    title: "Instant Background Replacement",
    description:
      "Removes any cluttered or coloured backdrop and replaces it with the official white or light-grey colour demanded by consular offices — no green screen, no Photoshop needed.",
  },
  {
    icon: Camera,
    title: "Live Compliance Feedback",
    description:
      "After processing, a detailed biometric dashboard shows your head-height ratio, eye-position score, margin clearance, and file size — all benchmarked against official government thresholds.",
  },
];

const steps = [
  {
    title: "Select Your Country & Format",
    description:
      "Choose your destination country from the dropdown — India, US, UK, Canada, Schengen, and 140+ others. Exact dimensions, DPI, and background colour are loaded automatically.",
  },
  {
    title: "Upload Your Portrait",
    description:
      "Drag-and-drop or browse a clear front-facing headshot (PNG, JPG, or WebP, max 10 MB). The AI instantly centres and aligns your face to the required facial-position ratio.",
  },
  {
    title: "Download Photo & Print Sheet",
    description:
      "Get a compliant individual JPG plus a ready-to-print 4×6 grid containing multiple copies — take it to any pharmacy or print at home on standard photo paper.",
  },
];

const sizeTable = [
  {
    country: "India",
    size: "3.5 × 4.5 cm (35 × 45 mm)",
    bg: "White",
    purpose: "Passport, Visa, OCI Card",
  },
  {
    country: "United States",
    size: "2 × 2 in (51 × 51 mm)",
    bg: "White",
    purpose: "Passport, DS-160, Green Card",
  },
  {
    country: "United Kingdom",
    size: "35 × 45 mm",
    bg: "Light Grey / Cream",
    purpose: "Passport, Driving Licence",
  },
  {
    country: "Canada",
    size: "50 × 70 mm",
    bg: "White",
    purpose: "Passport, Citizenship, PR Card",
  },
  {
    country: "Australia",
    size: "35 × 45 mm",
    bg: "Light Grey / Plain",
    purpose: "Passport, Travel Visa",
  },
  {
    country: "Schengen Area",
    size: "35 × 45 mm",
    bg: "Light Grey",
    purpose: "Schengen Visa Application",
  },
  {
    country: "UAE",
    size: "40 × 60 mm",
    bg: "White",
    purpose: "Passport, Residence Visa",
  },
  {
    country: "Japan",
    size: "35 × 45 mm",
    bg: "White / Plain",
    purpose: "Passport, Visa Application",
  },
  {
    country: "China",
    size: "33 × 48 mm",
    bg: "White",
    purpose: "Passport, Tourist Visa",
  },
  {
    country: "Singapore",
    size: "35 × 45 mm",
    bg: "White",
    purpose: "Passport, EP, S-Pass",
  },
];

const faqs = [
  {
    q: "What does a 35×45 mm passport photo mean?",
    a: "It is the standard biometric photo dimension used by the UK, EU Schengen Area, Australia, New Zealand, Singapore, Russia, and many other nations. The width is exactly 35 millimetres and the height is exactly 45 millimetres. At 300 DPI — the minimum for print clarity — this equals 413×531 pixels.",
  },
  {
    q: "What are the head-size requirements for a 2×2 inch US photo?",
    a: "For a standard US or Indian 2×2 inch (51×51 mm) photo, the head must be centred and measure between 1 inch and 1.375 inches vertically (chin to crown). Our AI cropper applies this exact margin ratio automatically, so you don't need to measure anything manually.",
  },
  {
    q: "How many pixels is a 35×45 mm photo at 300 DPI?",
    a: "At 300 DPI, 35×45 mm equals 413×531 pixels. At 600 DPI (used for higher-quality prints) it becomes 827×1063 pixels. Our tool outputs whichever resolution is required by the country preset you select.",
  },
  {
    q: "Can I use a scanned physical photo?",
    a: "You can, but standard home scans often introduce halftone dots or grain that cause digital validation failures. For best results, capture a fresh high-resolution photo with your smartphone under good lighting and process it through our tool.",
  },
  {
    q: "Will the background be changed automatically?",
    a: "Yes. Our AI removes your existing background — regardless of colour or complexity — and replaces it with the official white or light-grey shade required by the country preset you selected.",
  },
  {
    q: "Is my photo stored after processing?",
    a: "No. All processing happens on ephemeral serverless nodes. Your image is discarded immediately after you download the result. We never store, log, or share your biometric photos.",
  },
  {
    q: "What file formats can I upload?",
    a: "PNG, JPG, JPEG, and WebP are all accepted. Maximum file size is 10 MB. For the cleanest output, upload an image that is at least 800×800 pixels.",
  },
  {
    q: "Can I print the output at a pharmacy or photo lab?",
    a: "Yes. Download the 4×6 print sheet and take it to any pharmacy (CVS, Walgreens, Boots, etc.) or local print shop. Select 'borderless 4×6 inch' print to avoid unwanted margins.",
  },
];

const relatedLinks = [
  { label: "Passport Photo Maker", href: "/passport-photo-maker" },
  { label: "Passport Photo App", href: "/passport-photo-app" },
  {
    label: "Passport Photo Print Template",
    href: "/passport-photo-print-template-generator",
  },
  { label: "UK Passport Photo Maker", href: "/uk-passport-photo-maker" },
  { label: "US Passport Photo Maker", href: "/us-passport-photo-maker" },
  { label: "SSC Photo Resizer", href: "/ssc-photo-resizer" },
  { label: "Background Remover", href: "/background-remover" },
  { label: "Image Resizer", href: "/image-resizer" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PassportSizePhotoMaker() {
  return (
    <>
      <SEO
        url="https://www.photoresizer.co.in/passport-size-photo-maker"
        title="Passport Size Photo Maker | 35×45mm, 2×2 Inch & All Formats"
        description="Free passport size photo maker for 2026. Instantly resize to 35×45mm, 2×2 inch, 3.5×4.5cm or any international standard. AI crops, removes background & generates print sheet."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Passport Size Photo Maker",
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
                Updated for 2026 Government Standards
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-card-foreground tracking-tight mb-5 leading-tight">
                Online{" "}
                <span className="bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                  Passport Size Photo Maker
                </span>
              </h1>
              {/* ── Tool ─────────────────────────────────────────────────────────── */}
              <section id="tool" className="pb-2">
                <div className="container px-1">
                  <PassportClientTool />
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
                      From upload to print-ready — see the complete process with
                      measurements and dimensions.
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
                        <p className="text-sm font-bold text-card-foreground">
                          AI Processing
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Face detection with biometric measurements applied
                        </p>
                      </div>
                    </div>
                    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-clean-sm">
                      <img
                        src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg"
                        alt="Final compliant photo"
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-4">
                        <p className="text-sm font-bold text-card-foreground">
                          Final Output
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Government-compliant photo with white background
                        </p>
                      </div>
                    </div>
                    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-clean-sm">
                      <a
                        href="https://www.photoresizer.co.in/passport-photo-print-template-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg"
                          alt="4x6 print sheet"
                          className="w-full h-auto object-cover"
                        />
                      </a>
                      <div className="p-4">
                        <a
                          href="https://www.photoresizer.co.in/passport-photo-print-template-generator"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-card-foreground hover:text-primary transition-colors"
                        >
                          Print Template
                        </a>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ready-to-print 4×6 inch sheet with crop guides
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Perfectly format your photo to exact dimensions — 35×45 mm, 2×2
                inch, 3.5×4.5 cm, or any international standard — with
                background replacement and biometric compliance in seconds.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
                {[
                  { icon: ShieldCheck, label: "ICAO Biometric Compliant" },
                  { icon: Lock, label: "Privacy-Safe — No Storage" },
                  { icon: Globe, label: "150+ Country Formats" },
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

              <section className="py-10">
                <div className="container max-w-3xl mx-auto px-4">
                  <div className="bg-muted border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-3">
                      Try Other Passport Photo Tools
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      If you're applying for international visas or passports,
                      you can also use specialized tools for different countries
                      and regions. These tools automatically apply official
                      government requirements for size, background, and
                      biometric alignment.
                    </p>

                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>
                        Create compliant photos with the{" "}
                        <a
                          href="https://www.pixpassport.com/australia-passport-photo-editor"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary font-medium hover:underline"
                        >
                          Australia Passport Photo Editor
                        </a>
                      </li>

                      <li>
                        Generate visa-ready images using the{" "}
                        <a
                          href="https://www.pixpassport.com/schengen-passport-photo-editor"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary font-medium hover:underline"
                        >
                          Schengen Passport Photo Editor
                        </a>
                      </li>

                      <li>
                        Get exact EU specifications with the{" "}
                        <a
                          href="https://www.pixpassport.com/france-passport-photo-editor"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary font-medium hover:underline"
                        >
                          France Passport Photo Tool
                        </a>
                      </li>

                      <li>
                        Create government-compliant images using the{" "}
                        <a
                          href="https://www.pixpassport.com/india-passport-photo-editor"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary font-medium hover:underline"
                        >
                          India Passport Photo Editor
                        </a>
                      </li>

                      <li>
                        Explore all tools on{" "}
                        <a
                          href="https://www.pixpassport.com/"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary font-semibold hover:underline"
                        >
                          PixPassport
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </section>

          {/* ── Features ─────────────────────────────────────────────────────── */}
          <section className="py-14 bg-card border-y border-border">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  Official Multi-Size Support
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  Every format, every country, handled automatically.
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
                title="How to Make a Passport Size Photo Online"
              />
            </div>
          </section>

          {/* ── Size Table ───────────────────────────────────────────────────── */}
          <section className="py-14 bg-card border-y border-border">
            <div className="container px-4 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  Standard Passport Photo Dimensions by Country (2026)
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  Government specifications are updated periodically. Below are
                  the current official requirements for the most common
                  destinations.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border shadow-clean-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5">Country</th>
                      <th className="py-3.5 px-5">Official Size</th>
                      <th className="py-3.5 px-5">Background</th>
                      <th className="py-3.5 px-5">Used For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeTable.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-border hover:bg-muted/60 text-muted-foreground transition-colors"
                      >
                        <td className="py-3.5 px-5 font-bold text-card-foreground">
                          {row.country}
                        </td>
                        <td className="py-3.5 px-5 font-mono text-xs text-primary">
                          {row.size}
                        </td>
                        <td className="py-3.5 px-5">{row.bg}</td>
                        <td className="py-3.5 px-5 text-muted-foreground">
                          {row.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── SEO Article ──────────────────────────────────────────────────── */}
          <section className="py-16">
            <article className="container px-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-base">
              <h2>What Is a Passport Size Photo and Why Dimensions Matter</h2>
              <p>
                A passport size photo is a precisely dimensioned portrait
                photograph used for official government identity documents —
                passports, visas, driving licences, national ID cards, and
                residence permits. The term "passport size" does not refer to a
                single universal measurement; rather, each country maintains its
                own specification defined by its immigration or identity
                authority.
              </p>
              <p>
                Getting the dimensions exactly right is critical. Most
                government agencies — including the US State Department, UK HM
                Passport Office, and the Indian Ministry of External Affairs —
                use automated optical recognition systems that reject photos
                falling outside dimensional tolerances. A photo that is even a
                few pixels too narrow or too tall can delay your application by
                days or weeks.
              </p>

              <h2>
                How to Resize a Photo to Passport Dimensions Without Losing
                Quality
              </h2>
              <p>
                Manually cropping an image in software like Photoshop or GIMP
                often leads to measurement discrepancies. The reason is that
                physical size (millimetres) and pixel count are linked by DPI
                (dots per inch). A 35×45 mm photo at 300 DPI equals 413×531
                pixels. At 600 DPI — required for premium-quality prints — it
                becomes 827×1063 pixels. Getting these numbers wrong means the
                printed photo will be too small or too large, causing rejection
                at the counter.
              </p>
              <p>
                Our AI-driven resizer calculates these pixel ratios on the fly,
                applying correct mathematical scaling to guarantee that when
                printed, your document hits the precise millimetre targets
                demanded by consular offices and travel departments. Simply
                select your country, upload your photo, and the system handles
                every calculation automatically.
              </p>

              <h2>Portrait Photography Tips for a Compliant Passport Photo</h2>
              <p>
                Even the best cropping tool cannot rescue a poorly taken
                portrait. Follow these guidelines before uploading to maximise
                your acceptance rate.
              </p>

              <h3>Lighting</h3>
              <p>
                Even, diffused lighting is essential. Natural window light from
                the side, or a softbox, eliminates the harsh shadows under the
                chin and around the eyes that are the number one cause of
                rejections. Avoid standing under overhead fluorescent lights,
                which cast unflattering downward shadows.
              </p>

              <h3>Camera Height and Eye Line</h3>
              <p>
                Position the camera at eye level — not above or below. Shooting
                from above makes your chin appear smaller and narrows the face;
                shooting from below distorts your nose. Place your phone or
                camera on a tripod or shelf at the exact height of your eyes and
                use the timer function for a sharp, blur-free shot.
              </p>

              <h3>Expression and Posture</h3>
              <p>
                Keep a completely neutral expression: mouth closed, lips
                relaxed, no smile. Both eyes must be fully open and looking
                directly into the lens. Your head should be straight — not
                tilted, turned, or angled. Any rotation beyond two degrees will
                flag an automated biometric check.
              </p>

              <h3>Hair and Accessories</h3>
              <p>
                Hair must not cover your eyes, eyebrows, or forehead. The full
                facial outline — from chin to hairline and ear to ear — must be
                clearly visible. Remove glasses in almost all cases; the US, UK,
                Canada, Schengen nations, and India all prohibit them. Headwear
                is only permitted for documented religious observance, and even
                then the face must be fully unobscured.
              </p>

              <h3>Clothing and Background Contrast</h3>
              <p>
                Avoid wearing white or very light clothing if your target
                country mandates a white background — the lack of contrast
                between your shoulders and the backdrop can confuse automated
                face-detection algorithms. Dark or mid-tone clothing against a
                white background produces the cleanest segmentation and the most
                professional result.
              </p>

              <h2>Understanding DPI, Resolution, and Print Quality</h2>
              <p>
                DPI (dots per inch) defines how many ink dots a printer places
                per inch of paper. For passport photos, a minimum of 300 DPI is
                required by most issuing authorities to ensure the printed image
                is sharp enough for facial recognition. Anything below 200 DPI
                will look blurry or pixelated when printed at the required
                physical size.
              </p>
              <p>
                When you download a file from our tool, the output is already
                calibrated to the correct DPI for your selected country. This
                means you can send the file directly to a pharmacy printer or
                home inkjet without any additional configuration — simply select
                "4×6 inch, borderless" when printing and the grid will align
                perfectly with the paper edges.
              </p>

              <h2>Printing Your Passport Photo at Home vs. a Photo Lab</h2>
              <p>
                Both options produce acceptable results when done correctly.
                Home printing on a dedicated photo inkjet printer (Canon PIXMA,
                Epson EcoTank, HP Envy) with genuine glossy photo paper matches
                professional lab quality. Use the maximum quality / photo
                setting in your print dialog and disable any automatic colour
                correction to preserve the true white background.
              </p>
              <p>
                If you prefer a lab, upload the 4×6 print sheet to any online
                service (Snapfish, Shutterfly) or walk into a Boots, CVS,
                Walgreens, or Fujifilm photo kiosk. Select a single 4×6 inch
                print. The cost is typically under one dollar or one pound — a
                fraction of what most high-street photo studios charge for the
                same result.
              </p>

              <h2>Common Mistakes That Lead to Photo Rejections</h2>
              <p>
                Passport applications are rejected for photo issues far more
                often than most applicants expect. The five most common
                avoidable mistakes in 2026 are: shadows on the face or
                background caused by poor lighting; a head that is too small
                within the frame (less than 50% of image height); a background
                that is not perfectly plain (patterned walls, furniture edges
                visible); glasses worn in the photo; and a file that has been
                compressed below the minimum quality threshold. Our tool
                addresses all five automatically.
              </p>
            </article>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="py-14 bg-card border-y border-border">
            <div className="container px-4 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="bg-muted border border-border rounded-2xl px-6 divide-y divide-border">
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

          {/* ── CTA Banner ───────────────────────────────────────────────────── */}
          <section className="py-14">
            <div className="container px-4 max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-3xl p-10 text-primary-foreground shadow-2xl shadow-primary/20">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                  Create Your Passport Size Photo Now
                </h2>
                <p className="text-primary-foreground/80 mb-7 text-sm leading-relaxed max-w-md mx-auto">
                  Free, instant, and fully compliant with 2026 government
                  standards. No account required.
                </p>
                <a
                  href="#tool"
                  className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-sm px-7 py-3.5 rounded-xl shadow-md hover:bg-primary-foreground/90 transition-all duration-200"
                >
                  <Zap className="w-4 h-4" />
                  Resize My Photo — Free
                </a>
              </div>
            </div>
          </section>

          {/* ── Internal Links ───────────────────────────────────────────────── */}
          <div className="container px-4 pb-16">
            <InternalLinks links={relatedLinks} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
