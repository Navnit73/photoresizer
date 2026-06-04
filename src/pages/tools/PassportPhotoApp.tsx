import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PassportApiTool } from "@/components/editor/PassportApiTool";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
import { Camera, Check, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "100% Web-Based App",
    description:
      "No app store downloads or installations required. Works flawlessly in Safari, Chrome, iOS, Android, or desktop.",
  },
  {
    icon: Check,
    title: "Instant Mobile Snapping",
    description:
      "Capture a portrait instantly using your phone's camera, upload it directly, and watch the AI format it in real-time.",
  },
  {
    icon: Shield,
    title: "Local Safe Sandboxed Privacy",
    description:
      "Our secure serverless engine processes and downloads your biometric photos securely in memory without keeping backups.",
  },
  {
    icon: Camera,
    title: "Free Digital File Delivery",
    description:
      "Get pristine high-resolution digital files ready to upload directly to government DS-160, OCI, and online portals.",
  },
];

const steps = [
  {
    title: "Snap a Portrait",
    description:
      "Have a friend snap a clear headshot photo of you using the rear camera of your phone from 4-6 feet away.",
  },
  {
    title: "Upload to Web App",
    description:
      "Select the country requirements from our mobile-responsive select and drag/upload your photograph.",
  },
  {
    title: "AI Crops & Generates",
    description:
      "The AI automatically adjusts angles, updates backgrounds, validates parameters, and prepares a high-res download.",
  },
];

const relatedLinks = [
  { label: "Passport Photo Maker", href: "/passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
  {
    label: "Passport Photo Print Template",
    href: "/passport-photo-print-template-generator",
  },
  {
    label: "Canada Passport Photo Maker",
    href: "/canada-passport-photo-maker",
  },
  { label: "UPSC Photo Size Tool", href: "/upsc-photo-size" },
  { label: "Background Remover", href: "/background-remover" },
  { label: "Image Resizer", href: "/image-resizer" },
];

export default function PassportPhotoApp() {
  return (
    <>
      <SEO
        title="Passport Photo App | Fast AI Portrait Editor Online"
        description="Free online passport photo app. Snap, auto-crop, remove backgrounds, and generate compliant visa and passport photos straight from your smartphone or PC."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Passport Photo App",
          applicationCategory: "DesignApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1 py-5 md:py-3">
          <div className="container px-2">
            {/* Hero Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Mobile-Friendly{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Passport Photo App
                </span>
              </h1>

              <div className="mb-2">
                <PassportApiTool />
              </div>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Turn your smartphone into a professional biometric photo booth.
                Auto-crop and remove backgrounds on the go.
              </p>
            </div>

            {/* Core Interactive Tool */}

            {/* Example Showcase */}
            <section className="py-2">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-13">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    See the Transformation
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto pb-3">
                    From your photo to a government-compliant print sheet ready
                    for submission.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-2 mb-12">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                      alt="AI processing with measurements"
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        AI Processing
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Face detection & biometric alignment
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg"
                      alt="Final passport photo"
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Final Output
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Compliant photo with white background
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
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
                        className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors"
                      >
                        Print Template
                      </a>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        300 DPI print sheet with crop guides
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-10">
              <div className="container max-w-3xl mx-auto px-4">
                <div className="bg-muted border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-3">
                    Try Other Passport Photo Tools
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    If you're applying for international visas or passports, you
                    can also use specialized tools for different countries and
                    regions. These tools automatically apply official government
                    requirements for size, background, and biometric alignment.
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

            {/* Features section */}
            <section className="py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-md mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">
                Turn Your Phone into a Biometric Photo Booth
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </section>

            {/* How-To Guide */}
            <div className="mb-16">
              <HowToGuide
                steps={steps}
                title="How to Use the Passport Photo App"
              />
            </div>

            {/* SEO Informative Article */}
            <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg border-t border-slate-200 dark:border-slate-800">
              <h2>Smartphones vs. Traditional Photo Booths</h2>
              <p>
                Modern phone cameras contain exceptionally powerful lenses and
                sensors, surpassing basic point-and-shoot sensors found in
                conventional shopping mall photo booths. However, capturing the
                photo is only the first step. The difficulty lies in ensuring it
                complies with the specific regulations of different countries.
              </p>
              <p>
                Our web app resolves this instantly by acting as a virtual photo
                editor. It translates physical rules (like 51x51mm dimensions or
                35x45mm dimensions) into exact digital matrices.
              </p>

              <h3>Top 4 Smart Tips for Smartphone Passport Photos</h3>
              <ol>
                <li>
                  <strong>Do NOT Take a Selfie:</strong> Front-facing smartphone
                  cameras possess a short focal length. This introduces
                  wide-angle distortion (colloquially called "barrel
                  distortion"), making your nose appear wider and ears
                  disappear. This distortion can cause automated facial
                  recognition validators to reject your photo. Always have
                  someone else take your portrait using the rear lens from at
                  least 4 feet away.
                </li>
                <li>
                  <strong>Keep at Eye-Level:</strong> Hold the camera level with
                  your face. Tilting the camera up or down creates angles that
                  violate biometric guidelines.
                </li>
                <li>
                  <strong>Step Away from Backdrops:</strong> Stand approximately
                  2-3 feet in front of your wall. This gap prevents your head
                  from casting strong shadows on the wall, enabling our
                  background remover to cleanly segment your portrait.
                </li>
                <li>
                  <strong>Disable Camera Flash:</strong> Direct camera flashes
                  create a "red-eye" effect and cast harsh shadows behind your
                  ears. Use natural light from a window or soft ambient room
                  lights instead.
                </li>
              </ol>

              <hr className="my-8" />

              <h2>Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg">
                    Does this app work on iPhone and Android?
                  </h4>
                  <p className="text-sm mt-1">
                    Yes! Since it is a progressive web-based application, it
                    works directly inside Safari on iOS and Chrome on Android
                    without needing any app store installations or account
                    signups.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">
                    Is this web app really free?
                  </h4>
                  <p className="text-sm mt-1">
                    Yes, the tool is 100% free. You can upload, process, and
                    download compliant passport photos and printable grids as
                    many times as you like without any hidden watermarks or
                    subscription charges.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">
                    What file format is delivered?
                  </h4>
                  <p className="text-sm mt-1">
                    We output high-quality, standard-compliant `.JPG` files,
                    which are universally accepted by all digital passport
                    portals, including Indian Passport Seva, US CEAC, and
                    Schengen Visa application platforms.
                  </p>
                </div>
              </div>
            </article>

            <InternalLinks links={relatedLinks} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
