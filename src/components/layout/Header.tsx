import { FileImage, Shield, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs">
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}

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
              <p className="text-[10px] text-white/75">Free · No Upload</p>
              <p className="hidden md:block text-xs text-white/70">
                Passport · Aadhaar · PAN · Visa
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-4 text-sm text-white/80">
            <a
              href="/ssc-photo-resizer"
              className="hover:text-white transition"
            >
              SSC Photo
            </a>
            <a
              href="/upsc-photo-size"
              className="hover:text-white transition"
            >
              UPSC
            </a>
            <a
              href="/reduce-photo-size-50kb"
              className="hover:text-white transition"
            >
              50KB
            </a>
            <a
              href="/signature-resize-ibps"
              className="hover:text-white transition"
            >
              IBPS
            </a>
          </nav>

          {/* RIGHT: TRUST SIGNALS */}
          <div className="hidden md:flex items-center gap-2">
            <Badge icon={Shield} label="Private" />
            <Badge icon={Zap} label="Fast" />
            <Badge icon={Globe} label="Offline" />
          </div>
        </div>

        {/* MOBILE NAV */}
        <nav className="md:hidden mt-3 flex gap-2 overflow-x-auto text-xs text-white/80">
          {[
            ["SSC Photo", "/ssc-photo-resizer"],
            ["UPSC", "/upsc-photo-size"],
            ["50KB", "/reduce-photo-size-50kb"],
            ["IBPS Sign", "/signature-resize-ibps"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
