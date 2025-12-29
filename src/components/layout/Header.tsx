import { FileImage, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="gradient-hero text-primary-foreground"
    >
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <FileImage className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading tracking-tight">
                Government Form Image Editor
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Resize, Convert & Optimize Photos for Official Forms
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-primary-foreground/90">
              <Shield className="w-4 h-4" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary-foreground/90">
              <Zap className="w-4 h-4" />
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary-foreground/90">
              <Globe className="w-4 h-4" />
              <span>Works Offline</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
