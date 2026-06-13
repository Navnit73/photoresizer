import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AdUnit from '@/components/shared/AdUnit'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Upload,
  Settings,
  Download,
  Check,
  HelpCircle,
  FileImage,
  CreditCard,
  FileText,
  Globe,
  Briefcase,
  Image as ImageIcon,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
} from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Photo',
    description:
      'Upload your image using drag & drop or file picker. Supports JPG, JPEG, PNG, WEBP, and HEIC formats.',
  },
  {
    icon: Settings,
    title: 'Resize & Adjust',
    description:
      'Choose a preset for passport, visa, ID, social media, or government exam — or enter custom dimensions. Adjust background color and image quality.',
  },
  {
    icon: Download,
    title: 'Download Instantly',
    description:
      'Preview your resized photo in real time and download it instantly in JPG, JPEG, PNG, or WEBP format — no watermark, no signup.',
  },
]

// Global use cases (shown first to non-Indian audiences)
const globalUseCases = [
  {
    icon: Globe,
    title: 'Passport & Visa Photos',
    description:
      'Create compliant photos for US, UK, Canada, Australia, Schengen, India, and 100+ other countries. Auto-resize to 2x2", 35x45mm, or any official dimension.',
  },
  {
    icon: Briefcase,
    title: 'LinkedIn & Resume Photos',
    description:
      'Resize your headshot to LinkedIn, Indeed, Glassdoor, and corporate directory specifications. Perfect for job applications worldwide.',
  },
  {
    icon: ImageIcon,
    title: 'Social Media Images',
    description:
      'Resize photos for Instagram posts, stories & reels, Facebook cover, Twitter/X header, YouTube thumbnail, Discord avatar, and more.',
  },
]

// India-specific use cases (shown second, in a separate section)
const indiaUseCases = [
  {
    icon: FileText,
    title: 'SSC, UPSC & Government Exams',
    description:
      'Resize photos for SSC CGL, CHSL, MTS, UPSC CSE, IBPS PO/Clerk, Banking, Railway, and all central/state exam forms.',
  },
  {
    icon: CreditCard,
    title: 'PAN, Aadhaar & Voter ID',
    description:
      'Create perfectly sized photos for PAN Card, Aadhaar Card, Voter ID, Driving Licence, and other Indian government IDs.',
  },
  {
    icon: FileImage,
    title: 'Compress to 20KB / 50KB',
    description:
      'Reduce photo, signature, and thumb impression size to exactly 20KB or 50KB as required by Indian exam portals.',
  },
]

const faqs = [
  {
    question: 'Is this photo resizer completely free?',
    answer:
      'Yes. Our photo resizer is 100% free to use with no hidden charges, no watermarks, and no signup required. All processing happens in your browser.',
  },
  {
    question: 'Can I make passport and visa photos for any country?',
    answer:
      'Yes. We support passport and visa photo specifications for the US, UK, Canada, Australia, Schengen, India, and 100+ other countries. Select your country and the tool will auto-apply the correct dimensions, file size, and background.',
  },
  {
    question: 'Does this tool support Indian government exam forms (SSC, UPSC, IBPS)?',
    answer:
      'Yes. We have dedicated presets for SSC CGL, CHSL, MTS, UPSC CSE, IBPS PO/Clerk, Banking, Railway, and other Indian competitive exams. You can resize photos to exact dimensions and reduce file size to 20KB, 50KB, or any required limit.',
  },
  {
    question: 'Can I resize photos for PAN Card and Aadhaar Card?',
    answer:
      'Absolutely. You can resize PAN Card, Aadhaar Card, and Voter ID photos to the officially required size, change the background color (white/light blue), and compress images without losing quality.',
  },
  {
    question: 'Does this tool support JPEG to JPG conversion?',
    answer:
      'Yes. You can easily convert JPEG to JPG, JPG to JPEG, PNG to JPG, HEIC to JPG, and WEBP formats while resizing your image.',
  },
  {
    question: 'Are my photos uploaded to any server?',
    answer:
      'No. All image processing happens locally in your browser. Your photos are never uploaded to any server, ensuring complete privacy and security — critical for ID and passport documents.',
  },
  {
    question: 'What is the recommended quality for passport and government photos?',
    answer:
      'For passports, visas, and most government forms, 80–90% quality is ideal. It provides excellent clarity while keeping file size within upload limits.',
  },
]

export function ContentSections() {
  return (
    <section
      className="py-10 sm:py-16 bg-secondary/30"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1500px' }}
    >
      <div className="container space-y-16 sm:space-y-20 px-4 sm:px-6">
        {/* FAQ SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>

        {/* HERO SEO SECTION - GLOBAL FIRST */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Free Online Photo Resizer, Compressor & Editor for Every Use
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-4xl mx-auto">
            Resize, compress, and convert images instantly in your browser — for passports, visas, government IDs, social media, job applications, and more. Supports JPG, JPEG, PNG, WEBP, and HEIC. 100% free, private, and no watermark.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <div>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading mb-3">
              How the Photo Resizer Works
            </h2>
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
              Resize any photo in three simple steps — works for passport photos, social media graphics, government forms, and everything in between.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <Card key={step.title} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">
                    {index + 1}. {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* GLOBAL USE CASES - Primary section for international audience */}
        <div>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading">
              What Can You Resize?
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-3">
              From passport photos to LinkedIn headshots, our tool handles every photo resizing need worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {globalUseCases.map(useCase => (
              <Card key={useCase.title} variant="tool">
                <CardHeader className="flex-row gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="pt-1">
                    <CardTitle className="text-sm sm:text-base mb-1.5">
                      {useCase.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <AdUnit type="in-article" />

        {/* INDIA-SPECIFIC USE CASES - Secondary section, clearly marked */}
        <div>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
              <span>🇮🇳</span>
              <span>For India</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading">
              Indian Government Forms & Exams
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-3">
              Dedicated tools for Indian government job applications and ID cards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {indiaUseCases.map(useCase => (
              <Card key={useCase.title} variant="tool">
                <CardHeader className="flex-row gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="pt-1">
                    <CardTitle className="text-sm sm:text-base mb-1.5">
                      {useCase.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* IMAGE CONVERTER SEO - Global */}
        <section className="max-w-5xl mx-auto text-sm text-muted-foreground space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground">
            Image Converter & Format Support
          </h2>
          <p>
            Our tool also works as a free online image converter. Convert between <strong>JPEG, JPG, PNG, WEBP, and HEIC</strong> formats while resizing images. Perfect for converting iPhone HEIC photos to JPG, or optimizing WEBP images for compatibility with older systems.
          </p>
        </section>

        {/* ======================= COMPREHENSIVE SEO GUIDE (GLOBAL-FOCUSED) ======================= */}
        <section className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b pb-4">
              The Complete Guide to Resizing Photos for Official Documents
            </h2>

            <p className="lead text-lg mb-6">
              Whether you're applying for a passport, visa, government job, or professional profile, every official form has strict photograph requirements. Incorrect dimensions, file size, or background color can result in application rejection. Our browser-based photo resizer helps you meet these specifications precisely — for documents from any country.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Why Do Image Dimensions and File Size Matter?</h3>
            <p>
              Government portals, visa application systems, and corporate platforms operate with strict data quotas. Passport offices, immigration portals, and job application systems worldwide mandate specific <strong>photo compressor</strong> limits — often between <strong>20KB and 240KB</strong> depending on the country and document type.
            </p>
            <p>
              If your photo exceeds the size limit, the upload will fail. If it's too compressed, image quality may degrade and become illegible on print. This is why a precise, browser-based <strong>generic photo resizer and editor</strong> is essential. It lets you dial in exact pixel dimensions (e.g., 600x600 pixels for US passports, 200x230 pixels for Indian exams, or 413x531 pixels for Schengen visas) while compressing image weight to meet requirements.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">JPEG vs PNG vs WEBP vs HEIC: Which Format Should You Choose?</h3>
            <p>
              <strong>JPEG/JPG</strong> is the most universally accepted format for official documents worldwide, including passports, visas, and government IDs. <strong>PNG</strong> offers lossless quality but larger file sizes. <strong>WEBP</strong> provides superior compression but isn't accepted by older government systems. <strong>HEIC</strong> is Apple's default iPhone format and often needs conversion to JPG for official uploads.
            </p>
            <p>
              Our tool automatically acts as a <strong>JPEG to JPG converter</strong>, a PNG to JPG converter, an HEIC to JPG converter, and a WEBP to JPG converter. When you upload any modern image format — including HEIC from iPhones or WEBP from modern web downloads — our tool processes it and ensures the final downloaded file is a heavily optimized standard JPG, compliant with all official document guidelines.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Common Photo Requirements by Document Type</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>US Passport:</strong> 2x2 inches (600x600px minimum), white background, no glasses, neutral expression, under 240KB.</li>
              <li><strong>UK Passport:</strong> 35x45mm, light grey or cream background, eyes open, mouth closed, no head coverings (except religious).</li>
              <li><strong>Schengen Visa:</strong> 35x45mm, white or very light background, 70-80% face coverage, taken within last 3 months.</li>
              <li><strong>Canada Passport:</strong> 50x70mm, white background, neutral expression, no glasses since 2023.</li>
              <li><strong>Australia Passport:</strong> 35x45mm, light grey or white background, mouth closed, no smiling in some cases.</li>
              <li><strong>Indian SSC/UPSC Exams:</strong> 20-50KB file size, 200x230 pixels, white background, 80% image quality.</li>
              <li><strong>LinkedIn Profile:</strong> 400x400px minimum, professional attire, clean background.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">How to Compress Images Without Losing Quality</h3>
            <p>
              Compressing an image from 5MB down to 50KB sounds like it would ruin the photo, but with modern client-side compression algorithms, visual fidelity is maintained. Our <strong>online photo compressor</strong> works by adjusting quality settings and utilizing smart chroma subsampling.
            </p>
            <p>
              By dropping imperceptible color data while retaining edge sharpness (the luminance), the photo weight drops dramatically while faces remain crystal clear. Because processing is done completely in your local browser, your private identification documents are never sent across the internet — guaranteeing 100% privacy and security.
            </p>

            <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-4 mt-8 rounded-r-lg">
              <h4 className="font-semibold text-primary mb-2">Pro Tip for Quick Processing:</h4>
              <p className="mb-0 text-sm">
                Use our automated preset buttons! Instead of manually typing dimensions, simply select a preset like "US Passport", "Schengen Visa", or "LinkedIn Profile". The tool will auto-crop your image to the correct aspect ratio and apply the ideal compression instantly.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Need AI-Powered US Visa & Passport Photos?</h3>
            <p>
              If you are applying for a US Visa, check out our dedicated AI tool at <a href="https://www.usvisaphotoai.pro/" className="text-primary hover:underline font-medium" title="US Visa Photo AI">US Visa Photo AI</a>. It uses advanced biometric scanning to ensure 100% compliance with State Department guidelines. You can easily create a perfectly validated <a href="https://www.usvisaphotoai.pro/us-visa-photo" className="text-primary hover:underline font-medium" title="US Visa Photo Maker">US Visa Photo</a> and a compliant <a href="https://www.usvisaphotoai.pro/us-passport-photo" className="text-primary hover:underline font-medium" title="US Passport Photo Maker">US Passport Photo</a> instantly, ensuring your application is accepted on the very first try.
            </p>
          </div>
        </section>
        {/* ========================================================================================================= */}

        <AdUnit type="in-article" />

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <HelpCircle className="w-6 h-6 text-primary mx-auto mb-2" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-white dark:bg-slate-800 px-4">
                    <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-white [&>svg]:text-slate-500 dark:[&>svg]:text-slate-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600 dark:text-slate-300 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* FEATURES */}
        <Card className="bg-slate-900 dark:bg-slate-800 text-white border-none">
          <CardContent className="py-6 sm:py-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center text-sm">
            {['100% Free', 'No Watermarks', 'Client-Side Only', 'All Formats Supported'].map(
              feature => (
                <div key={feature} className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="font-medium">{feature}</span>
                </div>
              )
            )}
          </CardContent>
        </Card>

      </div>
    </section>
  )
}
