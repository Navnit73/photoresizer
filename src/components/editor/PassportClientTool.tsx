import { useState, useEffect, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { removeBackground, Config } from "@imgly/background-removal";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Eraser,
  Globe,
  ImageIcon,
  Info,
  Loader2,
  Printer,
  RefreshCw,
  Search,
  ShieldCheck,
  Upload,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { toast } from "sonner";
import {
  PASSPORT_SPECS,
  DEFAULT_SPEC,
  getSpecByCode,
  type PassportSpec,
} from "@/data/passportSpecs";
import { getLocalPrice } from "@/utils/pricing";



// ─── Component ───────────────────────────────────────────────────────────────
export function PassportClientTool({
  defaultCountryCode = "IN",
}: {
  defaultCountryCode?: string;
}) {
  // ── Country selection ───────────────────────────────────────────────────
  const [selectedCountryCode, setSelectedCountryCode] =
    useState(defaultCountryCode);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── File / Image state ──────────────────────────────────────────────────
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Cropper state ───────────────────────────────────────────────────────
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [completedCrop, setCompletedCrop] = useState<Area | null>(null);

  // Background removal state removed (now happens automatically on export)

  // ── Processing / Result state ───────────────────────────────────────────
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [printSheetUrl, setPrintSheetUrl] = useState<string | null>(null);

  // ── Payment state ───────────────────────────────────────────────────────
  const [isPaid, setIsPaid] = useState(false);
  const [showPriceConfirm, setShowPriceConfirm] = useState(false);
  const [waitCountdown, setWaitCountdown] = useState<number | null>(null);
  const downloadSectionRef = useRef<HTMLDivElement>(null);
  const [priceInfo] = useState(getLocalPrice);
  const waitIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Derived ─────────────────────────────────────────────────────────────
  const spec = getSpecByCode(selectedCountryCode);
  const activeCountry = PASSPORT_SPECS.find(
    (c) => c.countryCode === selectedCountryCode,
  );
  const countries = [...PASSPORT_SPECS].sort((a, b) =>
    a.countryName.localeCompare(b.countryName),
  );
  const filteredCountries = countries.filter(
    (c) =>
      c.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.countryCode.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ── Stage logic ─────────────────────────────────────────────────────────
  // idle → cropping → result
  const stage = resultUrl
    ? "result"
    : previewUrl
      ? "cropping"
      : "idle";

  // ── Initial search query ────────────────────────────────────────────────
  useEffect(() => {
    const match =
      PASSPORT_SPECS.find((c) => c.countryCode === defaultCountryCode) ??
      DEFAULT_SPEC;
    setSearchQuery(match.countryName);
  }, [defaultCountryCode]);

  // ── Check existing payment ──────────────────────────────────────────────
  useEffect(() => {
    const paid = localStorage.getItem("payment_success");
    setIsPaid(!!paid);
  }, []);

  // ── Close dropdown on outside click ─────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ── Memory cleanup ──────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      if (printSheetUrl) URL.revokeObjectURL(printSheetUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── File handling ───────────────────────────────────────────────────────
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
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    if (printSheetUrl) URL.revokeObjectURL(printSheetUrl);

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setResultFile(null);
    setPrintSheetUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCompletedCrop(null);
    toast.success(`"${file.name}" loaded successfully.`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };



  // ── Crop completed callback ─────────────────────────────────────────────
  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCompletedCrop(croppedAreaPixels);
    },
    [],
  );

  // ── Canvas crop + compress ──────────────────────────────────────────────
  async function getCroppedImg(
    src: string,
    pixelCrop: Area,
    targetSpec: PassportSpec,
  ): Promise<File | null> {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2d context");

    canvas.width = targetSpec.widthPx;
    canvas.height = targetSpec.heightPx;
    ctx.imageSmoothingQuality = "high";

    // Always fill with the country's required background color
    ctx.fillStyle = targetSpec.bgColor || "#ffffff";
    ctx.fillRect(0, 0, targetSpec.widthPx, targetSpec.heightPx);

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      targetSpec.widthPx,
      targetSpec.heightPx,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          try {
            const file = new File([blob], "passport_photo.jpg", {
              type: "image/jpeg",
            });
            const compressed = await imageCompression(file, {
              maxSizeMB: targetSpec.maxSizeKB / 1024,
              useWebWorker: true,
              fileType: "image/jpeg",
            });
            resolve(compressed);
          } catch (error) {
            reject(error);
          }
        },
        "image/jpeg",
        1.0,
      );
    });
  }

  // ── Generate 4×6 print sheet ────────────────────────────────────────────
  async function generatePrintSheet(
    photoUrl: string,
    targetSpec: PassportSpec,
  ): Promise<string> {
    const image = new Image();
    image.src = photoUrl;
    await new Promise((resolve) => (image.onload = resolve));

    // 4×6 inch at 300 DPI = 1200×1800 pixels
    const SHEET_W = 1200;
    const SHEET_H = 1800;
    const canvas = document.createElement("canvas");
    canvas.width = SHEET_W;
    canvas.height = SHEET_H;
    const ctx = canvas.getContext("2d")!;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, SHEET_W, SHEET_H);

    // Calculate photo dimensions at 300 DPI
    const photoW = Math.round((targetSpec.widthMM / 25.4) * 300);
    const photoH = Math.round((targetSpec.heightMM / 25.4) * 300);
    const gapX = 20;
    const gapY = 20;

    const cols = Math.floor((SHEET_W - gapX) / (photoW + gapX));
    const rows = Math.floor((SHEET_H - gapY) / (photoH + gapY));

    const totalW = cols * photoW + (cols - 1) * gapX;
    const totalH = rows * photoH + (rows - 1) * gapY;
    const startX = (SHEET_W - totalW) / 2;
    const startY = (SHEET_H - totalH) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * (photoW + gapX);
        const y = startY + r * (photoH + gapY);
        ctx.drawImage(image, x, y, photoW, photoH);

        // Thin crop guide
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, photoW, photoH);
      }
    }

    return canvas.toDataURL("image/jpeg", 0.95);
  }

  // ── Export handler ──────────────────────────────────────────────────────
  const handleExport = async () => {
    if (!completedCrop || !previewUrl) return;

    setIsProcessing(true);
    let tempBgRemovedSrc: string | null = null;
    
    try {
      let activeSrc = previewUrl;
      
      // Automatic Background Removal during export
      try {
        const config: Config = {
          publicPath:
            "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/",
          model: "isnet_fp16",
          proxyToWorker: false,
          output: { format: "image/png", quality: 1.0 },
        };
        const blob = await removeBackground(previewUrl, config);
        tempBgRemovedSrc = URL.createObjectURL(blob);
        activeSrc = tempBgRemovedSrc;
      } catch (err) {
        console.error("Background removal failed:", err);
        toast.error("Background removal failed, proceeding with original photo.");
      }

      const file = await getCroppedImg(activeSrc, completedCrop, spec);
      if (file) {
        const url = URL.createObjectURL(file);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(url);
        setResultFile(file);

        // Generate print sheet
        try {
          const sheetDataUrl = await generatePrintSheet(url, spec);
          if (printSheetUrl) URL.revokeObjectURL(printSheetUrl);
          setPrintSheetUrl(sheetDataUrl);
        } catch (e) {
          console.warn("Print sheet generation failed:", e);
        }

        toast.success("Photo processed successfully — ready to download!");
      }
    } catch (e) {
      console.error("Failed to process image:", e);
      toast.error("Failed to process image. Please try again.");
    } finally {
      if (tempBgRemovedSrc) URL.revokeObjectURL(tempBgRemovedSrc);
      setIsProcessing(false);
    }
  };

  // ── Download helpers ────────────────────────────────────────────────────
  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Download started!");
  };

  // ── Free download with wait timer ───────────────────────────────────────
  const clearWaitInterval = () => {
    if (waitIntervalRef.current) {
      clearInterval(waitIntervalRef.current);
      waitIntervalRef.current = null;
    }
    setWaitCountdown(null);
  };

  const startFreeDownload = (photoUrl: string, photoName: string, sheetUrl: string | null, sheetName: string) => {
    clearWaitInterval();
    setWaitCountdown(180);
    waitIntervalRef.current = setInterval(() => {
      setWaitCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearWaitInterval();
          handleDownload(photoUrl, photoName);
          if (sheetUrl) {
            setTimeout(() => handleDownload(sheetUrl, sheetName), 500);
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelFreeDownload = () => {
    clearWaitInterval();
    toast.info(
      "Free download cancelled. You can still pay for instant access.",
    );
  };

  // ── Reset ───────────────────────────────────────────────────────────────
  const handleReset = () => {
    clearWaitInterval();
    setShowPriceConfirm(false);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    // printSheetUrl is a data URL, no need to revoke

    setSelectedFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setResultFile(null);
    setPrintSheetUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCompletedCrop(null);
    setIsProcessing(false);
  };

  // ── Active image source for the cropper ─────────────────────────────────
  const activeImageSrc = previewUrl;

  // ─────────────────────────────────────────────────────────────────────────
  // ── RENDER ──────────────────────────────────────────────────────────────
  const downloadSection = (
    <div ref={downloadSectionRef} className="w-full flex flex-col gap-2">
      {/* Download / Payment flow */}
      {showPriceConfirm && !isPaid ? (
        <div className="p-4 bg-primary/5 border border-primary/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-card-foreground">
              Confirm Payment
            </span>
            <button
              onClick={() => setShowPriceConfirm(false)}
              className="text-muted-foreground hover:text-card-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            You will be charged{" "}
            <span className="font-bold text-primary">
              {priceInfo.formatted}
            </span>{" "}
            via Razorpay
          </p>
          <button
            onClick={() => {
              import("@/lib/razorpay").then(({ startPayment }) => {
                startPayment({
                  onSuccess: () => {
                    setIsPaid(true);
                    clearWaitInterval();
                    if (resultUrl) handleDownload(resultUrl, `${selectedCountryCode.toLowerCase()}_passport_photo.jpg`);
                    if (printSheetUrl) setTimeout(() => handleDownload(printSheetUrl, `${selectedCountryCode.toLowerCase()}_print_sheet_4x6.jpg`), 500);
                  },
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
      ) : waitCountdown !== null && !isPaid ? (
        <div className="p-4 bg-muted/50 rounded-xl border border-border text-center">
          <p className="text-sm font-semibold text-card-foreground mb-1">
            Free download in progress...
          </p>
          <p className="text-2xl font-bold text-red-600">
            {waitCountdown}s
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Your download will start automatically
          </p>
          <button
            onClick={cancelFreeDownload}
            className="mt-3 text-xs text-muted-foreground hover:text-card-foreground underline transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowPriceConfirm(true)}
            className="w-full mt-2 flex items-center justify-between bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl px-4 py-3 text-left transition-all"
          >
            <div>
              <p className="text-sm font-semibold text-primary">
                Pay for instant download
              </p>
              <p className="text-[11px] text-muted-foreground">
                Instant access • One-time payment
              </p>
            </div>
            <span className="text-sm text-primary font-bold">
              {priceInfo.formatted}
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            if (!isPaid) {
              if (resultUrl) {
                startFreeDownload(
                  resultUrl,
                  `${selectedCountryCode.toLowerCase()}_passport_photo.jpg`,
                  printSheetUrl,
                  `${selectedCountryCode.toLowerCase()}_print_sheet_4x6.jpg`
                );
              }
            } else {
              if (resultUrl) handleDownload(resultUrl, `${selectedCountryCode.toLowerCase()}_passport_photo.jpg`);
              if (printSheetUrl) setTimeout(() => handleDownload(printSheetUrl, `${selectedCountryCode.toLowerCase()}_print_sheet_4x6.jpg`), 500);
            }
          }}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/20"
        >
          <Download className="w-4 h-4" />
          {isPaid ? "Download HD Photo & Print Sheet" : "Download Photo & Print Sheet"}
        </button>
      )}

      {!isPaid && waitCountdown === null && !showPriceConfirm && (
        <p className="text-[11px] text-muted-foreground text-center mt-1">
          HD Photo + 4×6 Print Sheet
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen font-sans">
      {/* Full-width shell — no max-width cap, minimal side padding so content runs edge to edge */}
      <div className="w-full px-3 sm:px-5 lg:px-8 py-5 lg:py-7 pb-28 lg:pb-12">
        {/* Single stacked column for every screen size: PC gets the same flow as mobile, just wider */}
        <div className="flex flex-col gap-5 lg:gap-6 w-full">

          {/* ── Country Selector ── */}
          <div className="bg-card rounded-2xl border border-border p-4 lg:p-5 shadow-clean-sm w-full">
            <div className="w-full lg:max-w-md mx-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Select Country
                  </span>
                </div>
                {activeCountry && (
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {activeCountry.countryCode}
                  </span>
                )}
              </div>

              <div className="relative w-full" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 w-full bg-muted/50 dark:bg-muted border border-input rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all cursor-text"
                onClick={() =>
                  document.getElementById("country-search-input-client")?.focus()
                }
              >
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  id="country-search-input-client"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && filteredCountries.length > 0) {
                      const match =
                        highlightedIndex >= 0
                          ? filteredCountries[highlightedIndex]
                          : filteredCountries[0];
                      setSelectedCountryCode(match.countryCode);
                      setSearchQuery(match.countryName);
                      setShowDropdown(false);
                      setHighlightedIndex(-1);
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setHighlightedIndex((i) =>
                        Math.min(i + 1, filteredCountries.length - 1),
                      );
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setHighlightedIndex((i) => Math.max(i - 1, 0));
                    }
                    if (e.key === "Escape") {
                      setShowDropdown(false);
                    }
                  }}
                  placeholder="Search countries..."
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

              {showDropdown && filteredCountries.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-clean-lg max-h-64 overflow-y-auto">
                  {filteredCountries.slice(0, 50).map((c, index) => (
                    <button
                      key={c.countryCode}
                      onClick={() => {
                        setSelectedCountryCode(c.countryCode);
                        setSearchQuery(c.countryName);
                        setShowDropdown(false);
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center justify-between ${
                        highlightedIndex === index ? "bg-muted" : ""
                      } ${
                        selectedCountryCode === c.countryCode
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-card-foreground"
                      }`}
                    >
                      <span>{c.countryName}</span>
                      <span className="text-xs text-muted-foreground">
                        {c.countryCode} · {c.dimensionsLabel}
                      </span>
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

            {activeCountry && (
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 px-2.5 py-1 rounded-lg capitalize">
                  🎯 {activeCountry.documentType}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 px-2.5 py-1 rounded-lg">
                  📏 {activeCountry.dimensionsLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-accent dark:bg-primary/10 border border-primary/20 dark:border-primary/30 px-2.5 py-1 rounded-lg">
                  📦 Max {activeCountry.maxSizeKB} KB
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-1">
                  <ShieldCheck className="w-3 h-3" /> Processed locally
                </span>
              </div>
            )}
            </div>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Stage: Idle — Upload Zone (full width on every breakpoint) */}
          {stage === "idle" && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`bg-card rounded-2xl border-2 border-dashed shadow-clean-sm cursor-pointer transition-all duration-200 w-full p-10 sm:p-14 lg:p-20 flex flex-col items-center justify-center text-center select-none ${
                isDragOver
                  ? "border-primary bg-accent"
                  : "border-input hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-200 ${isDragOver ? "bg-primary/10" : "bg-muted"}`}
              >
                <ImageIcon
                  className={`w-10 h-10 transition-colors duration-200 ${isDragOver ? "text-primary" : "text-muted-foreground"}`}
                />
              </div>
              <p className="text-xl font-bold text-card-foreground">
                Drop your portrait here
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                or{" "}
                <span className="text-primary font-semibold">browse files</span>
              </p>
              <p className="text-xs text-muted-foreground/60 mt-4">
                PNG · JPG · WebP — max 10 MB
              </p>
            </div>
          )}

          {/* Stage: Cropping */}
          {stage === "cropping" && activeImageSrc && (
            <>
              {/* Inject guide-bar CSS */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                .passport-crop-area::before {
                  content: '';
                  position: absolute;
                  top: 8%;
                  left: 5%;
                  right: 5%;
                  height: 3px;
                  background-color: #84cc16;
                  box-shadow: 0 0 4px rgba(0,0,0,0.4);
                  pointer-events: none;
                  z-index: 1;
                }
                .passport-crop-area::after {
                  content: '';
                  position: absolute;
                  top: 83%;
                  left: 5%;
                  right: 5%;
                  height: 3px;
                  background-color: #84cc16;
                  box-shadow: 0 0 4px rgba(0,0,0,0.4);
                  pointer-events: none;
                  z-index: 1;
                }
              `,
                }}
              />

              {/* Cropper workspace — full width bar, image itself stays a comfortable
                  max-width so it doesn't shrink to a tiny strip on ultra-wide screens */}
              <div className="bg-card rounded-2xl border border-border shadow-clean-sm overflow-hidden w-full">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Workspace
                  </span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Upload className="w-3 h-3" /> Change Photo
                  </button>
                </div>

                <div className="relative w-full mx-auto max-w-3xl h-[55vh] sm:h-[60vh] lg:h-[68vh] flex items-center justify-center">
                  <div
                    className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    }}
                  />

                  <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center">
                    <div className="w-0.5 h-4 bg-red-500/80 absolute shadow-sm" />
                    <div className="w-4 h-0.5 bg-red-500/80 absolute shadow-sm" />
                  </div>

                  <Cropper
                    image={activeImageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={spec.aspectRatio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    classes={{
                      containerClassName: "bg-transparent z-10",
                      cropAreaClassName:
                        "passport-crop-area border-2 border-lime-500/50 shadow-[0_0_0_9999em_rgba(0,0,0,0.5)] dark:shadow-[0_0_0_9999em_rgba(0,0,0,0.8)]",
                    }}
                  />
                </div>
              </div>

              {/* Crop controls — sits directly below the workspace, full width, stacked */}
              <div className="bg-card rounded-2xl border border-border p-5 shadow-clean-sm space-y-5 w-full">
                {/* Alignment guide tip */}
                <div className="bg-lime-50 dark:bg-lime-900/20 border border-lime-200 dark:border-lime-800/50 rounded-xl p-4 flex items-start gap-2">
                  <Info size={16} className="text-lime-600 dark:text-lime-400 shrink-0 mt-0.5" />
                  <p className="text-lime-800/80 dark:text-lime-300/80 text-xs leading-relaxed">
                    Drag the photo and use the zoom slider to center the face on the <span className="font-bold text-red-500">red crosshair</span> and fit the chin and top of the head within the <span className="font-bold">green horizontal bars</span>.
                  </p>
                </div>

                {/* Zoom */}
                <section className="w-full lg:max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Zoom
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ZoomOut size={14} className="text-muted-foreground" />
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.05}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="flex-1 accent-primary"
                    />
                    <ZoomIn size={14} className="text-muted-foreground" />
                  </div>
                </section>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2 w-full lg:max-w-md mx-auto">
                  <button
                    onClick={handleReset}
                    disabled={isProcessing}
                    className="flex-1 flex justify-center items-center gap-2 py-4 bg-card border border-input text-muted-foreground font-semibold rounded-2xl hover:bg-muted active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExport}
                    disabled={!completedCrop || isProcessing}
                    className="flex-[2] flex flex-col justify-center items-center py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
                  >
                    {isProcessing ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processing...</span>
                        </div>
                        <span className="text-[10px] font-normal opacity-80 mt-0.5">Removing Background...</span>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span>Export Photo</span>
                          <ArrowRight size={16} />
                        </div>
                        <span className="text-[10px] font-normal opacity-80 mt-0.5">Auto-removes background</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Stage: Result */}
          {stage === "result" && resultUrl && (
            <>
              {/* Photo comparison — full width card */}
              <div className="bg-card rounded-2xl border border-border shadow-clean-sm p-5 w-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Photo Comparison
                  </span>
                  <span className="text-[10px] font-bold bg-green-500 text-white px-2.5 py-1 rounded-full">
                    ✓ PROCESSED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-3xl lg:mx-auto">
                  {/* Processed */}
                  <div className="flex flex-col">
                    <div className="bg-muted rounded-xl overflow-hidden border border-border flex items-center justify-center p-1">
                      <img
                        src={resultUrl}
                        alt="Processed passport photo"
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground text-center mt-2">
                      Processed — {spec.widthPx}×{spec.heightPx} px
                    </span>
                  </div>

                  {/* Original */}
                  <div className="flex flex-col">
                    <div className="bg-muted rounded-xl overflow-hidden border border-border flex items-center justify-center p-4">
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Original upload"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground text-center mt-2">
                      Original
                    </span>
                  </div>
                </div>

                {/* Spec badges */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="text-[10px] font-semibold bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                    📏 {spec.dimensionsLabel}
                  </span>
                  <span className="text-[10px] font-semibold bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                    📐 {spec.widthPx}×{spec.heightPx} px
                  </span>
                  {resultFile && (
                    <span className="text-[10px] font-semibold bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                      📦 {Math.round(resultFile.size / 1024)} KB
                    </span>
                  )}
                  <span className="text-[10px] font-semibold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full border border-green-100 dark:border-green-900">
                    🔒 Never uploaded
                  </span>
                </div>
              </div>

              {/* Download options — single instance, full width card, sits below comparison */}
              <div className="bg-card rounded-2xl border border-border shadow-clean-sm p-5 lg:p-6 w-full">
                <div className="w-full lg:max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Download Options
                    </span>
                  </div>

                  {downloadSection}

                  <div className="h-px bg-border w-full my-4" />

                  {/* Start over */}
                  <button
                    onClick={handleReset}
                    className="w-full bg-card hover:bg-muted active:scale-[0.98] border border-input text-muted-foreground font-semibold rounded-2xl py-4 text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Start Over / Upload Another
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stage: Result — sticky bottom bar, mobile-only quick action */}
      {stage === "result" && resultUrl && waitCountdown === null && !showPriceConfirm && (
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/90 backdrop-blur-md border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden block">
           <button
             onClick={() => {
               if (!isPaid) {
                 if (resultUrl) {
                   startFreeDownload(
                     resultUrl,
                     `${selectedCountryCode.toLowerCase()}_passport_photo.jpg`,
                     printSheetUrl,
                     `${selectedCountryCode.toLowerCase()}_print_sheet_4x6.jpg`
                   );
                 }
                 setTimeout(() => {
                   downloadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 }, 50);
               } else {
                 if (resultUrl) handleDownload(resultUrl, `${selectedCountryCode.toLowerCase()}_passport_photo.jpg`);
                 if (printSheetUrl) setTimeout(() => handleDownload(printSheetUrl, `${selectedCountryCode.toLowerCase()}_print_sheet_4x6.jpg`), 500);
               }
             }}
             className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all text-white py-3.5 text-sm rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
           >
             <Download className="w-4 h-4" />
             {isPaid ? "Download HD Photo & Print Sheet" : "Download Photo & Print Sheet"}
           </button>
        </div>
      )}
    </div>
  );
}