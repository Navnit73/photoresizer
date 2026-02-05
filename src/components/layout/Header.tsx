import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileImage,
  Shield,
  Zap,
  Globe,
  Menu,
  X,
  Moon,
  Sun,
  Monitor,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong text-white text-xs font-medium shadow-md"
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </motion.div>
  );
}

// Simplified main navigation - only key pages
const mainNavLinks = [
  { label: "Tools", href: "#", isDropdown: true },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

// Tools dropdown items
const toolsLinks = [
  { label: "Compress Image", href: "/compress-image" },
  { label: "JPEG to JPG", href: "/jpeg-to-jpg" },
  { label: "JPG to PNG", href: "/jpg-to-png" },
  { label: "Resize to 20KB", href: "/resize-photo-20kb" },
  { label: "Resize to 50KB", href: "/resize-photo-50kb" },
  { label: "Passport Photo", href: "/passport-photo-editor" },
  { label: "SSC Photo", href: "/ssc-photo-resizer" },
  { label: "UPSC Photo", href: "/upsc-photo-size" },
  { label: "IBPS Signature", href: "/signature-resize-ibps" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden backdrop-blur-md z-50 rounded-b-[2.5rem] shadow-2xl border-b border-white/10"
    >
      {/* Honeycomb Pattern Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="40" height="34" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <path d="M20 0L38.5 10.5L38.5 31.5L20 42L1.5 31.5L1.5 10.5z" fill="white" fillOpacity="0.03" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
            </pattern>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="30%" stopColor="white" stopOpacity="0.5" />
              <stop offset="60%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="fadeMask">
              <rect width="100%" height="100%" fill="url(#fadeGradient)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" mask="url(#fadeMask)" />
        </svg>
      </div>

      {/* Gradient Background - Always Dark/Vibrant for Contrast */}
      <div className="absolute inset-0 bg-[#0f172a] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-slate-900/90 to-slate-900/90" />

      {/* Animated Glow Effect */}
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative container px-4 py-4 md:py-5">
        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: LOGO + TITLE */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-11 h-11 rounded-2xl  flex items-center justify-center"
            >
              <img src="/image-editing.png" alt="Logo" className="w-14 h-14 object-contain" />
            </motion.div>

            <div className="text-white leading-tight">
              <h1 className="text-base md:text-xl font-bold tracking-tight gradient-text-light group-hover:scale-105 transition-transform">
                Photo Resizer Pro
              </h1>
              <p className="text-[11px] md:text-xs text-white/80 font-medium">
                Free · Secure · Instant
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV - Simplified */}
          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200 font-medium">
                  Tools
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-strong backdrop-blur-xl border-white/20 max-h-96 overflow-y-auto">
                {toolsLinks.map(({ label, href }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link to={href} className="cursor-pointer">
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200 font-medium"
            >
              About
            </Link>
            <Link
              to="/faq"
              className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200 font-medium"
            >
              FAQ
            </Link>
          </nav>

          {/* RIGHT: THEME + TRUST SIGNALS */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                >
                  <ThemeIcon className="w-5 h-5" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-strong backdrop-blur-xl border-white/20">
                <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
                  <Monitor className="w-4 h-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Trust Badges (Desktop) */}
            <div className="hidden xl:flex items-center gap-2">
              <Badge icon={Shield} label="Private" />
              <Badge icon={Zap} label="Fast" />
              <Badge icon={Globe} label="Offline" />
            </div>

            {/* MOBILE MENU BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2.5 rounded-xl glass-strong border border-white/30 shadow-lg"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden mt-4 rounded-2xl glass-strong border border-white/30 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col divide-y divide-white/10">
                {/* All Tools */}
                <div className="px-5 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Tools
                </div>
                {toolsLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setOpen(false)}
                    className="px-5 py-3 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-all font-medium active:bg-white/15"
                  >
                    {label}
                  </Link>
                ))}
                
                {/* Footer Links in Mobile */}
                {/* Footer Links in Mobile - REMOVED as per request */}
              </div>

              {/* MOBILE THEME + TRUST BADGES */}
              <div className="p-4 border-t border-white/10 space-y-3">
                <div className="flex gap-2">
                  {/* Badges REMOVED as per request */}
                </div>

                {/* Mobile Theme Selector */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      theme === 'light'
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Sun className="w-4 h-4 mx-auto mb-1" />
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      theme === 'dark'
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Moon className="w-4 h-4 mx-auto mb-1" />
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      theme === 'system'
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Monitor className="w-4 h-4 mx-auto mb-1" />
                    Auto
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </motion.header>
  );
}
