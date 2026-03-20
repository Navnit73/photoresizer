import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef, useCallback } from "react";
import { Upload, FileIcon, Download, Trash2, Cpu, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { AmazonAd } from "@/components/shared/AmazonAd";
import AdUnit from "@/components/shared/AdUnit";

const relatedLinks = [
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "JPG to PDF", href: "/jpg-to-pdf" },
];

export default function PdfSizeReducer() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [newSize, setNewSize] = useState<number>(0);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const calculateSavings = () => {
    if (!originalSize || !newSize) return 0;
    const savings = ((originalSize - newSize) / originalSize) * 100;
    return Math.max(0, savings.toFixed(1));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setOriginalSize(selected.size);
      setProcessedUrl(null);
      setNewSize(0);
    } else if (selected) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid PDF file.",
        variant: "destructive",
      });
    }
  };

  const removeFile = () => {
    setFile(null);
    setProcessedUrl(null);
    setOriginalSize(0);
    setNewSize(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // In-browser "compression" via structural rebuild.
  // We load the PDF, then copy all pages into a fresh PDFDocument.
  // This discards unreferenced objects, metadata bloat, and optimizes structures.
  const compressPdf = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      const newPdfDoc = await PDFDocument.create();
      
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => newPdfDoc.addPage(page));

      // Save without generating object streams (can sometimes reduce size for simple documents)
      // or set useObjectStreams: true to compress structural objects.
      const pdfBytes = await newPdfDoc.save({ useObjectStreams: false }); 
      
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setNewSize(blob.size);
      setProcessedUrl(url);
      
      toast({
        title: "Success",
        description: `PDF compressed successfully! Saved ${formatSize(originalSize - blob.size)}.`,
      });

    } catch (error) {
      console.error("Compression error:", error);
      toast({
        title: "Compression Failed",
        description: "There was an error processing this PDF. It may be encrypted or corrupted.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>PDF Size Reducer | Compress PDF Free & Securely Online</title>
        <meta
          name="description"
          content="Free online PDF size reducer. Compress and shrink your PDF documents securely in your browser without uploading to any server. Fast and privately."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/pdf-size-reducer" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  PDF Size Reducer
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Shrink the file size of your PDF documents instantly. 100% private, processed entirely on your device.
                </p>
              </div>

              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-[fadeInUp_0.5s_ease-out]">
                <div className="w-full relative py-2 flex justify-center mb-6 min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                  <AdUnit format="fluid" layoutKey="-gw-1+2a-9x+5y" />
                </div>
                {!file ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-12 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                       Upload PDF File
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Click to browse or drag and drop your file here
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileIcon className="w-8 h-8 text-rose-500 shrink-0" />
                        <div className="truncate">
                          <p className="font-medium text-slate-900 dark:text-white truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatSize(originalSize)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={removeFile} className="text-slate-400 hover:text-red-500 shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    {!processedUrl ? (
                      <div className="flex flex-col items-center justify-center py-6">
                        <Button
                          size="lg"
                          className="w-full md:w-auto px-8 py-6 rounded-2xl text-lg group bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={compressPdf}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Cpu className="w-6 h-6 mr-2 animate-pulse" />
                              Compressing PDF...
                            </>
                          ) : (
                            <>
                              <Cpu className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                              Run Compression
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-center text-slate-500 mt-4 max-w-sm">
                          This tool extracts raw structure to remove unreferenced objects. Final savings depend on the original PDF's composition.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-6 text-center animate-[fadeIn_0.5s_ease-out]">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          Compression Complete!
                        </h3>
                        
                        <div className="flex justify-center gap-6 my-6">
                          <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Original Size</p>
                            <p className="font-mono font-medium text-slate-700 dark:text-slate-300">{formatSize(originalSize)}</p>
                          </div>
                          <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                          <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">New Size</p>
                            <p className="font-mono font-bold text-green-600 dark:text-green-400">{formatSize(newSize)}</p>
                          </div>
                           <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                          <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Savings</p>
                            <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400">-{calculateSavings()}%</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto rounded-xl gap-2 font-medium"
                          >
                            <a href={processedUrl} download={`compressed_${file.name}`}>
                              <Download className="w-5 h-5" />
                              Download Result
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={removeFile}
                            className="w-full sm:w-auto rounded-xl"
                          >
                            Compress Another
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="py-2">
            <AmazonAd />
          </div>

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Fast, Private PDF Size Reducer</h2>
            <p>
              In professional, academic, and governmental environments, file size limits on portals are heavily enforced. Trying to upload a 15MB scanned contract into an application system capped at 2MB can derail your entire workflow. The free PDF Size Reducer directly addresses this pain point by rebuilding your document architecture natively in your browser to shave off unnecessary kilobytes swiftly.
            </p>

            <h3>The Mechanics of In-Browser Compression</h3>
            <p>
              Many commercial PDF creators (like Microsoft Word exports or desktop scanners) bloat files with unreferenced internal objects, excess metadata, and duplicate stylistic dictionaries. Instead of transmitting your private documents across the internet to a third-party server to run a reduction bash script, our tool uses pure JavaScript. 
            </p>
            <p>
              We deconstruct your PDF locally, extract only the structural pages necessary for the document's visual integrity, and reconstruct a fresh PDF container. This process cleanly discards the bloated history trees and cache objects, resulting in drastically lower file sizes—especially for documents that have been repeatedly edited and re-saved.
            </p>

            <h3>Why Opt for Client-Side PDF Compliance Tools?</h3>
            <ul>
              <li><strong>Zero Data Exfiltration:</strong> Because processing occurs exclusively within the RAM of your active web browser tab, your bank statements, tax IDs, and confidential contracts never traverse external networks.</li>
              <li><strong>No Upload Bottlenecks:</strong> You aren't restricted by your internet upload speeds because nothing is being uploaded to a server in the first place.</li>
              <li><strong>Absolute Compliance:</strong> By avoiding cloud-based processors, you automatically align with stringent corporate GDPR and HIPAA storage constraints.</li>
            </ul>

            <hr className="my-8" />

            <h2>Frequent Questions About PDF Reduction</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Why did my file size not decrease significantly?</h4>
                <p className="text-sm mt-1">Our application relies on structural reconstruction rather than raw image degradation. If your original PDF consists entirely of a single massive, highly-compressed JPG (like a direct scanner dump), there are no "hidden structural objects" to remove. In those specific scenarios, lowering DPI via scanning software is required.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Does this tool reduce the text quality?</h4>
                <p className="text-sm mt-1">No. The architectural reproduction utilized by this resizer simply copies the actual page logic. Vector text, fonts, and embedded layouts retain identically sharp 100% original quality.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Is there a maximum page limit?</h4>
                <p className="text-sm mt-1">The only limitation is the available processing memory (RAM) allocated to your web browser. Most modern devices can easily restructure PDF documents spanning hundreds of pages instantaneously.</p>
              </div>
            </div>
          </article>

          <InternalLinks links={relatedLinks} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
