import { useState, useEffect, useRef } from "react";
import {
  Check,
  Download,
  Info,
  Printer,
  RefreshCw,
  Search,
  ShieldCheck,
  Upload,
  X,
  AlertTriangle,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  ImageIcon,
  ChevronDown,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchExternalCountries,
  processExternalPhoto,
  ExternalCountry,
  ExternalProcessResponse,
} from "@/utils/passportApi";
import { getLocalPrice } from "@/utils/pricing";

// ─── Types ───────────────────────────────────────────────────────────────────
type Stage = "idle" | "preview" | "processing" | "result";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const PROCESSING_STAGES = [
  { progress: 12, msg: "Connecting to secure AI node…" },
  { progress: 28, msg: "Uploading photo to secure server…" },
  { progress: 46, msg: "Detecting facial landmarks & eyes…" },
  { progress: 62, msg: "Aligning biometric angles…" },
  { progress: 78, msg: "Analysing background parameters…" },
  { progress: 90, msg: "Correcting lighting & generating print sheet…" },
];

const FALLBACK_COUNTRIES: ExternalCountry[] = [
  { country_code: "US", country_name: "United States", document_type: "passport", dimensions: "2×2 in (51×51 mm)" },
  { country_code: "IN", country_name: "India", document_type: "passport", dimensions: "2×2 in (51×51 mm)" },
  { country_code: "GB", country_name: "United Kingdom", document_type: "passport", dimensions: "35×45 mm" },
  { country_code: "CA", country_name: "Canada", document_type: "passport", dimensions: "50×70 mm" },
  { country_code: "AU", country_name: "Australia", document_type: "passport", dimensions: "35×45 mm" },
  { country_code: "EU", country_name: "Schengen Area", document_type: "visa", dimensions: "35×45 mm" },
  { country_code: "NP", country_name: "Nepal", document_type: "passport", dimensions: "35×45 mm" },
  { country_code: "CN", country_name: "China", document_type: "passport", dimensions: "33×48 mm" },
  { country_code: "DE", country_name: "Germany", document_type: "passport", dimensions: "35×45 mm" },
  { country_code: "FR", country_name: "France", document_type: "passport", dimensions: "35×45 mm" },
  { country_code: "JP", country_name: "Japan", document_type: "passport", dimensions: "35×45 mm" },
  { country_code: "AE", country_name: "UAE", document_type: "passport", dimensions: "40×60 mm" },
  { country_code: "SG", country_name: "Singapore", document_type: "passport", dimensions: "35×45 mm" },
  { country_code: "NZ", country_name: "New Zealand", document_type: "passport", dimensions: "35×45 mm" },
];

// ─── Metric Bar ───────────────────────────────────────────────────────────────
const MetricBar = ({
  label,
  value,
  standard,
  tooltip,
}: {
  label: string;
  value: number;
  standard: string;
  tooltip: string;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
        <span className="sr-only">{tooltip}</span>
      </span>
      <span className="text-sm font-bold text-card-foreground">{Math.round(value)}%</span>
    </div>
    <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-700"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
    <p className="text-[10px] text-muted-foreground/70">{standard}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export function PassportApiTool({ defaultCountryCode = "IN" }: { defaultCountryCode?: string }) {
  // Block DevTools
  useEffect(() => {
    console.log("[PassportApiTool] Mounted, priceInfo:", getLocalPrice());
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) ||
        (e.ctrlKey && ["U", "u"].includes(e.key))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [countries, setCountries] = useState<ExternalCountry[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountryCode);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [processingMsg, setProcessingMsg] = useState("");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [result, setResult] = useState<ExternalProcessResponse | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showPriceConfirm, setShowPriceConfirm] = useState(false);
  const [waitCountdown, setWaitCountdown] = useState<number | null>(null);
  const [fakeUsersCount, setFakeUsersCount] = useState(47);
  const [fakeUsersChange, setFakeUsersChange] = useState<string>("");
  const [priceInfo, setPriceInfo] = useState(getLocalPrice);
  const processingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waitIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fakeUsersIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const paid = localStorage.getItem("payment_success");
    setIsPaid(!!paid);
  }, []);

  const clearWaitInterval = () => {
    if (waitIntervalRef.current) {
      clearInterval(waitIntervalRef.current);
      waitIntervalRef.current = null;
    }
    setWaitCountdown(null);
  };

  // Fake live users counter that gradually increases/decreases
  useEffect(() => {
    const simulateUsers = () => {
      const change = Math.floor(Math.random() * 17) - 5;
      setFakeUsersCount((prev) => Math.max(12, prev + change));
      if (change > 0) {
        setFakeUsersChange(`+${change} in the last few minutes`);
      } else if (change < 0) {
        setFakeUsersChange(`${change} in the last few minutes`);
      } else {
        setFakeUsersChange("Active now");
      }
    };

    const initTimeout = setTimeout(() => {
      simulateUsers();
      const scheduleNext = () => {
        const delay = Math.floor(Math.random() * 17000) + 8000;
        fakeUsersIntervalRef.current = setTimeout(() => {
          simulateUsers();
          scheduleNext();
        }, delay);
      };
      scheduleNext();
    }, 3000);

    return () => {
      clearTimeout(initTimeout);
      if (fakeUsersIntervalRef.current) {
        clearTimeout(fakeUsersIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoadingCountries(true);
      try {
        const list = await fetchExternalCountries();
        const sorted = list && list.length > 0
          ? [...list].sort((a, b) => a.country_name.localeCompare(b.country_name))
          : FALLBACK_COUNTRIES;
        setCountries(sorted);
        const resolvedCode = sorted.find((c) => c.country_code === defaultCountryCode) ? defaultCountryCode : sorted[0].country_code;
        setSelectedCountryCode(resolvedCode);
        const active = sorted.find((c) => c.country_code === resolvedCode);
        if (active) {
          setSearchQuery(active.country_name);
        }
      } catch {
        setCountries(FALLBACK_COUNTRIES);
        setSelectedCountryCode(defaultCountryCode);
        const active = FALLBACK_COUNTRIES.find((c) => c.country_code === defaultCountryCode);
        if (active) {
          setSearchQuery(active.country_name);
        }
        toast.error("Could not load country list — using default countries.");
      } finally {
        setIsLoadingCountries(false);
      }
    })();
  }, [defaultCountryCode]);

  const activeCountry = countries.find((c) => c.country_code === selectedCountryCode);

  const filteredCountries = countries.filter((c) =>
    c.country_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.country-dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const validateAndSetFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload PNG, JPG, JPEG, or WebP.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10 MB.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setStage("preview");
    toast.success(`"${file.name}" loaded successfully.`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };

  // Cleanup function to clear the processing interval
  const clearProcessingInterval = () => {
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
      processingIntervalRef.current = null;
    }
  };

  const handleProcessImage = async () => {
    if (!selectedFile) { toast.error("Please upload a photo first."); return; }
    clearProcessingInterval();
    setStage("processing");
    setProcessingProgress(5);
    setProcessingMsg("Initialising AI pipeline…");
    let idx = 0;
    processingIntervalRef.current = setInterval(() => {
      if (idx < PROCESSING_STAGES.length) {
        const s = PROCESSING_STAGES[idx++];
        setProcessingProgress(s.progress);
        setProcessingMsg(s.msg);
      }
    }, 1400);
    try {
      const response = await processExternalPhoto(selectedFile, selectedCountryCode);
      clearProcessingInterval();
      setProcessingProgress(100);
      setProcessingMsg("Complete!");
      setTimeout(() => {
        setResult(response);
        setStage("result");
        toast.success("AI processing complete — photo is government-compliant!");
      }, 400);
    } catch (error: any) {
      clearProcessingInterval();
      setStage("preview");
      toast.error(error?.message || "Processing failed. Ensure your face is fully visible and well-lit.");
    }
  };

  useEffect(() => {
    return () => {
      clearProcessingInterval();
      clearWaitInterval();
    };
  }, []);

  const handleReset = () => {
    clearWaitInterval();
    setShowDownloadOptions(false);
    setShowPriceConfirm(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setProcessingProgress(0);
    setProcessingMsg("");
    setStage("idle");
  };

  const handleDownload = async (url: string, filename: string) => {
    setIsDownloading(true);
    try {
      const blob = await fetch(url).then((r) => r.blob());
      const localUrl = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), { href: localUrl, download: filename });
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(localUrl);
      toast.success("Download started!");
    } catch {
      window.open(url, "_blank");
      toast.info("Image opened in new tab. Long-press or right-click to save.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPrintSheet = () => {
    if (result?.print_sheet_url) {
      handleDownload(result.print_sheet_url, `${selectedCountryCode}_print_sheet_4x6.jpg`);
    }
  };

  const startFreeDownload = (url: string, filename: string) => {
    clearWaitInterval();
    setWaitCountdown(120);
    waitIntervalRef.current = setInterval(() => {
      setWaitCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearWaitInterval();
          handleDownload(url, filename);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelFreeDownload = () => {
    clearWaitInterval();
    toast.info("Free download cancelled. You can still pay for instant access.");
  };

  return (
    <div className="min-h-screen  font-sans">

      <div className="max-w-2xl mx-auto px-1 py-6 space-y-4 pb-8">

        {/* ── Hero Section ── */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-clean-sm">
          <div className="flex items-start gap-4">

            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-card-foreground leading-tight">
                Biometric Passport & Visa Photo Maker
              </h1>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Government-compliant photos for 150+ countries — background removed, auto-cropped, print-ready.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">
                    {fakeUsersCount} people
                  </span>
                </div>
                {fakeUsersChange && (
                  <span className="text-[10px] text-muted-foreground">· {fakeUsersChange}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3 ">
                {["Background Removed", "Auto-Crop", "Print-Ready"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-900">
                    <Check className="w-2.5 h-2.5" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Country Selector ── */}
        <div className="bg-card rounded-2xl border border-border p-4 shadow-clean-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Select Country</span>
            </div>
            {activeCountry && (
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                {activeCountry.country_code}
              </span>
            )}
          </div>
          {isLoadingCountries ? (
            <div className="h-12 bg-muted rounded-xl animate-pulse" />
          ) : (
            <div className="relative">
              <div
                className="flex items-center gap-2 w-full bg-muted/50 dark:bg-muted border border-input rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all cursor-text"
                onClick={() => document.getElementById("country-search-input")?.focus()}
              >
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  id="country-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && filteredCountries.length > 0) {
                      const match = filteredCountries[0];
                      setSelectedCountryCode(match.country_code);
                      setSearchQuery(match.country_name);
                      setShowDropdown(false);
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setHighlightedIndex(0);
                    }
                  }}
                  placeholder="Search 150+ countries..."
                  className="flex-1 bg-transparent text-sm font-medium text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery("");
                      setShowDropdown(false);
                    }}
                    className="text-muted-foreground hover:text-card-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              {/* Custom Dropdown */}
              {showDropdown && filteredCountries.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-clean-lg max-h-64 overflow-y-auto country-dropdown-container">
                  {filteredCountries.slice(0, 50).map((c, index) => (
                    <button
                      key={c.country_code}
                      onClick={() => {
                        setSelectedCountryCode(c.country_code);
                        setSearchQuery(c.country_name);
                        setShowDropdown(false);
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center justify-between ${
                        highlightedIndex === index ? "bg-muted" : ""
                      } ${
                        selectedCountryCode === c.country_code
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-card-foreground"
                      }`}
                    >
                      <span>{c.country_name}</span>
                      <span className="text-xs text-muted-foreground">{c.country_code}</span>
                    </button>
                  ))}
                  {filteredCountries.length > 50 && (
                    <div className="px-4 py-2 text-xs text-muted-foreground text-center border-t border-border">
                      Showing 50 of {filteredCountries.length} results
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {activeCountry && (
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 px-2.5 py-1 rounded-lg capitalize">
                🎯 {activeCountry.document_type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 px-2.5 py-1 rounded-lg">
                📏 {activeCountry.dimensions}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-1">
                <Info className="w-3 h-3" /> DPI auto-configured
              </span>
            </div>
          )}
        </div>

        {/* ── Stage: Idle — Upload Zone ── */}
        {stage === "idle" && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`bg-card rounded-2xl border-2 border-dashed shadow-clean-sm cursor-pointer transition-all duration-200 p-8 flex flex-col items-center text-center select-none ${
              isDragOver
                ? "border-primary bg-accent"
                : "border-input hover:border-primary/50 hover:bg-accent"
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200 ${isDragOver ? "bg-primary/10" : "bg-muted"}`}>
              <ImageIcon className={`w-7 h-7 transition-colors duration-200 ${isDragOver ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <p className="text-base font-bold text-card-foreground">Drop your portrait here</p>
            <p className="text-sm text-muted-foreground mt-1">
              or <span className="text-primary font-semibold">browse files</span>
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">PNG · JPG · WebP — max 10 MB</p>
          </div>
        )}

        {/* Hidden file input - always mounted so ref works */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* ── Stage: Preview ── */}
        {stage === "preview" && selectedFile && previewUrl && (
          <>
            {/* Photo preview card */}
            <div className="bg-card rounded-2xl border border-border shadow-clean-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Photo</span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                >
                  <Upload className="w-3 h-3" /> Change
                </button>
              </div>
              <div className="flex justify-center bg-muted p-6">
                <img
                  src={previewUrl}
                  alt="Uploaded portrait"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                  style={{ WebkitTouchCallout: "none" }}
                  className="max-h-64 max-w-full object-contain rounded-xl shadow-md select-none pointer-events-none"
                />
              </div>
            </div>

           

           

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleProcessImage}
                className="flex-1 bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-bold rounded-2xl py-4 text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
              >
                <Zap className="w-4 h-4" />
                Process with AI
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-4 rounded-2xl border border-input text-muted-foreground text-sm font-semibold hover:bg-muted active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {/* ── Stage: Processing ── */}
        {stage === "processing" && (
          <div className="bg-card rounded-2xl border border-border shadow-clean-sm p-8 flex flex-col items-center text-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Processing…</h3>
              <p className="text-sm text-primary font-medium mt-1 min-h-[20px]">{processingMsg}</p>
            </div>
            <div className="w-full space-y-2">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-muted-foreground font-semibold">
                <span>AI Analysis</span>
                <span>{processingProgress}%</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-[11px] text-muted-foreground">
              {["Facial Detection", "Background Removal", "Compliance Check"].map((s, i) => (
                <span key={s} className={`px-2.5 py-1 rounded-full border ${processingProgress > i * 30 + 10 ? "border-primary/30 bg-primary/10 text-primary font-semibold" : "border-input bg-muted"}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Stage: Result ── */}
        {stage === "result" && result && (
          <>
          

            {/* Photo Comparison - Preview & Original Side by Side */}
            <div className="bg-card rounded-2xl border border-border shadow-clean-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Photo Comparison</span>
                <span className="text-[10px] font-bold bg-green-500 text-white px-2.5 py-1 rounded-full">✓ COMPLIANT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preview Image - Full Size */}
                <div className="flex flex-col">
                  <div className="bg-muted rounded-xl overflow-hidden border border-border flex items-center justify-center p-1">
                    <img
                      src={result.preview_url}
                      alt="Processed Preview"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      draggable={false}
                      style={{ WebkitTouchCallout: "none" }}
                      className="w-full h-auto object-contain select-none pointer-events-none rounded-lg"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground text-center mt-2">Processed</span>
                </div>

                {/* Original Image - Full Size */}
                <div className="flex flex-col">
                  <div className="bg-muted rounded-xl overflow-hidden border border-border flex items-center justify-center p-4">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Original Upload"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        draggable={false}
                        style={{ WebkitTouchCallout: "none" }}
                        className="w-full h-auto object-contain select-none pointer-events-none rounded-lg"
                      />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground text-center mt-2">Original</span>
                </div>
              </div>

              {showDownloadOptions && !isPaid ? (
                <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border">
                  <p className="text-sm font-semibold text-card-foreground mb-3">Choose download option:</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        if (result) {
                          startFreeDownload(result.image_url, `${selectedCountryCode}_passport_photo.jpg`);
                          setShowDownloadOptions(false);
                        }
                      }}
                      className="w-full flex items-center justify-between bg-card hover:bg-muted border border-border rounded-xl px-4 py-3 text-left transition-all"
                    >
                      <div>
                        <p className="text-sm font-semibold text-card-foreground">Wait 2 minutes</p>
                        <p className="text-[11px] text-muted-foreground">Download for free</p>
                      </div>
                      <span className="text-xs text-muted-foreground font-semibold">FREE</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDownloadOptions(false);
                        setShowPriceConfirm(true);
                      }}
                      className="w-full flex items-center justify-between bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl px-4 py-3 text-left transition-all"
                    >
                      <div>
                        <p className="text-sm font-semibold text-primary">Pay to download</p>
                        <p className="text-[11px] text-muted-foreground">Instant access • One-time payment</p>
                      </div>
                      <span className="text-sm text-primary font-bold">{priceInfo.formatted}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowDownloadOptions(false)}
                    className="w-full mt-3 text-xs text-muted-foreground hover:text-card-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : showPriceConfirm ? (
                <div className="mt-4 p-4 bg-primary/5 border border-primary/30 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-card-foreground">Confirm Payment</span>
                    <button onClick={() => setShowPriceConfirm(false)} className="text-muted-foreground hover:text-card-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">You will be charged <span className="font-bold text-primary">{priceInfo.formatted}</span> via Razorpay</p>
                  <button
                    onClick={() => {
                      console.log("[PassportApiTool] Pay clicked, priceInfo:", priceInfo);
                      import("@/lib/razorpay").then(({ startPayment }) => {
                        startPayment({
                          email: "navnitrai5389@gmail.com",
                          name: "Customer",
                          onSuccess: () => setIsPaid(true),
                        });
                      });
                      setShowPriceConfirm(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    Pay {priceInfo.formatted}
                  </button>
                </div>
              ) : waitCountdown !== null ? (
                <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border text-center">
                  <p className="text-sm font-semibold text-card-foreground mb-1">Free download in progress...</p>
                  <p className="text-2xl font-bold text-primary">{waitCountdown}s</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Your download will start automatically</p>
                  <button
                    onClick={cancelFreeDownload}
                    className="mt-3 text-xs text-muted-foreground hover:text-card-foreground underline transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!isPaid) {
                      setShowDownloadOptions(true);
                    } else {
                      handleDownload(result.image_url, `${selectedCountryCode}_passport_photo.jpg`);
                    }
                  }}
                  disabled={isDownloading}
                  className="w-full mt-5 bg-primary hover:bg-primary/90 disabled:opacity-50 active:scale-[0.98] text-primary-foreground font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? "Preparing..." : isPaid ? "Download Photo" : `Download Photo`}
                </button>
              )}
              {!isPaid && (
                <p className="text-[11px] text-muted-foreground text-center mt-1">
                  HD Photo + 4×6 Print Sheet • One-time payment
                </p>
              )}
            </div>

         

            {/* Print sheet download section */}
            {result.print_sheet_url && !isPaid && waitCountdown === null ? (
                <button
                  onClick={() => {
                    if (result?.print_sheet_url) {
                      startFreeDownload(result.print_sheet_url, `${selectedCountryCode}_print_sheet_4x6.jpg`);
                    }
                  }}
                  disabled={isDownloading}
                  className="w-full mt-4 bg-green-500/80 hover:bg-green-600 disabled:opacity-50 active:scale-[0.98] text-white font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  {isDownloading ? "Preparing..." : "Download 4×6 Print Sheet (Free - 2 min wait)"}
                </button>
              ) : result.print_sheet_url && !isPaid && waitCountdown === null && !showPriceConfirm ? (
                <button
                  onClick={() => setShowPriceConfirm(true)}
                  disabled={isDownloading}
                  className="w-full mt-4 bg-green-500/80 hover:bg-green-600 disabled:opacity-50 active:scale-[0.98] text-white font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  {isDownloading ? "Preparing..." : `Unlock Print Sheet · ${priceInfo.formatted}`}
                </button>
              ) : null}

        

            <button
              onClick={handleReset}
              className="w-full bg-card hover:bg-muted active:scale-[0.98] border border-input text-muted-foreground font-semibold rounded-2xl py-4 text-sm flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Start Over / Upload Another
            </button>
          </>
        )}
      </div>
    </div>
  );
}