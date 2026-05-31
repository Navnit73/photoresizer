import { Link } from "react-router-dom";
import { FileImage, Shield, Zap, Globe } from "lucide-react";
import AdUnit from "@/components/shared/AdUnit";


export function Footer() {
  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}
    >
      {/* Amazon Text Banner Unit */}
     
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <AdUnit type="blog" />
      </div>

      <div className="container relative z-10 px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12 mb-12">
          {/* Column 1: Photo Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Photo Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/compress-image" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Compress Image
                </Link>
              </li>
              <li>
                <Link to="/jpeg-to-jpg" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  JPEG to JPG
                </Link>
              </li>
              <li>
                <Link to="/jpg-to-png" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  JPG to PNG
                </Link>
              </li>
              <li>
                <Link to="/passport-photo-maker" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Passport Photo Maker
                </Link>
              </li>
              <li>
                <Link to="/passport-size-photo-maker" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Passport Size Photo
                </Link>
              </li>
              <li>
                <Link to="/passport-photo-app" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Passport Photo App
                </Link>
              </li>
              <li>
                <a href="https://www.usvisaphotoai.pro/" target="_blank" rel="noopener" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" title="US Visa Photo Maker">
                  US Visa Photo AI
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Size Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resize Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resize-photo-20kb" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Resize to 20KB
                </Link>
              </li>
              <li>
                <Link to="/resize-photo-50kb" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Resize to 50KB
                </Link>
              </li>
              <li>
                <Link to="/ssc-photo-resizer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  SSC Photo
                </Link>
              </li>
              <li>
                <Link to="/upsc-photo-size" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  UPSC Photo
                </Link>
              </li>
              <li>
                <Link to="/signature-resize-ibps" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  IBPS Signature
                </Link>
              </li>
            </ul>
          </div>

          {/* New Column: Foreign Exams */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Foreign Exams</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ielts-photo-size" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  IELTS Photo
                </Link>
              </li>
              <li>
                <Link to="/toefl-photo-size" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  TOEFL Photo
                </Link>
              </li>
              <li>
                <Link to="/sat-photo-size" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  SAT Photo
                </Link>
              </li>
              <li>
                <Link to="/pte-photo-size" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  PTE Photo
                </Link>
              </li>
               <li>
                <Link to="/gre-photo-size" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  GRE Photo
                </Link>
              </li>
               <li>
                <Link to="/gmat-photo-size" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  GMAT Photo
                </Link>
              </li>
            </ul>
          </div>

          {/* New Column: PDF Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">PDF Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pdf-size-reducer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  PDF Size Reducer
                </Link>
              </li>
              <li>
                <Link to="/merge-pdf" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Merge PDF
                </Link>
              </li>
               <li>
                <Link to="/split-pdf" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link to="/jpg-to-pdf" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Convert JPG to PDF
                </Link>
              </li>
              <li>
                <Link to="/pdf-to-jpg" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Convert PDF to JPG
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Visa Photo Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/us-visa-photo" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  US Visa (600x600 px)
                </Link>
              </li>
              <li>
                <Link to="/canada-visa-photo" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Canada Visa (50x70 mm)
                </Link>
              </li>
              <li>
                <Link to="/uk-visa-photo" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  UK Visa (35x45 mm)
                </Link>
              </li>
              <li>
                <Link to="/australia-visa-photo" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                  Australia Visa Photo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            {/* Contact Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Contact Developer</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-gray-300">Navnit Rai</span>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <a href="mailto:navnitrai5389@gmail.com">navnitrai5389@gmail.com</a>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <a href="tel:+917355087072">+91 7355087072</a>
              </p>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 md:justify-end text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <Shield className="w-4 h-4 text-green-500" />
                100% Private
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <Zap className="w-4 h-4 text-amber-500" />
                Fast Processing
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <Globe className="w-4 h-4 text-blue-500" />
                Offline Capable
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                  <FileImage className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">© {new Date().getFullYear()} Photo Resizer.</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 ml-10 hidden md:block">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 md:hidden text-center">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
            </div>
            <p>Designed & Developed with ❤️ by Navnit Rai</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
