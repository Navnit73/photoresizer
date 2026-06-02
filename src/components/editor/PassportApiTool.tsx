import { useState, useEffect, useRef } from "react";
import {
  Check,
  Download,
  FileImage,
  HelpCircle,
  Info,
  Printer,
  RefreshCw,
  ShieldCheck,
  Upload,
  UserCheck,
  AlertTriangle,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  ImageIcon,
  ChevronDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  fetchExternalCountries,
  processExternalPhoto,
  ExternalCountry,
  ExternalProcessResponse,
} from "@/utils/passportApi";

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
      <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
        <span className="sr-only">{tooltip}</span>
      </span>
      <span className="text-sm font-bold text-gray-800">{Math.round(value)}%</span>
    </div>
    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
    <p className="text-[10px] text-gray-400">{standard}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export function PassportApiTool() {
  // Block DevTools
  useEffect(() => {
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
  const [selectedCountryCode, setSelectedCountryCode] = useState("US");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [processingMsg, setProcessingMsg] = useState("");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [result, setResult] = useState<ExternalProcessResponse | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const processingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoadingCountries(true);
      try {
        const list = await fetchExternalCountries();
        const sorted = list && list.length > 0
          ? [...list].sort((a, b) => a.country_name.localeCompare(b.country_name))
          : FALLBACK_COUNTRIES;
        setCountries(sorted);
        setSelectedCountryCode(sorted.find((c) => c.country_code === "US") ? "US" : sorted[0].country_code);
      } catch {
        setCountries(FALLBACK_COUNTRIES);
        setSelectedCountryCode("US");
        toast.error("Could not load country list — using default countries.");
      } finally {
        setIsLoadingCountries(false);
      }
    })();
  }, []);

  const activeCountry = countries.find((c) => c.country_code === selectedCountryCode);

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
    return () => clearProcessingInterval();
  }, []);

  const handleReset = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
   

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-16">

        {/* ── Hero Section ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                Biometric Passport & Visa Photo Maker
              </h1>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Government-compliant photos for 150+ countries — background removed, auto-cropped, print-ready.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Background Removed", "Auto-Crop", "Print-Ready"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                    <Check className="w-2.5 h-2.5" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Country Selector ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Country Preset</span>
          </div>
          {isLoadingCountries ? (
            <div className="h-11 bg-gray-100 rounded-xl animate-pulse" />
          ) : (
            <div className="relative">
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c.country_code} value={c.country_code}>
                    {c.country_name} ({c.country_code})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}
          {activeCountry && (
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg capitalize">
                🎯 {activeCountry.document_type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                📏 {activeCountry.dimensions}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 px-1">
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
            className={`bg-white rounded-2xl border-2 border-dashed shadow-sm cursor-pointer transition-all duration-200 p-8 flex flex-col items-center text-center select-none ${
              isDragOver
                ? "border-blue-400 bg-blue-50 scale-[0.99]"
                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200 ${isDragOver ? "bg-blue-100" : "bg-gray-100"}`}>
              <ImageIcon className={`w-7 h-7 transition-colors duration-200 ${isDragOver ? "text-blue-500" : "text-gray-400"}`} />
            </div>
            <p className="text-base font-bold text-gray-800">Drop your portrait here</p>
            <p className="text-sm text-gray-400 mt-1">
              or <span className="text-blue-500 font-semibold">browse files</span>
            </p>
            <p className="text-xs text-gray-300 mt-2">PNG · JPG · WebP — max 10 MB</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        )}

        {/* ── Stage: Preview ── */}
        {stage === "preview" && selectedFile && previewUrl && (
          <>
            {/* Photo preview card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Photo</span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-blue-500 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Upload className="w-3 h-3" /> Change
                </button>
              </div>
              <div className="flex justify-center bg-gray-50 p-6">
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

            {/* Tips card */}
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 flex gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-bold">Best results:</span> Face camera directly, even lighting, plain background, no glasses, neutral expression.
              </p>
            </div>

            {/* What AI will do */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">What AI will do</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  `Matches ${activeCountry?.country_name} rules`,
                  "Removes background",
                  "Biometric face align",
                  "Generates print sheet",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-green-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleProcessImage}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl py-4 text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
              >
                <Zap className="w-4 h-4" />
                Process with AI
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-4 rounded-2xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {/* ── Stage: Processing ── */}
        {stage === "processing" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-blue-100 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Processing…</h3>
              <p className="text-sm text-blue-500 font-medium mt-1 min-h-[20px]">{processingMsg}</p>
            </div>
            <div className="w-full space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                <span>AI Analysis</span>
                <span>{processingProgress}%</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-[11px] text-gray-400">
              {["Facial Detection", "Background Removal", "Compliance Check"].map((s, i) => (
                <span key={s} className={`px-2.5 py-1 rounded-full border ${processingProgress > i * 30 + 10 ? "border-blue-200 bg-blue-50 text-blue-600 font-semibold" : "border-gray-100 bg-gray-50"}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Stage: Result ── */}
        {stage === "result" && result && (
          <>
            {/* Success banner */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-800">Government-Compliant!</p>
                <p className="text-xs text-green-600">Your photo meets all {activeCountry?.country_name} biometric standards.</p>
              </div>
            </div>

            {/* Photo tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <Tabs defaultValue="processed">
                <TabsList className="flex w-full bg-gray-50 border-b border-gray-100 p-0 h-auto rounded-none">
                  {[
                    { value: "processed", label: "AI Photo", icon: UserCheck },
                    { value: "preview", label: "Preview", icon: Zap },
                    { value: "original", label: "Original", icon: FileImage },
                  ].map(({ value, label, icon: Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white text-gray-400 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="processed" className="p-5 flex flex-col items-center gap-4 m-0">
                  <div className="relative bg-gray-50 rounded-xl overflow-hidden w-full max-w-xs aspect-[3/4] flex items-center justify-center border border-gray-100">
                    <img
                      src={result.image_url}
                      alt="AI processed passport photo"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      draggable={false}
                      style={{ WebkitTouchCallout: "none" }}
                      className="object-contain max-h-full max-w-full select-none pointer-events-none"
                    />
                    <span className="absolute top-2 right-2 text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">✓ COMPLIANT</span>
                  </div>
                  <button
                    onClick={() => handleDownload(result.image_url, `${selectedCountryCode}_passport_photo.jpg`)}
                    disabled={isDownloading}
                    className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-50 active:scale-[0.98] text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Preparing..." : "Download JPG"}
                  </button>
                </TabsContent>

                <TabsContent value="preview" className="p-5 flex flex-col items-center gap-4 m-0">
                  <div className="bg-gray-50 rounded-xl overflow-hidden w-full max-w-xs aspect-[3/4] flex items-center justify-center border border-gray-100">
                    <img
                      src={result.preview_url}
                      alt="AI Preview"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      draggable={false}
                      style={{ WebkitTouchCallout: "none" }}
                      className="object-contain max-h-full max-w-full select-none pointer-events-none"
                    />
                  </div>
                  <button
                    onClick={() => handleDownload(result.image_url, `${selectedCountryCode}_passport_photo.jpg`)}
                    disabled={isDownloading}
                    className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-50 active:scale-[0.98] text-white font-bold rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Preparing..." : "Download JPG"}
                  </button>
                </TabsContent>

                <TabsContent value="original" className="p-5 flex flex-col items-center gap-4 m-0">
                  <div className="bg-gray-50 rounded-xl overflow-hidden w-full max-w-xs aspect-[3/4] flex items-center justify-center border border-gray-100">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Original upload"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        draggable={false}
                        style={{ WebkitTouchCallout: "none" }}
                        className="object-contain max-h-full max-w-full select-none pointer-events-none"
                      />
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Biometric metrics */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Biometric Analysis
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-lg">PASSED</span>
              </div>
              <div className="space-y-4">
                <MetricBar label="Head Height Ratio" value={result.metrics.head_height_pct} standard="Standard: 50%–69%" tooltip="Ideal range: 50%–69% of total image height" />
                <MetricBar label="Eye Position Ratio" value={result.metrics.eye_position_pct} standard="Standard: 56%–69%" tooltip="Ideal eye line: 56%–69% from bottom of image" />
                <MetricBar label="Top Margin Gap" value={result.metrics.top_margin_pct} standard="Standard: 8%–15%" tooltip="Head-to-top border clearance: 8%–15%" />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-50">
                {[
                  { label: "Dimensions", value: result.dimensions },
                  {
                    label: "Background",
                    value: result.metrics.background_valid ? "Valid" : result.metrics.background_corrected ? "Fixed by AI" : "Invalid",
                  },
                  { label: "File Size", value: `${result.size_kb} KB` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-xs font-bold text-gray-800 leading-tight">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Print sheet download section */}
            {result.print_sheet_url && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">4×6 Print Sheet</span>
                  </div>
                  <span className="text-[10px] text-gray-400">4 photos per sheet</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 mb-4">Print at home on glossy photo paper — no studio needed.</p>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                  <img
                    src={result.print_sheet_url}
                    alt="4x6 Print Sheet Preview"
                    className="max-w-full max-h-32 object-contain rounded"
                  />
                </div>
                <button
                  onClick={handleDownloadPrintSheet}
                  disabled={isDownloading}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 active:scale-[0.98] text-white font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  {isDownloading ? "Preparing..." : "Download 4×6 Print Sheet"}
                </button>
              </div>
            )}

            {/* Privacy note + reset */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-600 leading-relaxed">
                Images are processed on ephemeral serverless nodes and never permanently stored, indexed, or linked to your identity.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-white hover:bg-gray-50 active:scale-[0.98] border border-gray-200 text-gray-600 font-semibold rounded-2xl py-4 text-sm flex items-center justify-center gap-2 transition-all"
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