import { Helmet } from "react-helmet-async";
import { Mail, Clock, ShieldCheck, HelpCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Photo Resizer | Customer Support</title>
        <meta
          name="description"
          content="Get in touch with the Photo Resizer team. General inquiries, technical support, privacy-related questions and business collaboration."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/contact" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 py-16">
          <div className="container px-4 max-w-4xl mx-auto">
            {/* Header section */}
            <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6 shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                We're here to help and answer any question you might have.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
              {/* Direct Contact Option */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Email Us directly</h3>
                    <p className="text-sm text-slate-500">Fastest response</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  For support inquiries or any tool-related questions, reach out via our direct support channel.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <a
                    href="mailto:navnitrai5389@gmail.com"
                    className="text-primary font-medium hover:underline text-lg flex items-center gap-2 break-all"
                  >
                    navnitrai5389@gmail.com
                  </a>
                </div>
              </div>

              {/* General Enquiries Option */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">General Enquiries</h3>
                    <p className="text-sm text-slate-500">Business & Partnerships</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Do you have questions about custom integrations, partnerships, or our roadmap?
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <a
                    href="mailto:contact@photoresizer.co.in"
                    className="text-primary font-medium hover:underline text-lg flex items-center gap-2 break-all"
                  >
                    contact@photoresizer.co.in
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid md:grid-cols-2 gap-6 bg-slate-100 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Privacy Guarantee</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your questions remain confidential. Rest assured, we never ask you to email us personal identification documents or raw photos. 
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Response Time</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We aim to respond to all inquiries within 24-48 business hours, depending on current volume.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
