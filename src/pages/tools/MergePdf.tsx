import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef, useCallback } from "react";
import { Upload, FileIcon, Download, Trash2, Combine, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { AmazonAd } from "@/components/shared/AmazonAd";

const relatedLinks = [
  { label: "PDF Size Reducer", href: "/pdf-size-reducer" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "Convert JPG to PDF", href: "/jpg-to-pdf" },
];

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(f => f.type === "application/pdf");
    
    if (pdfFiles.length !== selectedFiles.length) {
       toast({
        title: "Invalid files detected",
        description: "Only PDF files are allowed. Non-PDFs were ignored.",
        variant: "destructive",
      });
    }

    if (pdfFiles.length > 0) {
      setFiles(prev => [...prev, ...pdfFiles]);
      setProcessedUrl(null);
    }
    
    // Reset file input so the same file could be selected again easily
    e.target.value = "";
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setProcessedUrl(null);
  };
  
  const moveFileUp = (index: number) => {
    if (index === 0) return;
    setFiles(prev => {
      const newFiles = [...prev];
      const temp = newFiles[index - 1];
      newFiles[index - 1] = newFiles[index];
      newFiles[index] = temp;
      return newFiles;
    });
    setProcessedUrl(null);
  }
  
  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles(prev => {
      const newFiles = [...prev];
      const temp = newFiles[index + 1];
      newFiles[index + 1] = newFiles[index];
      newFiles[index] = temp;
      return newFiles;
    });
    setProcessedUrl(null);
  };

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    
    setFiles(prev => {
      const newFiles = [...prev];
      const draggedItem = newFiles[draggedItemIndex];
      newFiles.splice(draggedItemIndex, 1);
      newFiles.splice(index, 0, draggedItem);
      return newFiles;
    });
    setDraggedItemIndex(index); // Update the index since the item moved
    setProcessedUrl(null);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const resetAll = () => {
    setFiles([]);
    setProcessedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
       toast({
        title: "Requires multiple files",
        description: "Please upload at least two PDFs to merge them.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setProcessedUrl(url);
      
      toast({
        title: "Success",
        description: `Successfully combined ${files.length} PDFs into a single document!`,
      });

    } catch (error) {
      console.error("Merge error:", error);
      toast({
        title: "Merge Failed",
        description: "There was an error combining the PDFs. Ensure none are heavily encrypted or corrupted.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Merge PDF Files Online | Combine PDFs Free & Securely</title>
        <meta
          name="description"
          content="Combine multiple PDFs into a single document effortlessly. Free, completely secure browser-based PDF merger tool with no upload limits."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/merge-pdf" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Combine & Merge PDFs
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Join structural documents seamlessly. Organize, reorder, and unite multiple PDFs into one comprehensive file entirely within your browser.
                </p>
              </div>

              <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-[fadeInUp_0.5s_ease-out]">
                
                 <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group mb-6 ${files.length > 0 ? 'hidden' : 'block'}`}
                  >
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                       Upload PDFs to Combine
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Select multiple files at once. Order matters.
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                {files.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-lg">
                        Files to Merge ({files.length})
                      </h4>
                      <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" /> Add More PDFs
                      </Button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                      {files.map((file, index) => (
                        <div 
                          key={`${file.name}-${index}`} 
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragEnter={() => handleDragEnter(index)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => e.preventDefault()}
                          className={`flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border group transition-all cursor-move ${draggedItemIndex === index ? 'border-blue-500 opacity-50 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'}`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden flex-1 select-none">
                            <GripVertical className="w-5 h-5 text-slate-400 opacity-50 group-hover:opacity-100 shrink-0" />
                            <span className="text-slate-400 font-mono text-sm w-5">{index + 1}.</span>
                            <FileIcon className="w-6 h-6 text-rose-500 shrink-0" />
                            <div className="truncate">
                              <p className="font-medium text-slate-900 dark:text-white text-sm truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {formatSize(file.size)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveFileUp(index); }} disabled={index === 0} className="h-8 w-8 text-slate-500">
                                ↑
                             </Button>
                             <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveFileDown(index); }} disabled={index === files.length - 1} className="h-8 w-8 text-slate-500">
                                ↓
                             </Button>
                            <div className="w-px h-4 bg-slate-300 mx-1"></div>
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeFile(index); }} className="h-8 w-8 text-slate-400 hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {!processedUrl ? (
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <Button
                          size="lg"
                          className="flex-1 rounded-xl text-lg group bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={mergePdfs}
                          disabled={isProcessing || files.length < 2}
                        >
                          {isProcessing ? (
                            <>
                              <Combine className="w-5 h-5 mr-2 animate-pulse" />
                              Merging Files...
                            </>
                          ) : (
                            <>
                              <Combine className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                              Merge PDFs Now
                            </>
                          )}
                        </Button>
                         <Button
                          size="lg"
                          variant="outline"
                          className="rounded-xl asChild"
                          onClick={resetAll}
                          disabled={isProcessing}
                        >
                          Clear All
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-6 text-center animate-[fadeIn_0.5s_ease-out] mt-6">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          Your Merged PDF is Ready!
                        </h3>
                        <p className="text-slate-600 mb-6 text-sm">
                          {files.length} documents successfully combined.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto rounded-xl gap-2 font-medium bg-blue-600 hover:bg-blue-700"
                          >
                            <a href={processedUrl} download="Merged_Document.pdf">
                              <Download className="w-5 h-5" />
                              Download Merged PDF
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={resetAll}
                            className="w-full sm:w-auto rounded-xl"
                          >
                            Start Over
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
            <h2>Combine Multiple PDF Files Seamlessly</h2>
            <p>
              In administrative, legal, and academic workflows, generating single comprehensive summaries out of scattered independent documents is a daily hassle. Whether you need to concatenate signed employment contracts, combine lecture notes across different weeks, or sequence tax return schedules, dealing with dozens of separated files complicates digital organization. The Free Merge PDF Tool eliminates that struggle by binding distinct documents into a unified, clean progression directly in your browser window.
            </p>

            <h3>How The Local PDF Merger Maintains Your Compliance</h3>
            <p>
              Traditionally, bringing independent PDFs together involves emailing attachments to sketchy "Convert-for-Free" websites. Those centralized host architectures silently archive your financial statements, health records, and proprietary legal defenses into unmonitored storage arrays.
            </p>
            <p>
              Our solution is entirely decentralized. By utilizing modern web-assembly structures (pdf-lib), this tool downloads the combining algorithm directly into your browser's local sandbox memory. As you drag, drop, sequence, and compile your final document, zero pieces of data ever leave your Wi-Fi router. Total compliance with privacy protocols like GDPR, HIPAA, and corporate NDA specifications is inherently enforced by algorithmic physics.
            </p>

            <h3>Key Utility Features</h3>
            <ul>
              <li><strong>Intelligent Sequencing:</strong> Upload documents immediately and use the up/down arrows generated in the UI list to rearrange the exact architectural sequence before initiating the final bind.</li>
              <li><strong>Zero Size Limits:</strong> Unbounded by server overhead, you can bind colossal schematic blueprints or hundreds of scanned textbooks assuming your local computing platform possesses enough RAM bandwidth.</li>
              <li><strong>Total Autonomy:</strong> No arbitrary wait lists. No "You have reached your free daily limit" paywalls. Produce unlimited merged binders for your enterprise every single day.</li>
            </ul>

            <hr className="my-8" />

            <h2>Common PDF Merging Scenarios (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Will merged PDFs lose their embedded text searching capability?</h4>
                <p className="text-sm mt-1">No. The algorithm replicates the original vector encoding formats. If the original parent document contained highlightable, searchable text layers, the combined child document will faithfully retain that exact same utility.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Can I merge encrypted/password-protected PDFs?</h4>
                <p className="text-sm mt-1">Due to standardized encryption security protocols, a heavily locked PDF cannot be programmatically cracked and re-binded. You must strip the password natively first within Adobe Acrobat or similar primary editors prior to attempting a generic merger.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Are visual bookmarks retained during the merge?</h4>
                <p className="text-sm mt-1">Constructing a merged file essentially acts like virtually printing pages back-to-back. Complex metadata mapping tables, such as deeply nested interactive bookmarks, are usually flattened to ensure structural stability across the new continuous output file.</p>
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
