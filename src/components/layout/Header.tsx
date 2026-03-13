import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const toolsLinks = [
  { label: "Compress Image", href: "/compress-image" },
  { label: "JPEG to JPG", href: "/jpeg-to-jpg" },
  { label: "JPG to PNG", href: "/jpg-to-png" },
  { label: "Resize to 20KB", href: "/resize-photo-20kb" },
  { label: "Passport Photo", href: "/passport-photo-editor" },
  { label: "SSC Photo", href: "/ssc-photo-resizer" },
  { label: "UPSC Photo", href: "/upsc-photo-size" },
  { label: "IBPS Signature", href: "/signature-resize-ibps" },
  { label: "IELTS Photo", href: "/ielts-photo-size" },
  { label: "TOEFL Photo", href: "/toefl-photo-size" },
  { label: "SAT Photo", href: "/sat-photo-size" },
  { label: "PTE Photo", href: "/pte-photo-size" },
  { label: "GRE Photo", href: "/gre-photo-size" },
  { label: "GMAT Photo", href: "/gmat-photo-size" },
  { label: "PDF Size Reducer", href: "/pdf-size-reducer" },
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "JPG to PDF", href: "/jpg-to-pdf" },
  { label: "PDF to JPG", href: "/pdf-to-jpg" },
];

function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
      >
        Tools
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto py-1">
            {toolsLinks.map((t) => (
              <Link
                key={t.href}
                to={t.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      if (currentY > lastScrollY && currentY > 80) {
        setHidden(true);
        setMobileOpen(false);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Main bar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm"
              : "bg-white dark:bg-slate-950"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <img
                    src="/image-editing.png"
                    alt="Logo"
                    className="w-5 h-5 object-contain"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
                <div>
                  <span className="text-[15px] font-semibold text-slate-900 dark:text-white tracking-tight">
                    PhotoResizer
                  </span>
                  <span className="hidden sm:inline text-[11px] text-slate-400 dark:text-slate-500 ml-1.5 font-medium">
                    Pro
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-0.5">
                <ToolsDropdown />

                <Link
                  to="/more-tools"
                  className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
                >
                  Categories
                </Link>

                <a
                  href="https://www.usvisaphotoai.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
                >
                  US Visa AI
                  <span className="text-[10px] bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded-md font-semibold uppercase tracking-wide leading-none">
                    New
                  </span>
                </a>

                <Link
                  to="/blog"
                  className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
                >
                  Blog
                </Link>
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
                  title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? (
                    <Sun className="w-4.5 h-4.5" />
                  ) : (
                    <Moon className="w-4.5 h-4.5" />
                  )}
                </button>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-4 py-3">
              {/* Pages */}
              <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                {[
                  { label: "Categories", href: "/more-tools", internal: true },
                  { label: "Blog", href: "/blog", internal: true },
                  { label: "About", href: "/about", internal: true },
                  { label: "Contact", href: "/contact", internal: true },
                  { label: "FAQ", href: "/faq", internal: true },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://www.usvisaphotoai.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/30 rounded-lg transition-colors"
                >
                  US Visa AI
                  <span className="text-[10px] bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-200 px-1 py-0.5 rounded font-bold uppercase">
                    New
                  </span>
                </a>
              </div>

              {/* Tools grid */}
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                Tools
              </p>
              <div className="grid grid-cols-2 gap-1">
                {toolsLinks.map((t) => (
                  <Link
                    key={t.href}
                    to={t.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors truncate"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}