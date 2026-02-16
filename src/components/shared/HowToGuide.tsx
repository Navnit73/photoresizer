import { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface HowToGuideProps {
  title?: string;
  steps: Step[];
}

export function HowToGuide({ title = "How It Works", steps }: HowToGuideProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          {title}
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-600 to-cyan-600 hidden md:block" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex gap-4 md:gap-6"
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 text-white font-bold text-lg shadow-lg relative z-10">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
