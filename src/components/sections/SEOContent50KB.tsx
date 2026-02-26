import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Upload, Settings, Download, HelpCircle, FileImage, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: '1. Upload Photo',
    description: 'Select your photo (JPG, JPEG, PNG, WEBP). No login required. Processing is done securely in your browser.',
  },
  {
    icon: Settings,
    title: '2. Auto-Compress to 50KB',
    description: 'Our smart algorithm automatically adjusts the quality to hit exactly 50KB without losing visible clarity.',
  },
  {
    icon: Download,
    title: '3. Instantly Download',
    description: 'Preview the compressed result and download your perfect 50KB image instantly for government forms.',
  },
];

const useCases = [
  {
    icon: FileImage,
    title: 'IBPS & Banking Exams',
    description: 'Perfect for IBPS PO, Clerk, SBI applications which strictly mandate a 20KB-50KB signature or thumb impression size.',
  },
  {
    icon: ShieldCheck,
    title: 'SSC & State PSCs',
    description: 'Easily get your photographs under the 50KB limit required by SSC CGL, CHSL, and state Public Service Commissions.',
  },
  {
    icon: FileImage,
    title: 'University Admissions',
    description: 'Compress marksheets and certificates to exactly 50KB for seamless upload on college admission portals.',
  },
];

const faqs = [
  {
    question: 'How do I compress an image to exactly 50KB?',
    answer: 'Simply upload your image to our tool. It automatically analyzes the file and applies the optimal compression ratio to bring the file size down to 50KB or below, while maintaining the best possible visual quality.',
  },
  {
    question: 'Is my photo safe when I compress it online?',
    answer: 'Yes, 100% safe. Our tool uses client-side processing, meaning your images never leave your device. They are compressed directly within your web browser. No uploads, no servers, no privacy risks.',
  },
  {
    question: 'Will compressing to 50KB blur my photo?',
    answer: 'We use advanced compression techniques that prioritize facial clarity and text readability. While there is a minor reduction in data, the visual quality remains sharp enough to easily pass official verification checks.',
  },
  {
    question: 'What is the best format for a 50KB photo?',
    answer: 'JPEG/JPG is universally accepted and provides the best balance between quality and small file sizes. If you upload a PNG or WEBP, our tool can efficiently compress it to a 50KB JPEG for maximum compatibility with exam portals.',
  },
];

export function SEOContent50KB() {
  return (
    <section className="py-10 bg-white dark:bg-slate-950">
      <div className="container px-4 sm:px-6">
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
        <article className="max-w-4xl mx-auto space-y-6 mb-16 prose prose-slate dark:prose-invert">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            How to Compress Photo to 50KB Online Free
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-center">
            Struggling to upload your photo because the file size is too big? Most Indian government job portals, including IBPS, SSC, and Railway Recruitment Boards, strictly require image file sizes to be under 50KB. Our dedicated 50KB photo compressor instantly reduces your image size without sacrificing acceptable quality.
          </p>
          
          <h3 className="text-2xl font-semibold mt-10">Why 50KB is the Magic Number</h3>
          <p>
            When applying for competitive exams, scanning high-resolution photos often results in files over 2MB. Portals like IBPS and SSC reject these outright to save server space. A strict 50KB limit is usually imposed on:
          </p>
          <ul>
            <li><strong>Passport Photographs:</strong> Usually mandated between 20KB and 50KB.</li>
            <li><strong>Left Thumb Impressions:</strong> Often capped at exactly 50KB.</li>
            <li><strong>Handwritten Declarations:</strong> Sometimes strictly restricted between 50KB and 100KB, making heavy compression vital.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-10">Official 50KB Photo Specifications</h3>
          <div className="not-prose my-6 border rounded-lg overflow-hidden">
             <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Specification</th>
                  <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Standard Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                <tr>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Target File Size</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Exactly or Under 50 KB</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Ideal Dimensions</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Typically 200 x 230 Pixels</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Accepted Formats</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">.JPG / .JPEG Only</td>
                </tr>
                <tr>
                   <td className="px-4 py-3 text-slate-700 dark:text-slate-300">DPI / Resolution</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">200 DPI recommended for scanning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* HOW IT WORKS */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">
              Step-by-Step: Reduce Image Size to 50KB
            </h2>
            <p className="text-muted-foreground">
              Follow these three simple steps to compress your image for official uploads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card key={step.title} className="text-center border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* USE CASES */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">
              Who Needs a 50KB Photo Compressor?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="bg-slate-50 dark:bg-slate-900/50 border-none">
                <CardHeader className="flex-row gap-4 items-start">
                  <useCase.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <CardTitle className="text-base mb-2">
                      {useCase.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {useCase.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">
              Frequently Asked Questions (50KB Compression)
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-200 dark:border-slate-800 rounded-lg px-4 bg-white dark:bg-slate-900">
                <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
