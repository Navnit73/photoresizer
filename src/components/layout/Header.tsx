import { useState, useEffect, useRef, startTransition } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import AdUnit from "@/components/shared/AdUnit";

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
      >
        Tools
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto py-1">
            {toolsLinks.map((t) => (
              <Link
                key={t.href}
                to={t.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
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
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const currentY = window.scrollY;
        setScrolled(currentY > 10);
        if (currentY > lastScrollY.current && currentY > 80) {
          setHidden(true);
          setMobileOpen(false);
        } else {
          setHidden(false);
        }
        lastScrollY.current = currentY;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`transition-colors duration-200 ${
            scrolled
              ? "bg-card border-b border-border shadow-sm"
              : "bg-card"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <img
                    src="/image-editing.png"
                    alt="Logo"
                    className="w-5 h-5 object-contain brightness-0 invert"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <span className="text-[15px] font-semibold text-foreground tracking-tight">
                  PhotoResizer
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                <ToolsDropdown />
                <Link
                  to="/more-tools"
                  className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
                <a
                  href="https://www.usvisaphotoai.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  US Visa AI
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold uppercase">
                    New
                  </span>
                </a>
                <Link
                  to="/blog"
                  className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => startTransition(() => setTheme(theme === "dark" ? "light" : "dark"))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground/50 hover:text-foreground hover:bg-muted transition-colors"
                  title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>
                <button
                  onClick={() => startTransition(() => setMobileOpen(!mobileOpen))}
                  className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-foreground/50 hover:text-foreground hover:bg-muted transition-colors"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-b border-border">
            <div className="max-w-6xl mx-auto px-4 py-3">
              <div className="mb-3 pb-3 border-b border-border flex flex-wrap gap-1">
                {[
                  { label: "Categories", href: "/more-tools" },
                  { label: "Blog", href: "/blog" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "FAQ", href: "/faq" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground bg-muted rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://www.usvisaphotoai.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 rounded-md transition-colors"
                >
                  US Visa AI
                  <span className="text-[10px] bg-primary/10 text-primary px-1 py-0.5 rounded font-bold uppercase">New</span>
                </a>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2 px-1">Tools</p>
              <div className="grid grid-cols-2 gap-0.5">
                {toolsLinks.map((t) => (
                  <Link
                    key={t.href}
                    to={t.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition-colors truncate"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

     
  
    </>
  );
}