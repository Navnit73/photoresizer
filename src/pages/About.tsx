import { Helmet } from "react-helmet-async";
import { Users, Target, Zap, Globe, Heart, Code } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import AdUnit from '@/components/shared/AdUnit';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Photo Resizer | Free Online Image Editor</title>
        <meta
          name="description"
          content="Learn about Photo Resizer - a free, privacy-focused online image editing tool for resizing, compressing, and converting photos for government forms and..."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 py-16">
          <div className="container px-4 max-w-5xl mx-auto">
            {/* Hero */}
            <div
              className="text-center mb-16 animate-[fadeInUp_0.6s_ease-out]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                About Photo Resizer
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to make photo editing simple, accessible, and completely private for everyone.
              </p>
            </div>

            {/* Ad - Blog Banner */}
            <div className="flex justify-center mb-8">
              <AdUnit type="blog" />
            </div>

            {/* Mission & Trust */}
            <section
              className="mb-16 p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-[fadeInUp_0.6s_ease-out_0.2s_both]"
            >
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Why Trust Photo Resizer?</h2>
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Photo Resizer was built by a team of independent software engineers dedicated to solving the complex requirements of official government forms and exam applications. We understand that a mere pixel out of place or an extra kilobyte can result in exam application rejection.
                </p>
                <p>
                  <strong>Our Expertise:</strong> We actively monitor official notifications from UPSC, SSC, IBPS, and other state commissions to ensure our presets reflect the latest guidelines. Our tool is meticulously engineered to enforce strict byte-size limits (e.g., exact 20KB to 50KB windows) while preserving the critical details of your face and signature using pure client-side web technologies.
                </p>
                <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 rounded-r-xl">
                  <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-500 mb-2">Important Disclaimer</h3>
                  <p className="text-amber-800 dark:text-amber-400 text-base">
                    While we strive for 100% accuracy in our templates, official requirements can change without notice. We are an independent educational tool and are <strong>not affiliated with any government entity</strong>. Always consult the latest official exam notification for the most current photo and signature specifications before finalizing your application.
                  </p>
                </div>
              </div>
            </section>

            {/* Values */}
            <section
              className="mb-16 animate-[fadeIn_0.6s_ease-out_0.3s_both]"
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
                  <div
                    key={index}
                    className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm hover:shadow-md transition-shadow animate-[fadeInUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-4 shadow-md">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{value.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technology */}
            <section
              className="mb-16 p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-[fadeInUp_0.6s_ease-out_0.6s_both]"
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
            </section>

            {/* Stats */}
            <section
              className="mb-16 animate-[fadeIn_0.6s_ease-out_0.7s_both]"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Users Served", value: "10K+" },
                  { label: "Photos Processed", value: "50K+" },
                  { label: "Countries", value: "20+" },
                  { label: "Uptime", value: "99.9%" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-[fadeInUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${0.8 + index * 0.05}s` }}
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ad - Sidebar */}
            <div className="flex justify-center mb-8">
                                {/* <AdUnit type="sidebar" /> */}

            </div>

            {/* CTA */}
            <section
              className="text-center p-10 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 animate-[fadeInUp_0.6s_ease-out_0.9s_both]"
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
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
