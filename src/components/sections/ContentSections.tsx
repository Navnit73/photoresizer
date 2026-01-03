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
import { motion } from 'framer-motion'

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
    <section className="py-16 bg-secondary/30">
      <div className="container space-y-20">

        {/* ================= HERO SEO SECTION ================= */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-heading">
            Photo Resizer & Image Resizer for Government Forms in India
          </h1>

          <p className="text-muted-foreground max-w-4xl mx-auto">
            Free online photo resizer for SSC, UPSC, PAN Card, Aadhaar Card,
            Passport, Visa, and job application forms. Resize images to exact
            dimensions, reduce photo size to 20KB or 50KB, and convert JPEG to
            JPG, JPG to JPEG, PNG, or WEBP instantly — 100% secure and browser-based.
          </p>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading mb-3">
              How the Photo Resizer Works
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-sm">
              Resize photos for SSC photo resize, PAN Card photo size,
              Aadhaar photo resize, passport photo resizer online, visa photo
              editor, and job application photo resize in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={step.title} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">
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
        </motion.div>

        {/* ================= USE CASES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading">
              Perfect for Government & Exam Forms
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map(useCase => (
              <Card key={useCase.title} variant="tool">
                <CardHeader className="flex-row gap-4">
                  <useCase.icon className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle className="text-base">
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
        </motion.div>

        {/* ================= IMAGE CONVERTER SEO ================= */}
        <section className="max-w-5xl mx-auto text-sm text-muted-foreground space-y-4">
          <h2 className="text-2xl font-bold text-center text-foreground">
            Image Converter & Format Support
          </h2>
          <p>
            This tool also works as an online image converter in India. Convert
            JPEG to JPG, JPG to JPEG, PNG to JPG, JPG to PNG, and WEBP formats
            while resizing images for government and job application forms.
          </p>
        </section>

        {/* ================= FAQ ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <HelpCircle className="w-6 h-6 text-primary mx-auto mb-2" />
            <h2 className="text-3xl font-bold font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="px-6 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================= FEATURES ================= */}
        <Card className="gradient-hero text-primary-foreground">
          <CardContent className="py-8 grid md:grid-cols-4 gap-6 text-center">
            {['100% Free', 'No Watermarks', 'Client-Side Only', 'All Formats Supported'].map(
              feature => (
                <div key={feature} className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>{feature}</span>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
