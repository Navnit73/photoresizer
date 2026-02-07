import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContentSections } from "@/components/sections/ContentSections";
import { SEO } from "@/components/SEO";

type Mode = "target" | "quality";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);

  const [mode, setMode] = useState<Mode>("target");
  const [targetValue, setTargetValue] = useState(50);
  const [targetUnit, setTargetUnit] = useState<"KB" | "MB">("KB");
  const [quality, setQuality] = useState(80);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressText, setProgressText] = useState("");

  const quickSizes = [10, 15, 20, 30, 40, 50, 100, 200, 500];

  /* ---------------------------------- utils ---------------------------------- */

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  /* ---------------------------- file handling ---------------------------- */

  const handleFileSelect = (selected?: File) => {
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (selected.size > 50 * 1024 * 1024) {
      setError("Maximum file size is 50MB");
      return;
    }

    setFile(selected);
    setOriginalSize(selected.size);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files?.[0]);
  };

  /* --------------------- FAST TARGET SIZE COMPRESSION --------------------- */

  const compressFastTarget = async (
    file: File,
    targetBytes: number
  ): Promise<File> => {
    let quality = 0.8;
    let compressed = file;

    for (let i = 0; i < 3; i++) {
      setProgressText(`Optimizing image (${i + 1}/3)…`);

      compressed = await imageCompression(file, {
        initialQuality: quality,
        maxSizeMB: targetBytes / (1024 * 1024),
        useWebWorker: true,
        maxIteration: 6,
        fileType: "image/jpeg",
      });

      if (compressed.size <= targetBytes) return compressed;

      const ratio = compressed.size / targetBytes;
      quality = Math.max(0.4, quality / ratio);
    }

    setProgressText("Final adjustment…");

    return await imageCompression(file, {
      initialQuality: quality,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
      maxIteration: 6,
      fileType: "image/jpeg",
    });
  };

  /* ------------------------------- compress ------------------------------- */

  const compressImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setProgressText("Preparing…");

    try {
      let compressed: File;

      if (mode === "quality") {
        setProgressText("Compressing by quality…");

        compressed = await imageCompression(file, {
          initialQuality: quality / 100,
          useWebWorker: true,
          maxIteration: 8,
          fileType: "image/jpeg",
        });
      } else {
        const targetBytes =
          targetUnit === "KB"
            ? targetValue * 1024
            : targetValue * 1024 * 1024;

        if (targetBytes >= file.size) {
          setError("Target size must be smaller than original image");
          setLoading(false);
          setProgressText("");
          return;
        }

        compressed = await compressFastTarget(file, targetBytes);
      }

      setResult(compressed);
      setPreview(URL.createObjectURL(compressed));
    } catch (err) {
      setError(
        "Compression failed. Try a slightly larger size or a different image."
      );
    } finally {
      setLoading(false);
      setProgressText("");
    }
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(result);
    link.download = `compressed-${Date.now()}.jpg`;
    link.click();
  };

  const compressionRatio =
    result && originalSize
      ? ((1 - result.size / originalSize) * 100).toFixed(1)
      : null;

  /* ---------------------------------- UI ---------------------------------- */

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Photo Compressor – Reduce Image Size to 50KB Online"
        description="Compress images to exact KB or MB size instantly. Free, fast & secure photo compressor for government forms."
      />

      <Header />

      <main className="container px-4 py-8 lg:py-12 space-y-8 lg:space-y-12">
        <header className="text-center space-y-3">
          <h1 className="text-2xl lg:text-3xl font-bold font-heading text-foreground">
            Free Online Photo Compressor
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            Reduce photo size to 10KB, 20KB, 50KB, 100KB or any custom size.
            Works fully in your browser.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Upload */}
            <div className="bg-card border text-card-foreground rounded-2xl shadow-sm p-4 lg:p-6">
              <h2 className="font-semibold mb-4 text-foreground">Upload Image</h2>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-border rounded-xl p-6 lg:p-10 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="upload" className="cursor-pointer space-y-3 block">
                  <div className="text-4xl lg:text-5xl">📸</div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG, WEBP • Max 50MB
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-card border text-card-foreground rounded-2xl shadow-sm p-4 lg:p-6 space-y-5">
              <h2 className="font-semibold text-foreground">Compression Settings</h2>

              <div className="grid grid-cols-2 gap-3">
                {(["target", "quality"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    disabled={loading}
                    onClick={() => setMode(m)}
                    className={`py-3 rounded-xl font-medium transition text-sm lg:text-base ${
                      mode === m
                        ? "gradient-hero text-primary-foreground shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {m === "target" ? "Target Size" : "Quality"}
                  </button>
                ))}
              </div>

              {mode === "target" && (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {quickSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setTargetValue(s);
                          setTargetUnit("KB");
                        }}
                        className="border bg-background hover:bg-muted text-foreground rounded-lg py-2 text-sm transition-colors"
                      >
                        {s}KB
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={targetValue}
                      onChange={(e) =>
                        setTargetValue(Math.max(1, +e.target.value))
                      }
                      className="flex-1 border bg-background text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    <select
                      value={targetUnit}
                      onChange={(e) =>
                        setTargetUnit(e.target.value as "KB" | "MB")
                      }
                      className="border bg-background text-foreground rounded-xl px-4 py-3 outline-none"
                    >
                      <option>KB</option>
                      <option>MB</option>
                    </select>
                  </div>
                </>
              )}

              {mode === "quality" && (
                <>
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Image Quality</span>
                    <b>{quality}%</b>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(+e.target.value)}
                    className="w-full accent-primary"
                  />
                </>
              )}

              <button
                onClick={compressImage}
                disabled={!file || loading}
                className="w-full gradient-hero text-primary-foreground py-4 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex justify-center items-center gap-3">
                    <span className="h-4 w-4 rounded-full bg-primary-foreground animate-pulse" />
                    Optimizing image…
                  </span>
                ) : (
                  "Compress Image"
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Runs entirely in your browser. No uploads.
              </p>

              {error && (
                <div className="border border-destructive/30 bg-destructive/10 text-destructive rounded-xl p-3 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-card border text-card-foreground rounded-2xl shadow-sm p-4 lg:p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Preview & Result</h2>

            <div className="border rounded-xl min-h-[300px] lg:h-[420px] flex items-center justify-center bg-muted/20 relative overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  className="max-h-full max-w-full object-contain p-2"
                  alt="Preview"
                />
              ) : (
                <span className="text-muted-foreground flex flex-col items-center gap-2">
                  <span className="text-4xl opacity-50">🖼️</span>
                  <span>No image selected</span>
                </span>
              )}
            </div>

            {preview && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 border rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">Original</p>
                  <p className="text-lg lg:text-xl font-bold text-foreground">
                    {formatBytes(originalSize)}
                  </p>
                </div>

                {result && (
                  <div className="bg-muted/30 border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Compressed</p>
                    <p className="text-lg lg:text-xl font-bold text-foreground">
                      {formatBytes(result.size)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {compressionRatio && (
              <div className="bg-muted/30 border rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Compression achieved
                </p>
                <p className="text-3xl lg:text-4xl font-bold text-foreground">
                  {compressionRatio}% smaller
                </p>
              </div>
            )}

            {result && (
              <button
                onClick={downloadImage}
                className="w-full gradient-hero text-primary-foreground py-4 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
              >
                Download Image
              </button>
            )}
          </div>
        </div>

        <ContentSections />
      </main>

      <Footer />
    </div>
  );
}
