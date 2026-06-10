"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import jsPDF from "jspdf";

const PAPER_SIZES = {
  "4x6": { name: "4×6 inch", width: 101.6, height: 152.4, label: "Home/Kiosk" },
  "5x7": { name: "5×7 inch", width: 127, height: 177.8, label: "Larger Prints" },
  A4: { name: "A4", width: 210, height: 297, label: "Europe/Asia/India" },
  Letter: { name: "Letter", width: 215.9, height: 279.4, label: "US Standard" },
};

const PHOTO_SIZES = {
  "2x2": { name: "2×2 inch", subtitle: "US / India / Canada", width: 51, height: 51 },
  "35x45": { name: "35×45 mm", subtitle: "Europe / UK / Australia", width: 35, height: 45 },
};

export default function PrintTemplateApp() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [paperSize, setPaperSize] = useState<keyof typeof PAPER_SIZES>("A4");
  const [photoSize, setPhotoSize] = useState<keyof typeof PHOTO_SIZES>("35x45");
  const [layoutCount, setLayoutCount] = useState<number>(20);
  const [cropLines, setCropLines] = useState<boolean>(true);
  const [margin, setMargin] = useState<number>(5);
  const [spacing, setSpacing] = useState<number>(2);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImage = useCallback((src: string) => {
    const img = new Image();
    img.onload = () => { setImageObj(img); setImageLoadError(null); };
    img.onerror = () => { setImageObj(null); setImageSrc(null); setImageLoadError("Failed to load image. Please try a JPG, PNG, or WebP file."); };
    img.src = src;
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setImageSrc(src);
      loadImage(src);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setImageSrc(src);
        loadImage(src);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!imageObj || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPI = 300;
    const mmToPx = (mm: number) => (mm * DPI) / 25.4;

    const paper = PAPER_SIZES[paperSize];
    const photo = PHOTO_SIZES[photoSize];

    const cW = mmToPx(paper.width);
    const cH = mmToPx(paper.height);
    canvas.width = cW;
    canvas.height = cH;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cW, cH);

    const mPx = mmToPx(margin);
    const sPx = mmToPx(spacing);
    const pW = mmToPx(photo.width);
    const pH = mmToPx(photo.height);

    const avW = cW - 2 * mPx;
    const avH = cH - 2 * mPx;

    const cols = Math.max(1, Math.floor((avW + sPx) / (pW + sPx)));
    const rows = Math.max(1, Math.floor((avH + sPx) / (pH + sPx)));

    const maxPhotos = cols * rows;
    const actual = Math.min(layoutCount, maxPhotos);

    const gridW = cols * pW + (cols - 1) * sPx;
    const gridH = rows * pH + (rows - 1) * sPx;
    const startX = mPx + (avW - gridW) / 2;
    const startY = mPx + (avH - gridH) / 2;

    let count = 0;
    for (let r = 0; r < rows && count < actual; r++) {
      for (let c = 0; c < cols && count < actual; c++) {
        const x = startX + c * (pW + sPx);
        const y = startY + r * (pH + sPx);
        ctx.drawImage(imageObj, x, y, pW, pH);
        if (cropLines) {
          ctx.strokeStyle = "#374151";
          ctx.lineWidth = mmToPx(0.15);
          ctx.strokeRect(x, y, pW, pH);
        }
        count++;
      }
    }
  }, [imageObj, paperSize, photoSize, layoutCount, cropLines, margin, spacing]);

  const handleDownloadJPG = () => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.download = `passport-photo-${paperSize}.jpg`;
    a.href = canvasRef.current.toDataURL("image/jpeg", 1.0);
    a.click();
  };

  const handleDownloadPDF = () => {
    if (!canvasRef.current) return;
    const imgData = canvasRef.current.toDataURL("image/jpeg", 1.0);
    const paper = PAPER_SIZES[paperSize];
    const pdf = new jsPDF({
      orientation: paper.width > paper.height ? "landscape" : "portrait",
      unit: "mm",
      format: [paper.width, paper.height],
    });
    pdf.addImage(imgData, "JPEG", 0, 0, paper.width, paper.height);
    pdf.save(`passport-photo-${paperSize}.pdf`);
  };

  const reset = () => { setImageSrc(null); setImageObj(null); setImageLoadError(null); };

  if (imageLoadError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Error</h3>
          <p className="text-sm text-gray-500 mb-6">{imageLoadError}</p>
          <button onClick={reset} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Upload State */}
      {!imageSrc ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-3xl p-10 sm:p-16 text-center cursor-pointer transition-all duration-200
            ${isDragging
              ? "border-indigo-500 bg-indigo-50 scale-[1.01]"
              : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/30"
            }
          `}
        >
          <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {isDragging ? "Drop your photo here" : "Upload Passport Photo"}
          </h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Drag and drop your image, or click to browse. Supports JPG, PNG, WebP up to 10 MB.
          </p>
          <button className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 hover:-translate-y-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Choose Photo
          </button>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileUpload} />

          {/* Format hints */}
          <div className="flex items-center justify-center gap-4 mt-8 text-xs text-gray-400 flex-wrap">
            {["JPG", "PNG", "WebP", "Max 10MB"].map(tag => (
              <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full font-medium">{tag}</span>
            ))}
          </div>
        </div>
      ) : (
        /* Editor State */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Sidebar Controls ── */}
          <aside className="lg:col-span-4 order-2 lg:order-1 space-y-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  <h2 className="font-bold text-gray-900">Layout Settings</h2>
                </div>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Change Photo
                </button>
              </div>

              <div className="p-5 space-y-6">

                {/* Paper Size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Paper Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(PAPER_SIZES).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => setPaperSize(key as keyof typeof PAPER_SIZES)}
                        className={`p-3 border-2 rounded-xl text-left transition-all ${
                          paperSize === key
                            ? "border-indigo-600 bg-indigo-50 shadow-sm"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className={`text-sm font-bold ${paperSize === key ? "text-indigo-700" : "text-gray-800"}`}>{val.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{val.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Photo Size</label>
                  <div className="space-y-2">
                    {Object.entries(PHOTO_SIZES).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => setPhotoSize(key as keyof typeof PHOTO_SIZES)}
                        className={`w-full p-3 border-2 rounded-xl text-left flex items-center justify-between transition-all ${
                          photoSize === key
                            ? "border-indigo-600 bg-indigo-50 shadow-sm"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                        }`}
                      >
                        <div>
                          <div className={`text-sm font-bold ${photoSize === key ? "text-indigo-700" : "text-gray-800"}`}>{val.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{val.subtitle}</div>
                        </div>
                        {photoSize === key && (
                          <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Copies */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Number of Copies</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[4, 6, 8, 10, 12, 16, 20, 99].map(num => (
                      <button
                        key={num}
                        onClick={() => setLayoutCount(num)}
                        className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                          layoutCount === num
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                        }`}
                      >
                        {num === 99 ? "Fill" : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Crop Lines Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Options</label>
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Crop guide lines</span>
                    </div>
                    <div className={`relative w-10 h-5 rounded-full transition-colors ${cropLines ? "bg-indigo-600" : "bg-gray-300"}`} onClick={() => setCropLines(!cropLines)}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${cropLines ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                  </label>
                </div>

                {/* Spacing Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Photo Spacing</label>
                    <span className="text-sm font-bold text-indigo-600">{spacing} mm</span>
                  </div>
                  <input
                    type="range" min="0" max="10" step="1" value={spacing}
                    onChange={e => setSpacing(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>None</span><span>10mm</span>
                  </div>
                </div>

                {/* Margin Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Page Margin</label>
                    <span className="text-sm font-bold text-indigo-600">{margin} mm</span>
                  </div>
                  <input
                    type="range" min="3" max="25" step="1" value={margin}
                    onChange={e => setMargin(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>3mm</span><span>25mm</span>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="p-5 pt-0 space-y-3">
                <button
                  onClick={handleDownloadJPG}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 transition-all hover:shadow-red-300 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download JPG
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black active:bg-gray-800 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-gray-300 transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download PDF
                </button>
                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5 pt-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  300 DPI · Print-ready · Private
                </p>
              </div>
            </div>
          </aside>

          {/* ── Canvas Preview ── */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-gray-100 rounded-2xl border border-gray-200 p-4 sm:p-6 flex flex-col">
              {/* Preview Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="font-medium">Live Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
                    {PAPER_SIZES[paperSize].name}
                  </span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                    {PHOTO_SIZES[photoSize].name}
                  </span>
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 flex items-center justify-center min-h-[280px] sm:min-h-[420px]">
                <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white" style={{ maxWidth: "100%", maxHeight: "70vh" }}>
                  <canvas
                    ref={canvasRef}
                    className="block w-auto h-auto"
                    style={{ maxWidth: "100%", maxHeight: "65vh", objectFit: "contain" }}
                  />
                  {/* Corner decorations */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-gray-300/50 rounded-sm" />
                </div>
              </div>

              {/* Mobile download (bottom of preview on mobile) */}
              <div className="mt-4 sm:hidden space-y-2">
                <button onClick={handleDownloadJPG} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download JPG
                </button>
                <button onClick={handleDownloadPDF} className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}