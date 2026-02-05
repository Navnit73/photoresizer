import { Helmet } from "react-helmet-async";
import { FileText, AlertCircle, Ban, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Photo Resizer | Usage Guidelines</title>
        <meta
          name="description"
          content="Read our terms of service to understand the usage guidelines and limitations for Photo Resizer online tool."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/terms-of-service" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 py-16">
          <div className="container px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Please read these terms carefully before using our service.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                Last updated: February 5, 2026
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  Acceptance of Terms
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  By accessing and using Photo Resizer ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <FileText className="w-6 h-6 text-primary" />
                  Service Description
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Photo Resizer provides free online image editing tools including:
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• Image resizing and compression</li>
                  <li>• Format conversion (JPEG, PNG, WEBP)</li>
                  <li>• Photo cropping and rotation</li>
                  <li>• Passport photo creation</li>
                  <li>• Government form photo optimization</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                  All processing is performed client-side in your browser, ensuring privacy and security.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                  Disclaimer of Warranties
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to:
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• Accuracy of image processing results</li>
                  <li>• Compatibility with all government form requirements</li>
                  <li>• Uninterrupted or error-free service</li>
                  <li>• Specific quality outcomes</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                  <strong>Important:</strong> While we strive to meet government photo requirements, we recommend always verifying that your processed images meet the specific requirements of your target application.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  <Ban className="w-6 h-6 text-red-500" />
                  Prohibited Uses
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. Prohibited activities include:
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• Uploading illegal, harmful, or offensive content</li>
                  <li>• Attempting to gain unauthorized access to the Service</li>
                  <li>• Using automated tools to scrape or overload the Service</li>
                  <li>• Creating fraudulent identity documents</li>
                  <li>• Violating any applicable local, national, or international law</li>
                </ul>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  Limitation of Liability
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  In no event shall Photo Resizer, its operators, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service, including but not limited to application rejections due to photo non-compliance.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  Intellectual Property
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  You retain all rights to images you upload and process through the Service. The Service's code, design, and branding are protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  Changes to Terms
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Service after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="p-8 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  For questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:legal@photoresizer.co.in" className="text-primary hover:underline">
                    legal@photoresizer.co.in
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
