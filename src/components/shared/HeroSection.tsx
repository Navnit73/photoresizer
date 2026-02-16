import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  Icon?: LucideIcon;
  gradient?: string;
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  description,
  Icon,
  gradient = 'bg-slate-900',
  children,
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden ${gradient} pt-24 pb-12 md:pt-32 md:pb-20 -mt-10`}>
      {/* Background with Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-[#0f172a]" />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-slate-900/50" />
      
      {/* Static Background Blobs (no infinite JS animation) */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/15 blur-3xl"
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        />
      </div>

      <div className="relative container px-4">
        <div className="max-w-4xl mx-auto text-center animate-[fadeInUp_0.6s_ease-out]">
          {Icon && (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl glass-strong border-2 border-white/30 mb-6 shadow-2xl animate-[fadeIn_0.4s_ease-out_0.2s_both]">
              <Icon className="w-10 h-10 text-white" />
            </div>
          )}

          {subtitle && (
            <p className="text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider mb-4 animate-[fadeIn_0.4s_ease-out_0.3s_both]">
              {subtitle}
            </p>
          )}

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-[fadeInUp_0.5s_ease-out_0.4s_both]">
            {title}
          </h1>

          <p className="text-base md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-[fadeIn_0.5s_ease-out_0.5s_both]">
            {description}
          </p>

          {children && (
            <div className="animate-[fadeInUp_0.4s_ease-out_0.6s_both]">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            className="fill-slate-50 dark:fill-slate-900"
          />
        </svg>
      </div>
    </section>
  );
}
