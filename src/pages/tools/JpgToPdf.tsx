import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef, useCallback } from "react";
import { Upload, ImageIcon, Download, Trash2, FileType2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { AmazonAd } from "@/components/shared/AmazonAd";

const relatedLinks = [
  { label: "Convert PDF to JPG", href: "/pdf-to-jpg" },
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Compress Image", href: "/compress-image" },
];

export default function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
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
    const imgFiles = selectedFiles.filter(f => f.type.startsWith("image/"));
    
    if (imgFiles.length !== selectedFiles.length) {
       toast({
        title: "Invalid files detected",
        description: "Only image files (JPG, PNG) are allowed.",
        variant: "destructive",
      });
    }

    if (imgFiles.length > 0) {
      setFiles(prev => [...prev, ...imgFiles]);
      setProcessedUrl(null);
    }
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
  }

  const resetAll = () => {
    setFiles([]);
    setProcessedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToPdf = async () => {
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        
        // Dynamically handle JPEG vs PNG embedding
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
           image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
           image = await pdfDoc.embedPng(arrayBuffer);
        } else {
           continue; // Skip unsupported types internally
        }

        const dims = image.scale(1);
        const page = pdfDoc.addPage([dims.width, dims.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: dims.width,
          height: dims.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setProcessedUrl(url);
      
      toast({
        title: "Success",
        description: `Successfully converted ${files.length} image(s) into a unified PDF!`,
      });

    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion Failed",
        description: "There was an error embedding your images into a PDF format.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Convert JPG to PDF Online | Image File to PDF Merger</title>
        <meta
          name="description"
          content="Transform your JPG or PNG images into a professional, multi-page PDF document free. No watermarks, secure entirely within your local browser."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/jpg-to-pdf" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Turn Images into PDFs
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Easily orchestrate messy JPGs or PNGs into clean, continuous PDF binders natively.
                </p>
              </div>

              <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-[fadeInUp_0.5s_ease-out]">
                
                 <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group mb-6"
                  >
                    <div className="w-16 h-16 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                       Upload Images
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Select multiple JPG/PNG files to sequence.
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg, image/jpg, image/png"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                {files.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                       Images to Convert ({files.length})
                    </h4>
                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                      {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 group transition-all">
                          <div className="flex items-center gap-3 overflow-hidden flex-1">
                            <span className="text-slate-400 font-mono text-sm w-5">{index + 1}.</span>
                            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                               <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Preview"/>
                            </div>
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
                             <Button variant="ghost" size="icon" onClick={() => moveFileUp(index)} disabled={index === 0} className="h-8 w-8 text-slate-500">
                                ↑
                             </Button>
                             <Button variant="ghost" size="icon" onClick={() => moveFileDown(index)} disabled={index === files.length - 1} className="h-8 w-8 text-slate-500">
                                ↓
                             </Button>
                            <div className="w-px h-4 bg-slate-300 mx-1"></div>
                            <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8 text-slate-400 hover:text-red-500">
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
                          className="flex-1 rounded-xl text-lg group bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={convertToPdf}
                          disabled={isProcessing || files.length === 0}
                        >
                          {isProcessing ? (
                            <>
                              <FileType2 className="w-5 h-5 mr-2 animate-pulse" />
                              Generating PDF...
                            </>
                          ) : (
                            <>
                              <FileType2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                              Convert to PDF File
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
                      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-6 text-center animate-[fadeIn_0.5s_ease-out] mt-6">
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          Your PDF Folder is Ready!
                        </h3>
                        <p className="text-slate-600 mb-6 text-sm">
                          {files.length} image(s) successfully wrapped into a sequential document.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto rounded-xl gap-2 font-medium bg-amber-600 hover:bg-amber-700"
                          >
                            <a href={processedUrl} download="Images_Converted.pdf">
                              <Download className="w-5 h-5" />
                              Download Compiled PDF
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={resetAll}
                            className="w-full sm:w-auto rounded-xl"
                          >
                            Convert More
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
            <h2>Seamless Image Format Packaging</h2>
            <p>
              Sending eight individual scanned receipts as disjointed JPG attachments significantly annoys corporate HR departments and professors attempting to grade physical assignments submitted remotely. Tying individual digital photographs neatly into one coherent, scrollable PDF document elevates professionalism, standardizes reading scaling, and prevents standalone files from becoming lost in complex email chain histories. 
            </p>

            <h3>How The Image-to-PDF Conversion System Operates</h3>
            <p>
              To eliminate the necessity for bulky premium desktop software suites to process menial tasks, this web application deploys an active containerization workflow inside your very browser.
            </p>
            <p>
              When you submit multiple JPG/PNG images across the interface, a web-assembly generator (`pdf-lib`) executes instantly. For each visual asset present in your upload array, a blank virtual PDF page scaled flawlessly to match your respective image logic dimensions is generated. Consequently, the photograph is mathematically "baked" permanently onto these empty pages inside the document file wrapper without inducing compression or distorting color spaces.
            </p>

            <h3>Why Convert Images Directly Into PDFs?</h3>
            <ul>
              <li><strong>Continuous Flow:</strong> Modern devices implicitly contain native PDF viewers (like iOS Safari and Google Chrome) capable of scrolling through combined PDFs sequentially much faster than swiping through distinct photo gallery fragments.</li>
              <li><strong>No File Size Restrictions:</strong> Cloud-based online tools limit you to tiny megabyte ceilings. Because ours runs entirely in your local system memory, you can wrap extremely massive, high-fidelity 50MB photography portfolios with impunity.</li>
              <li><strong>Offline Security Blanket:</strong> Converting screenshots of tax liabilities, governmental IDs, or healthcare diagnostics on a random public internet portal leaks dangerous unencrypted data. Utilizing strictly in-browser client processing eradicates server interception entirely. </li>
            </ul>

            <hr className="my-8" />

            <h2>Common Image Conversion Inquiries (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Will the original image resolution diminish?</h4>
                <p className="text-sm mt-1">No. The internal engine natively embeds the raw JPEG/PNG matrices sequentially onto mathematically identical layout canvases, effectively freezing the 1:1 original data streams exactly as you captured them.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Can I reorder the structural positions before I convert?</h4>
                <p className="text-sm mt-1">Absolutely. Prior to clicking the "Convert" generation switch, you can freely rearrange the organizational logic using the positional Up/Down arrow brackets hovering alongside your individual uploaded items.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Does this attach a watermarked banner onto the final document?</h4>
                <p className="text-sm mt-1">Never. Your final output document retains complete spatial autonomy and incorporates entirely zero invasive premium promotional branding or graphical watermarks permanently into your files.</p>
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
