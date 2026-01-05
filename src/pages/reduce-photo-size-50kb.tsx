import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookmarkPopup } from "@/components/layout/BookmarkPopup";
import { ContentSections } from "@/components/sections/ContentSections";
import { SEO } from "@/components/SEO";
type Mode = "target" | "quality";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);

  const [mode, setMode] = useState<Mode>("target");
  const [targetValue, setTargetValue] = useState(50);
  const [targetUnit, setTargetUnit] = useState<"KB" | "MB">("KB");
  const [quality, setQuality] = useState(80);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickSizes = [10, 15, 20, 30, 40, 50, 100, 200, 500];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setOriginalSize(selected.size);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const selected = e.dataTransfer.files?.[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setOriginalSize(selected.size);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError(null);
    }
  };

  const compressImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      let compressed: File;

      if (mode === "quality") {
        compressed = await imageCompression(file, {
          initialQuality: quality / 100,
          useWebWorker: true,
          fileType: "image/jpeg",
        });
      } else {
        const targetMB = targetUnit === "KB" ? targetValue / 1024 : targetValue;
        compressed = await imageCompression(file, {
          maxSizeMB: targetMB,
          useWebWorker: true,
          fileType: "image/jpeg",
        });
      }

      setResult(compressed);
      setPreview(URL.createObjectURL(compressed));
    } catch {
      setError("Compression failed. Try a different image or settings.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(result);
    link.download = `compressed-${Date.now()}.jpg`;
    link.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressionRatio =
    result && originalSize
      ? ((1 - result.size / originalSize) * 100).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* SEO Meta (would be in Head component) */}
      <SEO />

      <Header />
      <div className="hidden">
        photo compressor, online photo compressor, photo compressor online,
        photo compressor in kb, photo compressor to 10kb, photo compressor 15kb,
        photo compressor to 20kb, photo compressor to 30kb, photo compressor to
        40kb, photo compressor to 50kb, 50kb photo compressor, photo compressor
        100kb, 100kb photo compressor, photo compressor to 200kb, photo
        compressor to 500kb
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Free Online Photo Compressor
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Compress images to exact KB or MB size. Reduce photo size to 10KB,
            20KB, 50KB, 100KB, 200KB, or 500KB instantly. 100% free, secure, and
            client-side processing.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-gray-700 mb-1">
                    <span className="font-semibold text-blue-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </label>
              </div>
            </div>

            {/* Mode Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-4">Compression Mode</h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setMode("target")}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    mode === "target"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Target Size
                </button>
                <button
                  onClick={() => setMode("quality")}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    mode === "quality"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Quality
                </button>
              </div>

              {/* Quick Size Buttons */}
              {mode === "target" && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Quick Select:
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {quickSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setTargetValue(size);
                          setTargetUnit("KB");
                        }}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                          targetValue === size && targetUnit === "KB"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        {size}KB
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Controls */}
              {mode === "target" ? (
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Target Size
                    </label>
                    <input
                      type="number"
                      value={targetValue}
                      onChange={(e) => setTargetValue(Number(e.target.value))}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Enter size"
                    />
                  </div>
                  <select
                    value={targetUnit}
                    onChange={(e) =>
                      setTargetUnit(e.target.value as "KB" | "MB")
                    }
                    className="border-2 border-gray-300 rounded-xl px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Image Quality:{" "}
                    <span className="text-blue-600 font-semibold">
                      {quality}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              )}

              {/* Compress Button */}
              <button
                onClick={compressImage}
                disabled={!file || loading}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Compressing...
                  </span>
                ) : (
                  "Compress Image"
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">Preview & Results</h2>

            {!preview ? (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <p className="text-gray-400">No image uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-gray-600 mb-1">Original Size</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatBytes(originalSize)}
                    </p>
                  </div>
                  {result && (
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-xs text-gray-600 mb-1">
                        Compressed Size
                      </p>
                      <p className="text-lg font-semibold text-green-600">
                        {formatBytes(result.size)}
                      </p>
                    </div>
                  )}
                </div>

                {compressionRatio && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-200">
                    <p className="text-sm text-gray-700">Compression Ratio</p>
                    <p className="text-2xl font-bold text-green-600">
                      {compressionRatio}% smaller
                    </p>
                  </div>
                )}

                {result && (
                  <button
                    onClick={downloadImage}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Compressed Image
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            Professional Photo Compressor Online - Free & Secure
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              Our online photo compressor helps you reduce image file sizes to
              exact KB or MB targets. Whether you need to compress photos to
              10KB, 20KB, 50KB, 100KB, or 500KB, our tool delivers precise
              results instantly.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Compress Photos to Any Size
            </h3>
            <p>
              Use our photo compressor to reduce images to specific file sizes.
              Popular compression targets include photo compressor to 10kb,
              photo compressor 15kb, photo compressor to 20kb, photo compressor
              to 30kb, photo compressor to 40kb, and photo compressor to 50kb.
              For larger files, compress to 100kb, 200kb, or 500kb with ease.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Key Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Compress to exact KB or MB size</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% client-side processing</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No uploads or watermarks</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Quality or size-based compression</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Fast and secure</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free unlimited use</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Trust & Privacy */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            Your privacy is protected. All image processing happens in your
            browser - no files are uploaded to our servers. Final compressed
            image size may vary slightly based on image content and browser
            compression capabilities.
          </p>
        </div>
      </main>
      <ContentSections />

      <Footer />
    </div>
  );
}
