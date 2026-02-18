import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  Icon?: LucideIcon
  children?: ReactNode
}

export function HeroSection({
  title,
  subtitle,
  description,
  Icon,
  children,
}: HeroSectionProps) {
  return (
    <section className="py-10 md:py-14 bg-slate-900">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">

          {/* Small Icon */}
          {/* {Icon && (
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )} */}

          {/* Subtitle */}
          {/* {subtitle && (
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
              {subtitle}
            </p>
          )} */}

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-5">
              {description}
            </p>
          )}

          {/* Optional Actions */}
          {children && (
            <div>
              {children}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
