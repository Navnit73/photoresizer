import { Helmet } from "react-helmet-async";
import { Users, Target, Zap, Globe, Heart, Code } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Photo Resizer | Free Online Image Editor</title>
        <meta
          name="description"
          content="Learn about Photo Resizer - a free, privacy-focused online image editing tool for resizing, compressing, and converting photos for government forms and applications."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 py-16">
          <div className="container px-4 max-w-5xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                About Photo Resizer
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to make photo editing simple, accessible, and completely private for everyone.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16 p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Our Mission</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Photo Resizer was created to solve a common problem: getting photos to meet strict size and format requirements for government forms, job applications, and official documents. We believe everyone should have access to professional photo editing tools without compromising privacy or paying expensive subscription fees.
              </p>
            </motion.section>

            {/* Values */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center">What We Stand For</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Users,
                    title: "Privacy First",
                    description: "All processing happens in your browser. Your photos never touch our servers, ensuring complete privacy.",
                  },
                  {
                    icon: Zap,
                    title: "Fast & Free",
                    description: "No accounts, no subscriptions, no hidden fees. Just fast, reliable photo editing available to everyone.",
                  },
                  {
                    icon: Globe,
                    title: "Accessible",
                    description: "Works on any device with a modern browser. Available 24/7, in any country, with no restrictions.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{value.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Technology */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16 p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Built with Modern Technology</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Photo Resizer is built using cutting-edge web technologies including React, TypeScript, and the HTML5 Canvas API. This allows us to perform complex image processing directly in your browser without any server-side processing.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "⚡ Client-side processing for instant results",
                  "🔒 Zero-knowledge architecture for complete privacy",
                  "📱 Responsive design for all devices",
                  "🌙 Dark mode support",
                  "♿ Accessibility-focused interface",
                  "🚀 Progressive web app capabilities",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Stats */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Users Served", value: "10K+" },
                  { label: "Photos Processed", value: "50K+" },
                  { label: "Countries", value: "20+" },
                  { label: "Uptime", value: "99.9%" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center p-10 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500"
            >
              <h2 className="text-3xl font-bold text-grey-500 mb-4">Ready to Get Started?</h2>
              <p className="text-grey-500 text-lg mb-6 max-w-2xl mx-auto">
                Join thousands of users who trust Photo Resizer for their image editing needs.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-200 text-primary rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105"
              >
                <Target className="w-5 h-5" />
                Start Editing Photos
              </Link>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
