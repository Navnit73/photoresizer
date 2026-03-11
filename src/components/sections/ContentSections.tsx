import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
} from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Photo',
    description:
      'Upload your image using drag & drop or file picker. Supports JPG, JPEG, PNG, and WEBP formats.',
  },
  {
    icon: Settings,
    title: 'Resize & Adjust',
    description:
      'Select preset sizes for SSC, PAN Card, Aadhaar, Passport, Visa, or enter custom dimensions. Adjust background color and image quality.',
  },
  {
    icon: Download,
    title: 'Download Instantly',
    description:
      'Preview your resized photo in real time and download it instantly in JPG, JPEG, PNG, or WEBP format.',
  },
]

const useCases = [
  {
    icon: FileText,
    title: 'SSC, UPSC & Job Applications',
    description:
      'Resize photos for SSC CGL, UPSC, IBPS, Banking, Railway, and all job application forms.',
  },
  {
    icon: CreditCard,
    title: 'PAN Card & Aadhaar Card',
    description:
      'Create perfectly sized photos for PAN Card, Aadhaar Card, Voter ID, and other government IDs.',
  },
  {
    icon: FileImage,
    title: 'Passport & Visa Photos',
    description:
      'Resize passport and visa photos with correct dimensions, background, and file size.',
  },
]

const faqs = [
  {
    question: 'Is this photo resizer suitable for SSC and UPSC forms?',
    answer:
      'Yes. This tool is specifically designed for SSC, UPSC, IBPS, Banking, Railway, and other competitive exam forms. You can resize photos to exact dimensions and reduce file size to 20KB, 50KB, or any required limit.',
  },
  {
    question: 'Can I resize photos for PAN Card and Aadhaar Card?',
    answer:
      'Absolutely. You can resize PAN Card and Aadhaar Card photos to the officially required size, change background color, and compress images without losing quality.',
  },
  {
    question: 'Does this tool support JPEG to JPG conversion?',
    answer:
      'Yes. You can easily convert JPEG to JPG, JPG to JPEG, PNG to JPG, and WEBP formats while resizing your image.',
  },
  {
    question: 'Are my photos uploaded to any server?',
    answer:
      'No. All image processing happens locally in your browser. Your photos are never uploaded to any server, ensuring complete privacy and security.',
  },
  {
    question: 'What is the recommended quality for government forms?',
    answer:
      'For most government forms, 80–90% quality is ideal. It provides excellent clarity while keeping file size within upload limits.',
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

        {/* HERO SEO SECTION */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Photo Resizer & Image Resizer for Government Forms in India
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-4xl mx-auto">
            Free online photo resizer for SSC, UPSC, PAN Card, Aadhaar Card,
            Passport, Visa, and job application forms. Resize images to exact
            dimensions, reduce photo size to 20KB or 50KB, and convert JPEG to
            JPG, JPG to JPEG, PNG, or WEBP instantly — 100% secure and browser-based.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <div>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading mb-3">
              How the Photo Resizer Works
            </h2>
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
              Resize photos for SSC photo resize, PAN Card photo size,
              Aadhaar photo resize, passport photo resizer online, visa photo
              editor, and job application photo resize in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <Card key={step.title} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-4">
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

        {/* USE CASES */}
        <div>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading">
              Perfect for Government & Exam Forms
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {useCases.map(useCase => (
              <Card key={useCase.title} variant="tool">
                <CardHeader className="flex-row gap-4 items-start">
                  <useCase.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-sm sm:text-base">
                      {useCase.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* IMAGE CONVERTER SEO */}
        <section className="max-w-5xl mx-auto text-sm text-muted-foreground space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground">
            Image Converter & Format Support
          </h2>
          <p>
            This tool also works as an online image converter in India. Convert
            JPEG to JPG, JPG to JPEG, PNG to JPG, JPG to PNG, and WEBP formats
            while resizing images for government and job application forms.
          </p>
        </section>

        {/* ======================= COMPREHENSIVE SEO GUIDE / HIGH QUALITY CONTENT FOR ADSENSE ======================= */}
        <section className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b pb-4">
              The Complete Guide to Resizing Photos for Government Exams & Forms
            </h2>
            
            <p className="lead text-lg mb-6">
              Applying for government jobs, passports, or national IDs in India often involves navigating strict photograph requirements. Whether it's the <strong>SSC photo resizer</strong> requirement, a <strong>UPSC application</strong>, or updating your <strong>PAN Card</strong> and <strong>Aadhaar Card</strong>, having the right image dimensions and file size is crucial to avoid application rejection.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Why Do Image Dimensions and File Size Matter?</h3>
            <p>
              Government application portals operate on legacy servers that have strict data quotas. Because millions of candidates apply simultaneously, platforms like the Staff Selection Commission (SSC) or Union Public Service Commission (UPSC) mandate specific <strong>photo compressor</strong> limits—often between <strong>20KB and 50KB</strong>. 
            </p>
            <p>
              If your photo exceeds the <strong>50KB limit</strong>, the upload will fail. If it is under <strong>20KB</strong>, the image quality might be too degraded, resulting in an illegible print on your admit card. This is why a precise, browser-based <strong>generic photo resizer and editor</strong> is essential. It allows you to dial in the exact pixel dimensions (e.g., 3.5cm x 4.5cm or 200x230 pixels) while compressing the image weight perfectly.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">JPEG vs PNG vs WEBP: Which Format Should You Choose?</h3>
            <p>
              Most Indian government websites strictly accept <strong>JPEG</strong> or <strong>JPG</strong> formats. While PNG offers lossless quality and WEBP provides superior compression, older examination portals do not recognize these extensions. 
            </p>
            <p>
              Our tool automatically acts as a <strong>JPEG to JPG converter</strong> and a PNG to JPG converter. When you upload any modern image format—including HEIC from iPhones or WEBP from modern web downloads—our tool processes it and ensures the final downloaded file is heavily optimized standard JPG, compliant with all <strong>job application photo resize</strong> guidelines.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Common Mistakes When Uploading SSC & UPSC Photos</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Incorrect Background:</strong> Most exams require a plain white or light-grey background. Busy backgrounds or dark shadows will lead to disqualification.</li>
              <li><strong>Wearing Spectacles or Caps:</strong> The SSC explicitly rejects photos where the candidate is wearing tinted glasses, caps, or where flash glare obscures the eyes.</li>
              <li><strong>Using Older Photos:</strong> Applications demand a recent passport-sized photograph, typically taken within the last 3 months. Sometimes, printing the date of the photo on the image is mandatory.</li>
              <li><strong>Blurry Signatures:</strong> Signature uploads must be clearly visible, cropped properly (often required to be between 10KB to 20KB), and signed in black or dark blue ink.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">How to Compress Images Without Losing Quality</h3>
            <p>
              Compressing an image from 5MB down to 50KB sounds like it would ruin the photo, but with modern client-side compression algorithms, the visual fidelity is maintained. Our <strong>online photo compressor</strong> works by adjusting the DPI (Dots Per Inch) and utilizing smart chroma subsampling. 
            </p>
            <p>
              By dropping imperceptible color data while retaining edge sharpness (the luminance), the photo weight drops dramatically while the face remains crystal clear. Because the processing is done completely in your local browser, your private identification documents are never sent across the internet, guaranteeing 100% privacy and security.
            </p>

            <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-4 mt-8 rounded-r-lg">
              <h4 className="font-semibold text-primary mb-2">Pro Tip for Quick Processing:</h4>
              <p className="mb-0 text-sm">
                Use our automated preset buttons! Instead of manually typing dimensions, simply select the "SSC" or "PAN Card" preset. The tool will auto-crop your image to the correct aspect ratio and apply the ideal <strong>photo resizer kb</strong> compression instantly.
              </p>
            </div>
          </div>
        </section>
        {/* ========================================================================================================= */}

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

