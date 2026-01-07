import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContentSections } from "@/components/sections/ContentSections";
import { SEO } from "@/components/SEO";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (selected?.type.startsWith("image/")) {
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
    <div className="min-h-screen bg-secondary/30">
      <SEO
        title="Photo Compressor photo size reducer to 50KB Online – Free & Secure"
        description="Compress images to 50KB, 100KB or any size instantly. Free online photo compressor for government forms."
      />

      <Header />

      <main className="container px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        {/* PAGE HEADER */}
        <header className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading">
            Free Online Photo Compressor
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Compress images to exact KB or MB size. Reduce photo size to 10KB,
            20KB, 50KB, 100KB, 200KB, or 500KB instantly — 100% secure and
            browser-based.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            {/* UPLOAD */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background hover:border-primary transition cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="file-upload"
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="text-primary font-semibold">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, WEBP up to 10MB
                    </p>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* MODE */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Compression Mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {(["target", "quality"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`py-3 rounded-xl font-medium transition ${
                        mode === m
                          ? "gradient-hero text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {m === "target" ? "Target Size" : "Quality"}
                    </button>
                  ))}
                </div>

                {mode === "target" && (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {quickSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setTargetValue(size);
                            setTargetUnit("KB");
                          }}
                          className={`py-2 rounded-lg text-sm border ${
                            targetValue === size
                              ? "border-primary bg-secondary"
                              : "border-border"
                          }`}
                        >
                          {size}KB
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <input
                        type="number"
                        value={targetValue}
                        onChange={(e) => setTargetValue(+e.target.value)}
                        className="flex-1 rounded-xl border px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                      <select
                        value={targetUnit}
                        onChange={(e) =>
                          setTargetUnit(e.target.value as "KB" | "MB")
                        }
                        className="rounded-xl border px-4 py-3 bg-background"
                      >
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                      </select>
                    </div>
                  </>
                )}

                {mode === "quality" && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Image Quality:{" "}
                      <span className="text-primary font-semibold">
                        {quality}%
                      </span>
                    </p>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={quality}
                      onChange={(e) => setQuality(+e.target.value)}
                      className="w-full accent-primary"
                    />
                  </div>
                )}

                <button
                  onClick={compressImage}
                  disabled={!file || loading}
                  className="w-full gradient-hero text-primary-foreground py-4 rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading ? "Compressing..." : "Compress Image"}
                </button>

                {error && <p className="text-sm text-destructive">{error}</p>}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Preview & Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!preview ? (
                <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground">
                  No image uploaded
                </div>
              ) : (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-96 object-contain rounded-xl border"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary rounded-xl p-4">
                      <p className="text-xs text-muted-foreground">
                        Original Size
                      </p>
                      <p className="font-semibold">
                        {formatBytes(originalSize)}
                      </p>
                    </div>
                    {result && (
                      <div className="bg-secondary rounded-xl p-4">
                        <p className="text-xs text-muted-foreground">
                          Compressed Size
                        </p>
                        <p className="font-semibold">
                          {formatBytes(result.size)}
                        </p>
                      </div>
                    )}
                  </div>

                  {compressionRatio && (
                    <div className="bg-secondary rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Compression Ratio
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {compressionRatio}% smaller
                      </p>
                    </div>
                  )}

                  {result && (
                    <button
                      onClick={downloadImage}
                      className="w-full gradient-hero text-primary-foreground py-4 rounded-xl font-semibold"
                    >
                      Download Compressed Image
                    </button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <ContentSections />
      <Footer />
    </div>
  );
}
