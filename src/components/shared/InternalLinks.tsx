import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface InternalLink {
  label: string;
  href: string;
}

interface InternalLinksProps {
  links: InternalLink[];
  title?: string;
}

export function InternalLinks({ links, title = "Related Tools" }: InternalLinksProps) {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          {title}
        </h2>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-300"
            >
              <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {link.label}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
