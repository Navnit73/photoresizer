import { FileImage, Shield, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative container px-3 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* === LEFT: LOGO + TITLE === */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <FileImage className="w-5 h-5 text-white" />
            </div>

            <div className="text-white leading-tight">
              <h1 className="text-sm md:text-lg font-semibold tracking-tight">
                Government Photo Editor
              </h1>
              <p className="text-[10px] text-white/75">Free · No Upload</p>

              {/* Subtitle hidden on mobile */}
              <p className="hidden md:block text-xs text-white/70">
                Passport · Aadhaar · PAN · Visa
              </p>
            </div>
          </div>

          {/* === RIGHT: TRUST SIGNALS (DESKTOP ONLY) === */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs">
              <Shield className="w-3 h-3" />
              Private
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs">
              <Zap className="w-3 h-3" />
              Fast
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs">
              <Globe className="w-3 h-3" />
              Offline
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
