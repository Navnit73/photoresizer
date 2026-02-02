import { useState } from "react";
import { FileImage, Shield, Zap, Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-full
      bg-white/10 border border-white/20 text-purple-50 text-xs backdrop-blur"
    >
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}

const navLinks: [string, string][] = [
  ["SSC Photo", "/ssc-photo-resizer"],
  ["UPSC", "/upsc-photo-size"],
  ["Photo Compressor", "/reduce-photo-size-50kb"],
  ["Signature Resize", "/signature-resize-ibps"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative overflow-hidden  rounded-b-[28px]">
      {/* 🌌 Base Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r
        from-purple-600 via-purple-600 to-indigo-600"
      />
      <div className="absolute bottom-0 left-0 right-0 h-10
  bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      {/* ✨ Depth Glow */}
      <div
        className="absolute inset-0 bg-gradient-to-b
        from-white/10 via-transparent to-black/10"
      />

   
      {/* 🐝 Dense Honeycomb (3D + Gradual Fade) */}
      <div className="absolute left-0 top-0 h-full w-[300px] pointer-events-none">
        {/* Shadow layer */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='56' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 37L0 28V9L16 0L32 9V28L16 37V56' fill='none' stroke='black' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: "32px 56px",
            filter: "blur(1.2px)",
            transform: "translate(2px, 2px)",
          }}
        />

        {/* Highlight layer */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='56' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 37L0 28V9L16 0L32 9V28L16 37V56' fill='none' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundSize: "32px 56px",
          }}
        />

        {/* 🎭 Soft fade mask (THIS is the magic) */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
          }}
        />

        {/* Extra blur fade for realism */}
        <div
          className="absolute right-0 top-0 h-full w-16
    bg-gradient-to-r from-transparent to-purple-600 blur-xl"
        />
      </div>

      {/* CONTENT */}
      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl
              bg-white/15 backdrop-blur-md
              border border-white/30
              flex items-center justify-center
              shadow-lg shadow-purple-900/40"
            >
              <FileImage className="w-5 h-5 text-white" />
            </div>

            <div className="text-white leading-tight">
              <h1 className="text-sm md:text-lg font-semibold">
                Government Photo Editor
              </h1>
              <p className="text-[11px] text-white/70">
                Free · No Upload · Offline
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-5 text-sm text-white/80">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="relative hover:text-white transition
                  after:absolute after:-bottom-1 after:left-0
                  after:h-[2px] after:w-0 after:bg-white/80
                  after:transition-all hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* TRUST */}
          <div className="hidden md:flex gap-2">
            <Badge icon={Shield} label="Private" />
            <Badge icon={Zap} label="Fast" />
            <Badge icon={Globe} label="No Upload" />
          </div>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg
              bg-white/15 border border-white/25 text-white"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-4 rounded-xl
                bg-white/10 backdrop-blur
                border border-white/20 overflow-hidden"
            >
              {navLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-white/90
                    hover:bg-white/10"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
