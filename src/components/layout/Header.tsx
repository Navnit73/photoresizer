import { useState } from "react";
import { Link } from "react-router-dom";
import AdUnit from "@/components/shared/AdUnit";
import {
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
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------------- Badge ---------------- */
function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

const toolsLinks = [
  { label: "Compress Image", href: "/compress-image" },
  { label: "JPEG to JPG", href: "/jpeg-to-jpg" },
  { label: "JPG to PNG", href: "/jpg-to-png" },
  { label: "Resize to 20KB", href: "/resize-photo-20kb" },
  // { label: "Resize to 50KB", href: "/resize-photo-50kb" },
  { label: "Passport Photo", href: "/passport-photo-editor" },
  { label: "SSC Photo", href: "/ssc-photo-resizer" },
  { label: "UPSC Photo", href: "/upsc-photo-size" },
  { label: "IBPS Signature", href: "/signature-resize-ibps" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const ThemeIcon =
    theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <header
      className="relative z-50 border-b border-white/10 animate-[fadeInDown_0.35s_ease-out]"
    >
      {/* 🔒 FIXED DARK HEADER */}
      <div className="absolute inset-0 bg-[#0f172a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-slate-900/90 to-slate-900/90" />

      <div className="relative container px-4 py-4">
        {/* ================= TOP ROW ================= */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/image-editing.png"
              alt="Logo"
              className="w-11 h-11 object-contain"
            />
            <div className="text-white leading-tight">
              <h1 className="text-lg font-bold">Photo Resizer Pro</h1>
              <p className="text-xs text-white/70">
                Free · Secure · Instant
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden lg:flex items-center gap-5 h-10">
            {/* Tools */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="header-nav-btn ">
                  Tools 
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-96 overflow-y-auto">
                {toolsLinks.map((t) => (
                  <DropdownMenuItem key={t.href} asChild>
                    <Link to={t.href}>{t.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/more-tools" className="header-nav-btn">
              More Tools
            </Link>

            <Link to="/blog" className="header-nav-btn">
              Blog
            </Link> 

            <Link to="/about" className="header-nav-btn">
              About
            </Link>
            <Link to="/faq" className="header-nav-btn">
              FAQ
            </Link>
          </nav>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center gap-2">
            {/* Theme */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  <ThemeIcon className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="w-4 h-4 mr-2" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="w-4 h-4 mr-2" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="w-4 h-4 mr-2" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Trust */}
            <div className="hidden xl:flex gap-2">
              <Badge icon={Shield} label="Private" />
              <Badge icon={Zap} label="Fast" />
              <Badge icon={Globe} label="Offline" />
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/20 text-white"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {open && (
          <nav
            className="
              lg:hidden mt-4 rounded-xl overflow-hidden shadow-xl
              bg-white text-slate-900 animate-[mobileMenuSlideDown_0.3s_ease-out]
            "
          >
            <div className="divide-y divide-slate-200">
              <div className="px-5 py-2 text-xs font-semibold uppercase text-slate-400">
                Tools
              </div>

              {toolsLinks.map((t) => (
                <Link
                  key={t.href}
                  to={t.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-sm hover:bg-slate-100"
                >
                  {t.label}
                </Link>
              ))}
              
              <div className="border-t border-slate-100 my-2 pt-2">
                <div className="px-5 py-2 text-xs font-semibold uppercase text-slate-400">
                  Pages
                </div>
                <Link
                  to="/more-tools"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-sm hover:bg-slate-100"
                >
                  More Tools
                </Link>
                <Link
                  to="/blog"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-sm hover:bg-slate-100"
                >
                  Blog
                </Link>
                  <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-sm hover:bg-slate-100"
                >
                  About
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-sm hover:bg-slate-100"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
      
      {/* AdSense Unit */}
      {/* <div className="container px-4 pb-2">
        <AdUnit className="min-h-[90px]" />
      </div> */}
    </header>
  );
}
