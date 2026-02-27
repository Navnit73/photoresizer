import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef, useCallback } from "react";
import { Upload, FileIcon, Download, Trash2, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { AmazonAd } from "@/components/shared/AmazonAd";

const relatedLinks = [
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "PDF Size Reducer", href: "/pdf-size-reducer" },
  { label: "Convert PDF to JPG", href: "/pdf-to-jpg" },
];

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSelection, setPageSelection] = useState<string>("");
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setProcessedUrl(null);
      setPageSelection("");
      
      // Quickly parse to get total pages
      try {
        const arrayBuffer = await selected.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        setTotalPages(pdfDoc.getPageCount());
      } catch (error) {
        toast({
          title: "File Error",
          description: "Could not read PDF. It might be heavily encrypted.",
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
    setProcessedUrl(null);
    setTotalPages(0);
    setPageSelection("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Helper to parse input like "1, 3-5, 8" into a Set of zero-indexed integers
  const parseRanges = (input: string, maxPages: number): Set<number> | null => {
    const pages = new Set<number>();
    const ranges = input.split(",").map((s) => s.trim());

    for (const range of ranges) {
      if (!range) continue;
      if (range.includes("-")) {
        const [startStr, endStr] = range.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start > end || start < 1 || end > maxPages) return null;
        for (let i = start; i <= end; i++) pages.add(i - 1);
      } else {
        const num = parseInt(range, 10);
        if (isNaN(num) || num < 1 || num > maxPages) return null;
        pages.add(num - 1);
      }
    }
    return pages.size > 0 ? pages : null;
  };

  const splitPdf = async () => {
    if (!file) return;

    const indicesToExtract = parseRanges(pageSelection, totalPages);
    if (!indicesToExtract) {
       toast({
        title: "Invalid Page Selection",
        description: `Please enter a valid format (e.g. 1-3, 5). Max page is ${totalPages}.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      const newPdfDoc = await PDFDocument.create();
      
      // Sort indices so they appear in numerical order in the output, or keep original order logic?
      // Extracting by numerical order to make sense.
      const sortedIndices = Array.from(indicesToExtract).sort((a,b) => a-b);
      
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, sortedIndices);
      copiedPages.forEach((page) => newPdfDoc.addPage(page));

      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setProcessedUrl(url);
      
      toast({
        title: "Success",
        description: `Successfully extracted ${sortedIndices.length} pages into a new PDF!`,
      });

    } catch (error) {
      console.error("Split error:", error);
      toast({
        title: "Split Failed",
        description: "There was an error isolating the requested pages.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Split PDF Files Online | Extract Specific PDF Pages</title>
        <meta
          name="description"
          content="Free PDF splitter. Extract specific pages, ranges, or separate entire documents online securely within your browser."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/split-pdf" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Extract & Split PDF Pages
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Isolate critical pages from massive documents securely. No server uploads.
                </p>
              </div>

              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-[fadeInUp_0.5s_ease-out]">
                {!file ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-12 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Scissors className="w-8 h-8 flex-shrink-0" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                       Upload Master PDF
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Select the file you wish to split apart.
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
                            {formatSize(file.size)} • {totalPages} Pages Total
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={removeFile} className="text-slate-400 hover:text-red-500 shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    {!processedUrl ? (
                      <div className="space-y-6">
                        <div className="space-y-3">
                           <Label htmlFor="page-input" className="text-base text-slate-700 dark:text-slate-300">
                             Pages to Extract:
                           </Label>
                           <Input 
                             id="page-input"
                             placeholder="e.g. 1-5, 8, 11-13" 
                             value={pageSelection}
                             onChange={(e) => setPageSelection(e.target.value)}
                             className="text-lg py-6 focus-visible:ring-purple-500"
                           />
                           <p className="text-xs text-slate-500">
                            Provide numbers separated by commas for individual extractions or dashes for contiguous ranges.
                           </p>
                        </div>

                        <Button
                          size="lg"
                          className="w-full px-8 py-6 rounded-2xl text-lg group bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={splitPdf}
                          disabled={isProcessing || !pageSelection.trim()}
                        >
                          {isProcessing ? (
                            <>
                              <Scissors className="w-6 h-6 mr-2 animate-pulse" />
                              Extracting Iterations...
                            </>
                          ) : (
                            <>
                              <Scissors className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                              Split PDF
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-2xl p-6 text-center animate-[fadeIn_0.5s_ease-out]">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          Split Successful!
                        </h3>
                         <p className="text-slate-600 mb-6 text-sm">
                          Your specific pages have been isolated into a new file.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto rounded-xl gap-2 font-medium bg-purple-600 hover:bg-purple-700"
                          >
                            <a href={processedUrl} download={`Extracted_${file.name}`}>
                              <Download className="w-5 h-5" />
                              Download Selection
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={removeFile}
                            className="w-full sm:w-auto rounded-xl"
                          >
                            Split Another
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
            <h2>Effortlessly Split Overwhelming PDF Documents</h2>
            <p>
              When dealing with enormous handbooks, annual corporate compliance reports, or sprawling architectural blueprints sent as continuous 300-page portfolios, extracting just the few pages relevant to your specific task is daunting. The PDF Page Splitter cleanly severs specified pages out from the colossal parent structure, generating a pristine, lightweight custom document tailored exactly to your active workflow.
            </p>

            <h3>How The Local Page Targeting Strategy Works</h3>
            <p>
              To eliminate the massive computational delay associated with uploading a gigabyte-sized multi-page contract up into a cloud processing server, our platform relies on `pdf-lib` web-assembly modules directly seated within your current tab instance.
            </p>
            <p>
              You simply provide the raw mathematical syntax (eg. "1-12, 45, 102"). Under the hood, the client-side module parses through the parent Document Object Model (DOM), rips out the unique data streams exclusively governing the pages you've denoted, and weaves them elegantly into an isolated downloadable target file. In essence, it acts as a digital scalpel.
            </p>

            <h3>Data Confidentiality Guarantees</h3>
            <ul>
              <li><strong>Zero Wait Times:</strong> Extracting a single signature page out of a thousand-page docket happens instantly, instead of waiting for heavy network file transactions.</li>
              <li><strong>Strict Offline Security:</strong> For firms analyzing unreleased patents, employee HR terminations, or medical diagnostic scans, local-only splitting guarantees that these highly-sensitive files are never unknowingly mirrored onto third-party infrastructure.</li>
              <li><strong>Retains Formatting & Vector Text:</strong> Unlike simply taking a blurry screenshot of a page and converting that into a new PDF, isolating the direct page logic ensures the copied page flawlessly maintains all original high-definition graphical text vectorizations.</li>
            </ul>

            <hr className="my-8" />

            <h2>Common PDF Splitting Inquiries (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I extract hundreds of individual pages simultaneously?</h4>
                <p className="text-sm mt-1">Yes. You can supply broad continuous ranges (e.g. 1-250) or type out specific discontinuous pages (e.g. 4, 12, 16, 80). The interface will compile them identically according to your numeric input.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Does splitting a PDF damage the original master file?</h4>
                <p className="text-sm mt-1">Absolutely not. This utility reads the original document in a strict 'Read-Only' algorithmic state. The file currently residing on your local hard drive will remain entirely untouched during and after the copying iteration concludes.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">What happens if a page has a hyperlink?</h4>
                <p className="text-sm mt-1">Generally, interactive hyperlinks and structural form fields fully transition and survive the extraction leap into the newly split document, minimizing any workflow interruptions.</p>
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
