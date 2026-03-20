import { Helmet } from "react-helmet-async";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import AdUnit from '@/components/shared/AdUnit';

const faqs = [
  {
    question: "Is Photo Resizer really free?",
    answer: "Yes, absolutely! Photo Resizer is completely free to use with no hidden fees, subscriptions, or account requirements. All features are available to everyone at no cost.",
  },
  {
    question: "Are my photos safe and private?",
    answer: "Yes, 100% safe. All image processing happens directly in your browser using JavaScript and Canvas API. Your photos never leave your device and are not uploaded to any server. We have zero access to your images.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed! Photo Resizer works instantly without any registration. Just visit the website and start editing your photos immediately.",
  },
  {
    question: "What image formats are supported?",
    answer: "We support JPG/JPEG, PNG, and WEBP formats. You can convert between these formats and export in any of them based on your needs.",
  },
  {
    question: "How do I compress an image to exactly 20KB or 50KB?",
    answer: "Upload your image, select the target size (20KB or 50KB) using our dedicated pages. Our smart compression algorithm will automatically optimize your image to hit the exact file size while maintaining maximum possible quality.",
  },
  {
    question: "Can I use this for passport photos?",
    answer: "Yes! Our Passport Photo Editor supports requirements for India, US, UK, Canada, Australia, and other countries. It auto-adjusts dimensions and includes background editing features.",
  },
  {
    question: "What's the maximum file size I can upload?",
    answer: "You can upload images up to 50MB. However, since processing happens in your browser, very large files may take longer to process depending on your device's performance.",
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes! Photo Resizer is fully responsive and works on smartphones, tablets, and desktop computers. It works on any device with a modern web browser.",
  },
  {
    question: "Can I use this offline?",
    answer: "The initial page load requires an internet connection, but once loaded, all image processing works offline since it happens in your browser. We're working on full offline PWA support.",
  },
  {
    question: "Why do government forms require specific photo sizes?",
    answer: "Government forms often have strict photo size requirements (like 20KB or 50KB) to ensure standardized file sizes for their systems, reduce server load, and maintain consistency across applications.",
  },
  {
    question: "What's the difference between JPEG and PNG?",
    answer: "JPEG is better for photographs with smaller file sizes but doesn' support transparency. PNG supports transparency and is lossless, making it ideal for logos and graphics, but results in larger files.",
  },
  {
    question: "How accurate is the file size compression?",
    answer: "Our progressive compression algorithm achieves accuracy within 5% of the target size. For example, if targeting 20KB, the final size will typically be between 19KB-21KB.",
  },
  {
    question: "Can I batch process multiple images?",
    answer: "Currently, you can process images one at a time. We're considering adding batch processing in future updates based on user demand.",
  },
  {
    question: "Is there a limit on how many photos I can edit?",
    answer: "No limits! You can edit as many photos as you want, whenever you want. There are no daily limits or usage restrictions.",
  },
  {
    question: "What browsers are supported?",
    answer: "Photo Resizer works on all modern browsers including Chrome, Firefox, Safari, Edge, and their mobile versions. We recommend using the latest browser version for best performance.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm animate-[fadeInUp_0.5s_ease-out]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Photo Resizer</title>
        <meta
          name="description"
          content="Find answers to common questions about Photo Resizer. Learn about privacy, supported formats, compression accuracy, and how to resize photos for government forms."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/faq" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 py-16">
          <div className="container px-4 max-w-4xl mx-auto">
            {/* Hero */}
            <div
              className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6 shadow-lg">
                <HelpCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Everything you need to know about Photo Resizer
              </p>
            </div>

            {/* Ad - Blog Banner */}
            <div className="flex justify-center mb-8">
              <AdUnit type="blog" />
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} />
              ))}
            </div>

            {/* Ad - Sidebar */}
            <div className="flex justify-center mt-12">
              <AdUnit type="sidebar" />
            </div>

            {/* Contact */}
            <div
              className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 text-center animate-[fadeInUp_0.6s_ease-out_0.5s_both]"
            >
              <h2 className="text-2xl font-bold text-grey-500 mb-3">Still have questions?</h2>
              <p className="text-grey-500 mb-6">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <a
                href="mailto:support@photoresizer.co.in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105"
              >
                Contact Support
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
