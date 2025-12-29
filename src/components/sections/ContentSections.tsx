import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Upload, Settings, Download, Check, HelpCircle, FileImage, CreditCard, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Photo',
    description: 'Drag and drop or click to upload your image. We support JPG, PNG, and WEBP formats.',
  },
  {
    icon: Settings,
    title: 'Customize Settings',
    description: 'Choose preset sizes for passport, PAN, Aadhaar, or enter custom dimensions. Adjust background color and quality.',
  },
  {
    icon: Download,
    title: 'Download Result',
    description: 'Preview your edited image in real-time and download in your preferred format with one click.',
  },
];

const faqs = [
  {
    question: 'What image formats are supported?',
    answer: 'We support all major image formats including JPG, JPEG, PNG, and WEBP. You can upload any of these formats and convert to any other format when downloading.',
  },
  {
    question: 'Is my image data secure and private?',
    answer: 'Absolutely! All image processing happens directly in your browser. Your images are never uploaded to any server. This ensures 100% privacy and security for your documents.',
  },
  {
    question: 'What are the standard sizes for government forms?',
    answer: 'Common sizes include: Passport Photo (35×45mm / 413×531px), PAN Card (25×35mm / 206×265px), Aadhaar Card (35×45mm / 140×182px), Visa Photo (51×51mm / 600×600px), and many more preset options.',
  },
  {
    question: 'Can I use this tool offline?',
    answer: 'Yes! Once the page is loaded, all processing happens locally in your browser. You can use the tool without an internet connection.',
  },
  {
    question: 'What is the recommended quality setting?',
    answer: 'For government forms, we recommend 90% quality which provides excellent clarity while keeping file sizes manageable. Use 100% for maximum quality if file size is not a concern.',
  },
  {
    question: 'Why should I use white background for photos?',
    answer: 'Most government documents require a plain white or light background. Our tool makes it easy to change the background color to meet official requirements.',
  },
];

const useCases = [
  {
    icon: FileImage,
    title: 'Passport & Visa Photos',
    description: 'Create perfectly sized photos for passport, visa, and travel documents.',
  },
  {
    icon: CreditCard,
    title: 'Identity Cards',
    description: 'Resize photos for PAN Card, Aadhaar Card, Voter ID, and other identity documents.',
  },
  {
    icon: FileText,
    title: 'Job Applications',
    description: 'Prepare photos for SSC, UPSC, Banking, Railway, and other competitive exam forms.',
  },
];

export function ContentSections() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container space-y-16">
        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Edit your photos for government forms in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={step.title} variant="elevated" className="text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 gradient-hero" />
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading mb-3">Perfect For</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our image editor is designed specifically for official document requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <Card key={useCase.title} variant="tool" className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">{useCase.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold font-heading">Frequently Asked Questions</h2>
            </div>
            <p className="text-muted-foreground">
              Everything you need to know about our image editor
            </p>
          </div>
          
          <Card variant="elevated">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="px-6 text-left hover:no-underline hover:bg-secondary/30">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="gradient-hero text-primary-foreground overflow-hidden">
            <CardContent className="py-8">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                  'No Watermarks',
                  '100% Free',
                  'Client-Side Only',
                  'All Major Formats',
                ].map((feature) => (
                  <div key={feature} className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
