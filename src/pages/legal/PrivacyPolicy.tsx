import { Helmet } from "react-helmet-async";
import { Shield, Lock, Eye, Database, Globe, UserCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Photo Resizer | Complete Data Protection</title>
        <meta
          name="description"
          content="Our privacy policy explains how we protect your data. All image processing happens in your browser - we never upload or store your photos."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/privacy-policy" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 py-16">
          <div className="container px-4 max-w-4xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Your privacy is our top priority. Learn how we protect your data.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                Last updated: February 5, 2026
              </p>
            </motion.div>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Lock,
                  title: "100% Client-Side",
                  description: "All processing happens in your browser. Your images never leave your device.",
                },
                {
                  icon: Eye,
                  title: "No Tracking",
                  description: "We don't track your images or collect personal data.",
                },
                {
                  icon: Database,
                  title: "Zero Storage",
                  description: "We don't store any of your uploaded images on our servers.",
                },
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50 text-center"
                >
                  <point.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">{point.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{point.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg dark:prose-invert max-w-none space-y-8"
            >
              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <Lock className="w-6 h-6 text-primary" />
                  How We Process Your Images
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Photo Resizer is a 100% client-side application. This means all image processing, editing, resizing, and compression happens directly in your web browser using JavaScript and Canvas API. We do not upload your images to any server. Your photos never leave your device, ensuring complete privacy and security.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <Database className="w-6 h-6 text-primary" />
                  Data We DO NOT Collect
                </h2>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>✗ We do not upload or store your images</li>
                  <li>✗ We do not collect personal information</li>
                  <li>✗ We do not track your editing activities</li>
                  <li>✗ We do not use cookies for tracking</li>
                  <li>✗ We do not sell your data to third parties</li>
                </ul>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <Globe className="w-6 h-6 text-primary" />
                  Analytics & Cookies
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  We use Google Analytics and Microsoft Clarity to understand how visitors use our website. These services collect anonymous usage data such as:
                </p>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300 mb-4">
                  <li>• Pages visited</li>
                  <li>• Time spent on site</li>
                  <li>• Browser type and version</li>
                  <li>• General location (country/city level)</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Important:</strong> These analytics tools do not have access to your uploaded images or editing activities. They only track general website navigation patterns.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <UserCheck className="w-6 h-6 text-primary" />
                  Your Rights
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Since we don't collect or store your personal data or images, there's nothing to request, modify, or delete. You maintain complete control over your images at all times. You can disable analytics cookies in your browser settings if you prefer not to be tracked at all.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  Questions About Privacy?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  If you have any questions about our privacy practices, please contact us at{" "}
                  <a href="mailto:privacy@photoresizer.co.in" className="text-primary hover:underline">
                    privacy@photoresizer.co.in
                  </a>
                </p>
              </section>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
