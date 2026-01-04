import { useState } from "react";
import {
  FileImage,
  Shield,
  Zap,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs">
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}

const navLinks = [
  ["SSC Photo", "/ssc-photo-resizer"],
  ["UPSC", "/upsc-photo-size"],
  ["50KB", "/reduce-photo-size-50kb"],
  ["IBPS Sign", "/signature-resize-ibps"],
];

export function Header() {
  const [open, setOpen] = useState(false);

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
        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: LOGO + TITLE */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <FileImage className="w-5 h-5 text-white" />
            </div>

            <div className="text-white leading-tight">
              <h1 className="text-sm md:text-lg font-semibold tracking-tight">
                Government Photo Editor
              </h1>
              <p className="text-[10px] text-white/75">
                Free · No Upload
              </p>
              <p className="hidden md:block text-xs text-white/70">
                Passport · Aadhaar · PAN · Visa
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-4 text-sm text-white/80">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="hover:text-white transition"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* RIGHT: TRUST SIGNALS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-2">
            <Badge icon={Shield} label="Private" />
            <Badge icon={Zap} label="Fast" />
            <Badge icon={Globe} label="Offline" />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 rounded-lg bg-white/10 border border-white/20"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-white/10">
                {navLinks.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-sm text-white/90 hover:bg-white/10 transition"
                  >
                    {label}
                  </a>
                ))}
              </div>

              {/* MOBILE TRUST BADGES */}
              <div className="flex gap-2 px-4 py-3 border-t border-white/10">
                <Badge icon={Shield} label="Private" />
                <Badge icon={Zap} label="Fast" />
                <Badge icon={Globe} label="Offline" />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
