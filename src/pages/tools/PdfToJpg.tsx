import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef } from "react";
import { Upload, FileIcon, Download, Trash2, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { InternalLinks } from "@/components/shared/InternalLinks";

import AdUnit from "@/components/shared/AdUnit";

// Initialize worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

const relatedLinks = [
  { label: "Convert JPG to PDF", href: "/jpg-to-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "JPEG to JPG", href: "/jpeg-to-jpg" },
];

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState<{ url: string; number: number }[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setImageUrls([]);
      setProgress(0);
      
      try {
        const arrayBuffer = await selected.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        setTotalPages(pdf.numPages);
      } catch (error) {
        toast({
          title: "File Error",
          description: "Could not read PDF. It might be heavily encrypted or corrupted.",
          variant: "destructive",
        });
        setFile(null);
      }
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
    setImageUrls([]);
    setProgress(0);
    setTotalPages(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertPdfToImages = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setProgress(0);
      setImageUrls([]);
      
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      const convertedImages: { url: string; number: number }[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 }); // High resolution scale

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) throw new Error("Could not create canvas context");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        
        // Convert canvas to base64 jpg string (quality 0.9)
        const imgSrc = canvas.toDataURL("image/jpeg", 0.9);
        convertedImages.push({ url: imgSrc, number: pageNum });
        
        // Update progress
        setProgress(Math.round((pageNum / pdf.numPages) * 100));
      }

      setImageUrls(convertedImages);
      
      toast({
        title: "Conversion Complete",
        description: `Successfully extracted ${pdf.numPages} images from the PDF!`,
      });

    } catch (error) {
      console.error("PDF to JPG error:", error);
      toast({
        title: "Conversion Failed",
        description: "There was an error rendering the PDF pages to images.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAllAsZip = async () => {
    if (imageUrls.length === 0) return;
    
    try {
      const zip = new JSZip();
      
      // Add each base64 string to the zip as a file
      imageUrls.forEach((img) => {
        // Remove the data:image/jpeg;base64, prefix
        const base64Data = img.url.replace(/^data:image\/jpeg;base64,/, "");
        const formattedNumber = String(img.number).padStart(3, '0');
        zip.file(`Page_${formattedNumber}.jpg`, base64Data, { base64: true });
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `Extracted_${file?.name}_Images.zip`);
    } catch(err) {
      toast({
        title: "Download Failed",
        description: "Could not bundle images into a ZIP file.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Convert PDF to JPG Free Online | High Quality Export</title>
        <meta
          name="description"
          content="Export every single page of your PDF document into high resolution standalone JPG picture files securely and privately inside your web browser."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/pdf-to-jpg" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Convert PDF to JPG Images
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly rip high-quality pictures from locked PDF pages entirely client-side.
                </p>
              </div>

              <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-[fadeInUp_0.5s_ease-out]">
                <div className="w-full relative py-2 flex justify-center mb-6 min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                  <AdUnit type="sidebar" />
                </div>
                {!file ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-12 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Images className="w-8 h-8 flex-shrink-0" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                       Upload PDF Target
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Select the file you need converted into a gallery.
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
                            {formatSize(file.size)} • {totalPages} Pages Detected
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={removeFile} className="text-slate-400 hover:text-red-500 shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    {imageUrls.length === 0 ? (
                      <div className="space-y-4">
                        <Button
                          size="lg"
                          className="w-full px-8 py-6 rounded-2xl text-lg group bg-red-600 hover:bg-red-700 text-white"
                          onClick={convertPdfToImages}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Images className="w-6 h-6 mr-2 animate-pulse" />
                              Generating: {progress}%
                            </>
                          ) : (
                            <>
                              <Images className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                              Extract Pages to JPG
                            </>
                          )}
                        </Button>
                        
                        {isProcessing && (
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div className="bg-red-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-4">
                           <div className="text-center sm:text-left">
                              <h3 className="font-bold text-slate-900 dark:text-white">Conversion Successful!</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Rendered {imageUrls.length} high-res images.</p>
                           </div>
                           <div className="flex gap-2 w-full sm:w-auto">
                              <Button
                                className="flex-1 sm:w-auto bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                                onClick={downloadAllAsZip}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download All (ZIP)
                              </Button>
                           </div>
                        </div>

                        {/* Image Grid Preview */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                           {imageUrls.map((img) => (
                              <div key={img.number} className="relative group bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                 <img src={img.url} alt={`Page ${img.number}`} className="w-full h-auto object-contain rounded border border-slate-100 dark:border-slate-700" loading="lazy" />
                                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg backdrop-blur-[2px]">
                                    <a 
                                      href={img.url} 
                                      download={`Page_${String(img.number).padStart(2, '0')}.jpg`}
                                      className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                                      title="Download single image"
                                    >
                                      <Download className="w-5 h-5" />
                                    </a>
                                 </div>
                                 <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                                   Pg {img.number}
                                 </div>
                              </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

  
          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
             <h2>Convert Uneditable PDFs into Versatile JPG Images</h2>
            <p>
              Architectural portfolios, presentation slide decks, and creative pitches exported into rigid PDF envelopes are often exceptionally difficult to import onto social media networks or web content management systems natively without complicated third-party web hosting solutions deployed first. 
              Converting those embedded pages into a series of static, uniformly-framed JPEG formats bypasses that headache immediately, giving you social-ready assets locally formatted upon generation entirely free of watermarks.
            </p>

            <h3>The Mechanics of Local High-DPI Canvas Rendering</h3>
            <p>
              Traditional online "PDF Exploders" ask you to upload your sensitive corporate materials essentially to a remote web server where backend graphic libraries screenshot the pages and compress them iteratively into ZIP bundles sent back to you. The severe risk here lies within sending proprietary data outside your networking boundary. 
            </p>
            <p>
              Our web application bypasses those privacy concerns fundamentally. By executing the open-source `pdf.js` worker right inside your web browser environment, your processor dynamically calculates the font vector splines independently locally. Then, utilizing an HTML5 standard `&lt;canvas&gt;` layer, it redraws the text layouts algorithmically, scaled upwards to high-definition (HD) double-density dimensions, before converting pixel arrays securely saving offline onto your hard drive architecture instantaneously.
            </p>

            <h3>Why Opt for a Safe Web-Protocol Offline Application?</h3>
            <ul>
              <li><strong>Zero Risk Confidentiality:</strong> Generating isolated screenshots of internal financial breakdowns manually prevents those diagrams from being archived maliciously inside off-shore foreign data processors.</li>
              <li><strong>Scale Control & Quality:</strong> The resulting JPEG pictures maintain extreme high-fidelity resolutions scaled precisely equivalent natively double (2.0x) viewport density preventing blurred font typography problems prevalent across cheaper mobile platforms.</li>
              <li><strong>Bulk Download Capable:</strong> By combining `jszip` capabilities algorithmically alongside image encoding, clicking just one interactive button packages up 50+ exported pages locally without prompting 50+ intrusive individual file-save browser warnings concurrently.</li>
            </ul>

            <hr className="my-8" />

            <h2>Common Rendering Queries (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I choose PNG format instead?</h4>
                <p className="text-sm mt-1">Presently, targeting optimal file sizes explicitly mandates enforcing the JPEG protocol logic. PNG output is entirely technically viable; however, converting a 100-page presentation structurally into raw PNG arrays often crashes mobile browsers strictly due to severe localized RAM starvation parameters scaling beyond Gigabyte boundaries.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">What happens to interactive dropdowns and forms?</h4>
                <p className="text-sm mt-1">Turning a programmatic structural layout into flat ink structurally neutralizes functional dynamic UI controls fundamentally. Dropdowns will render precisely in the aesthetic static configuration natively locked immediately visible upon loading visually.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">My uploaded PDF is completely dark/blank!</h4>
                <p className="text-sm mt-1">If Adobe Digital Rights Management (DRM) or extremely rigorous military-grade AES-256 printing restrictions are layered upon the embedded structural syntax, standard graphic logic libraries physically cannot unpack nor natively preview those encrypted contents.</p>
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
