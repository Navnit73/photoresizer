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
    description: "No app store downloads or installations required. Works flawlessly in Safari, Chrome, iOS, Android, or desktop.",
  },
  {
    icon: Check,
    title: "Instant Mobile Snapping",
    description: "Capture a portrait instantly using your phone's camera, upload it directly, and watch the AI format it in real-time.",
  },
  {
    icon: Shield,
    title: "Local Safe Sandboxed Privacy",
    description: "Our secure serverless engine processes and downloads your biometric photos securely in memory without keeping backups.",
  },
  {
    icon: Camera,
    title: "Free Digital File Delivery",
    description: "Get pristine high-resolution digital files ready to upload directly to government DS-160, OCI, and online portals.",
  },
];

const steps = [
  {
    title: "Snap a Portrait",
    description: "Have a friend snap a clear headshot photo of you using the rear camera of your phone from 4-6 feet away.",
  },
  {
    title: "Upload to Web App",
    description: "Select the country requirements from our mobile-responsive select and drag/upload your photograph.",
  },
  {
    title: "AI Crops & Generates",
    description: "The AI automatically adjusts angles, updates backgrounds, validates parameters, and prepares a high-res download.",
  },
];

const relatedLinks = [
  { label: "Passport Photo Maker", href: "/passport-photo-maker" },
  { label: "Passport Size Photo Maker", href: "/passport-size-photo-maker" },
  { label: "Canada Visa Photo Tool", href: "/canada-visa-photo" },
  { label: "UPSC Photo Size Tool", href: "/upsc-photo-size" },
];

export default function PassportPhotoApp() {
  return (
    <>
      <SEO
        title="Passport Photo App | Fast AI Portrait Editor Online"
        description="Free online passport photo app. Snap, auto-crop, remove backgrounds, and generate compliant visa and passport photos straight from your smartphone or PC."
        url="https://www.photoresizer.co.in/passport-photo-app"
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <Header />

        <main className="flex-1 py-12 md:py-16">
          <div className="container px-4">
            
            {/* Hero Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Mobile-Friendly <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Passport Photo App</span>
              </h1>

            <div className="mb-2">
              <PassportApiTool />
            </div>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Turn your smartphone into a professional biometric photo booth. Auto-crop and remove backgrounds on the go.
              </p>
            </div>

            {/* Core Interactive Tool */}

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
              <HowToGuide steps={steps} title="How to Use the Passport Photo App" />
            </div>

            {/* SEO Informative Article */}
            <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg border-t border-slate-200 dark:border-slate-800">
              <h2>Smartphones vs. Traditional Photo Booths</h2>
              <p>
                Modern phone cameras contain exceptionally powerful lenses and sensors, surpassing basic point-and-shoot sensors found in conventional shopping mall photo booths. However, capturing the photo is only the first step. The difficulty lies in ensuring it complies with the specific regulations of different countries.
              </p>
              <p>
                Our web app resolves this instantly by acting as a virtual photo editor. It translates physical rules (like 51x51mm dimensions or 35x45mm dimensions) into exact digital matrices.
              </p>

              <h3>Top 4 Smart Tips for Smartphone Passport Photos</h3>
              <ol>
                <li><strong>Do NOT Take a Selfie:</strong> Front-facing smartphone cameras possess a short focal length. This introduces wide-angle distortion (colloquially called "barrel distortion"), making your nose appear wider and ears disappear. This distortion can cause automated facial recognition validators to reject your photo. Always have someone else take your portrait using the rear lens from at least 4 feet away.</li>
                <li><strong>Keep at Eye-Level:</strong> Hold the camera level with your face. Tilting the camera up or down creates angles that violate biometric guidelines.</li>
                <li><strong>Step Away from Backdrops:</strong> Stand approximately 2-3 feet in front of your wall. This gap prevents your head from casting strong shadows on the wall, enabling our background remover to cleanly segment your portrait.</li>
                <li><strong>Disable Camera Flash:</strong> Direct camera flashes create a "red-eye" effect and cast harsh shadows behind your ears. Use natural light from a window or soft ambient room lights instead.</li>
              </ol>

              <hr className="my-8" />

              <h2>Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg">Does this app work on iPhone and Android?</h4>
                  <p className="text-sm mt-1">Yes! Since it is a progressive web-based application, it works directly inside Safari on iOS and Chrome on Android without needing any app store installations or account signups.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Is this web app really free?</h4>
                  <p className="text-sm mt-1">Yes, the tool is 100% free. You can upload, process, and download compliant passport photos and printable grids as many times as you like without any hidden watermarks or subscription charges.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">What file format is delivered?</h4>
                  <p className="text-sm mt-1">We output high-quality, standard-compliant `.JPG` files, which are universally accepted by all digital passport portals, including Indian Passport Seva, US CEAC, and Schengen Visa application platforms.</p>
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
