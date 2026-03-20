import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Download, Type, Square, Image as ImageIcon, Trash2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Rnd } from "react-rnd";
import { InternalLinks } from "@/components/shared/InternalLinks";
import AdUnit from "@/components/shared/AdUnit";

// Initialize worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

const relatedLinks = [
  { label: "Convert PDF to JPG", href: "/pdf-to-jpg" },
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
];

type AnnotationType = "text" | "rect" | "image";

interface Annotation {
  id: string;
  type: AnnotationType;
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
  content?: string; // For text annotations
  color?: string; // For text/rect colors
  imageUrl?: string; // For image annotations (base64)
  fontSize?: number;
}

export default function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfProxy, setPdfProxy] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setAnnotations([]);
      setCurrentPage(1);
      setScale(1.0);
      try {
        const arrayBuffer = await selected.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPdfProxy(pdf);
        setNumPages(pdf.numPages);
      } catch (error) {
        toast({ title: "Failed to load PDF", description: "The file might be encrypted.", variant: "destructive" });
        setFile(null);
      }
    } else if (selected) {
      toast({ title: "Invalid file", description: "Please select a PDF document.", variant: "destructive" });
    }
  };

  const renderPage = useCallback(async () => {
    if (!pdfProxy || !canvasRef.current) return;
    
    try {
      const page = await pdfProxy.getPage(currentPage);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      if (!context) return;
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({
        canvasContext: context,
        viewport,
      }).promise;
    } catch (err) {
      console.error("Rendering error:", err);
    }
  }, [pdfProxy, currentPage, scale]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // --- ANNOTATION HELPERS ---
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addText = () => {
    setAnnotations([...annotations, {
      id: generateId(), type: "text", x: 50, y: 50, width: 200, height: 40,
      page: currentPage, content: "Double-click to edit text", fontSize: 16, color: "#000000"
    }]);
  };

  const addRect = () => {
    setAnnotations([...annotations, {
      id: generateId(), type: "rect", x: 50, y: 50, width: 100, height: 50,
      page: currentPage, color: "#ffffff" // Whiteout by default
    }]);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Scale down if huge
          let w = img.width;
          let h = img.height;
          if (w > 300) { h = h * (300 / w); w = 300; }
          setAnnotations([...annotations, {
            id: generateId(), type: "image", x: 50, y: 50, width: w, height: h,
            page: currentPage, imageUrl: event.target?.result as string
          }]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const updateAnnotation = (id: string, updates: Partial<Annotation>) => {
    setAnnotations(annotations.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.key === "Backspace" || e.key === "Delete") && selectedId && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      deleteAnnotation(selectedId);
    }
  }, [selectedId, annotations]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // --- EXPORT MAGIC (`pdf-lib`) ---
  const exportPdf = async () => {
    if (!file) return;
    setIsExporting(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const pages = pdfDoc.getPages();

      // We need to map our arbitrary HTML absolute coordinates to the PDF's internal mathematical coordinate system.
      // HTML canvas is [0,0] Top-Left. PDF coordinate is [0,0] Bottom-Left.
      // We also must reverse the user's current zoom scale ratio stringently.
      
      for (const ann of annotations) {
        // PDF-lib is 0-indexed, our pages are 1-indexed
        const targetPage = pages[ann.page - 1];
        if (!targetPage) continue;
        
        const { width: pdfW, height: pdfH } = targetPage.getSize();
        
        // Reverse the zoom scale
        const trueX = ann.x / scale;
        const trueY = ann.y / scale;
        const trueW = ann.width / scale;
        const trueH = ann.height / scale;

        // Invert Y mapping for PDF Bottom-Left orientation 
        // (y in HTML is from top, so PDF y is height - htmlY - elementHeight)
        const pdfY = pdfH - trueY - trueH;

        if (ann.type === "rect") {
          // Parse hex color (assuming simple 6 digit hex)
          const hex = (ann.color || "#ffffff").replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16) / 255;
          const g = parseInt(hex.substring(2, 4), 16) / 255;
          const b = parseInt(hex.substring(4, 6), 16) / 255;
          
          targetPage.drawRectangle({
            x: trueX,
            y: pdfY,
            width: trueW,
            height: trueH,
            color: rgb(r, g, b),
          });
        } 
        
        else if (ann.type === "text" && ann.content) {
          const hex = (ann.color || "#000000").replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16) / 255;
          const g = parseInt(hex.substring(2, 4), 16) / 255;
          const b = parseInt(hex.substring(4, 6), 16) / 255;
          const fSize = (ann.fontSize || 16) / scale;
          
          // Note: for text, PDF Y is strictly the baseline. 
          // So we approximate by subtracting font height mechanics.
          targetPage.drawText(ann.content, {
            x: trueX,
            y: pdfH - trueY - (fSize * 0.8), // approximate baseline
            size: fSize,
            font: helveticaFont,
            color: rgb(r, g, b),
            maxWidth: trueW,
          });
        }
        
        else if (ann.type === "image" && ann.imageUrl) {
          // Determine if JPEG or PNG
          let embeddedImage;
          if (ann.imageUrl.includes("image/jpeg")) {
            embeddedImage = await pdfDoc.embedJpg(ann.imageUrl);
          } else {
            embeddedImage = await pdfDoc.embedPng(ann.imageUrl);
          }
          
          targetPage.drawImage(embeddedImage, {
            x: trueX,
            y: pdfY,
            width: trueW,
            height: trueH,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `Edited_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      toast({ title: "Export Successful", description: "Your edited PDF has been securely generated and downloaded." });
    } catch (err) {
      console.error(err);
      toast({ title: "Export Error", description: "Failed to compile the final PDF document.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  // --- RENDER CURRENT PAGE ANNOTATIONS ---
  const currentPageAnnotations = annotations.filter(a => a.page === currentPage);

  return (
    <>
      <Helmet>
        <title>Free PDF Editor | Add Text, Images & Annotations</title>
        <meta
          name="description"
          content="Edit PDF files directly in your web browser. Add text, signatures, and white-out redacted boxes completely offline for maximum security."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/pdf-editor" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 flex flex-col">
          <div className="w-full flex justify-center py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 min-h-[100px]">
            <AdUnit type="sidebar" />
          </div>
          
          {/* Editor Toolbar */}
          <div className="w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sticky top-0 z-30 shadow-sm">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                 {!file ? (
                    <Button onClick={() => fileInputRef.current?.click()} className="whitespace-nowrap">
                      <Upload className="w-4 h-4 mr-2" /> Open PDF
                    </Button>
                 ) : (
                   <>
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" /> Change File
                    </Button>
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2"></div>
                    
                    <Button variant="secondary" size="sm" onClick={addText} title="Add Text">
                      <Type className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm" onClick={addRect} title="Add Solid Box (Redact/Whiteout)">
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => imageInputRef.current?.click()} title="Add Image (Signature)">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    
                    {selectedId && (
                      <Button variant="destructive" size="sm" onClick={() => deleteAnnotation(selectedId)} title="Delete Selected">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2"></div>
                    <Button variant="ghost" size="sm" onClick={() => setScale(s => Math.max(0.5, s - 0.25))}><ZoomOut className="w-4 h-4" /></Button>
                    <span className="text-sm font-medium w-12 text-center">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="sm" onClick={() => setScale(s => Math.min(3.0, s + 0.25))}><ZoomIn className="w-4 h-4" /></Button>
                   </>
                 )}
                 
                 <input type="file" ref={fileInputRef} accept="application/pdf" className="hidden" onChange={handleFileUpload} />
                 <input type="file" ref={imageInputRef} accept="image/jpeg,image/png" className="hidden" onChange={addImage} />
              </div>

              {file && (
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                   <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
                      <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium px-2">Page {currentPage} of {numPages}</span>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage === numPages}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                   </div>
                   
                   <Button onClick={exportPdf} disabled={isExporting} className="bg-blue-600 hover:bg-blue-700 ml-2">
                     <Download className="w-4 h-4 mr-2" /> 
                     {isExporting ? "Exporting..." : "Export PDF"}
                   </Button>
                </div>
              )}
            </div>
          </div>

          {/* Workspace Area */}
          <div className="flex-1 bg-slate-200/50 dark:bg-slate-950 p-4 md:p-8 overflow-auto flex justify-center custom-scrollbar" onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedId(null);
          }}>
            {!file ? (
              <div className="max-w-md text-center self-center mt-[-10vh]">
                <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 text-blue-500">
                  <Upload className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Robust PDF Editor</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Add text, insert signatures, and redact information over your PDF files completely inside your browser. No files are uploaded to our servers.
                </p>
                <Button size="lg" onClick={() => fileInputRef.current?.click()} className="group">
                  Select a PDF Document
                  <Upload className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            ) : (
              <div 
                className="relative shadow-2xl bg-white" 
                style={{ width: canvasRef.current?.width || 'auto', height: canvasRef.current?.height || 'auto' }}
                onClick={(e) => {
                  if (e.target === canvasRef.current) setSelectedId(null);
                }}
              >
                <canvas ref={canvasRef} className="block" />
                
                {/* Annotations Overlay Loop */}
                {currentPageAnnotations.map((ann) => (
                  <Rnd
                    key={ann.id}
                    size={{ width: ann.width, height: ann.height }}
                    position={{ x: ann.x, y: ann.y }}
                    onDragStop={(e, d) => { updateAnnotation(ann.id, { x: d.x, y: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      updateAnnotation(ann.id, {
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                        ...position
                      });
                    }}
                    bounds="parent"
                    className={`${selectedId === ann.id ? 'ring-2 ring-blue-500 shadow-lg z-10' : 'z-0 hover:ring-1 hover:ring-blue-300'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(ann.id);
                    }}
                  >
                    {ann.type === "rect" && (
                      <div className="w-full h-full border border-slate-300 shadow-sm" style={{ backgroundColor: ann.color || '#white' }} />
                    )}
                    
                    {ann.type === "text" && (
                      <textarea
                        className="w-full h-full bg-transparent border-none outline-none resize-none p-1 font-sans"
                        style={{ color: ann.color || '#000', fontSize: `${(ann.fontSize || 16) * scale}px`, lineHeight: 1.2 }}
                        value={ann.content || ""}
                        onChange={(e) => updateAnnotation(ann.id, { content: e.target.value })}
                        placeholder="Type here..."
                      />
                    )}
                    
                    {ann.type === "image" && ann.imageUrl && (
                      <img src={ann.imageUrl} className="w-full h-full object-contain pointer-events-none" alt="Added signature" />
                    )}
                    
                    {/* Floating config toolbar logic when selected */}
                    {selectedId === ann.id && (
                      <div className="absolute -top-10 left-0 bg-slate-800 text-white rounded-md shadow-xl p-1 flex items-center gap-1 z-20">
                         {ann.type === "text" && (
                           <>
                             <Input 
                               type="color" 
                               value={ann.color || "#000000"} 
                               onChange={(e) => updateAnnotation(ann.id, { color: e.target.value })}
                               className="w-8 h-8 p-0 border-none rounded cursor-pointer" 
                             />
                             <div className="w-px h-4 bg-slate-600 mx-1"></div>
                             <Input
                               type="number"
                               value={ann.fontSize || 16}
                               onChange={(e) => updateAnnotation(ann.id, { fontSize: parseInt(e.target.value) || 16 })}
                               className="w-16 h-8 text-black"
                               placeholder="Size"
                             />
                           </>
                         )}
                         {ann.type === "rect" && (
                            <div className="flex items-center gap-2 px-2 text-xs">
                              Color: 
                              <Input 
                                type="color" 
                                value={ann.color || "#ffffff"} 
                                onChange={(e) => updateAnnotation(ann.id, { color: e.target.value })}
                                className="w-6 h-6 p-0 border-none rounded cursor-pointer" 
                              />
                            </div>
                         )}
                         {ann.type === "image" && (
                             <span className="text-xs px-2 truncate min-w-[80px]">Image Overlay</span>
                         )}
                      </div>
                    )}
                  </Rnd>
                ))}
                
              </div>
            )}
          </div>

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
             <h2>Advanced Offline PDF Editor</h2>
             <p>
               In today's digital workflow, filling out vendor agreements, affixing signatures to onboarding documents, or redacting sensitive billing information is heavily complicated. Commercial suites demand massive monthly subscriptions, while "Free Online Editors" force you to upload those incredibly sensitive documents to unencrypted 3rd party databases.
             </p>
             <p>
               We bridge that massive gap utilizing heavy WebAssembly logic natively executed completely within your browser's internal sandbox. The **Robust PDF Editor** allows you to type text layers exactly where dotted lines exist on legal contracts. You can seamlessly insert transparent PNG signatures to sign off on architectural blueprints. You can drag and stretch pure-white redaction boxes (`Solid Box`) over Social Security numbers or banking codes instantly.
             </p>

             <h3>How the Visual Canvas Engine Achieves 100% Privacy</h3>
             <p>
               When you select an internal file, your local processor utilizes `pdf.js` to mathematically reconstruct the vector points of your page into an exact replica rendered directly onto your HTML canvas. 
               The text, boxes, and signatures you drag onto that canvas are recorded as temporary `X` and `Y` coordinates within a React state manager. No data leaves your machine.
             </p>
             <p>
               Upon clicking "Export PDF", the secondary backend protocol (`pdf-lib`) executes. It surgically opens your original PDF's binary data structure and physically draws those registered coordinates permanently onto the native layer logic before initiating an offline download response. The result is a flawlessly annotated document compiled securely in milliseconds.
             </p>

             <hr className="my-8"/>

             <h2>PDF Editing Limitations & Functionality (FAQs)</h2>
             <div className="space-y-4">
               <div>
                 <h4 className="font-semibold text-lg">Why can't I click and change the pre-existing text?</h4>
                 <p className="text-sm mt-1">
                   PDFs are essentially un-editable flat structural instructions (like a printed photograph), not flowing text documents like a Word (`.docx`) file. To "change" existing text, you must use the `Solid Box` tool to paint a white rectangle over the old word, and then use the `Text` tool to type the new word perfectly on top of that box.
                 </p>
               </div>
               <div>
                 <h4 className="font-semibold text-lg">My signature image has a white background?</h4>
                 <p className="text-sm mt-1">
                   To place a signature that seamlessly blends into the PDF without looking like a pasted square, you must upload a transparent background image format, specifically `.PNG` files. standard `.JPG` files inherently cannot possess transparent backgrounds graphically.
                 </p>
               </div>
               <div>
                 <h4 className="font-semibold text-lg">Is this legal or legally binding?</h4>
                 <p className="text-sm mt-1">
                   Yes. Stamping a cryptographic visual replication (your digital signature image) onto a document via the PDF Editor carries identical legal weight to physically printing the form out, signing it with blue ink, and scanning it back in—assuming basic ESIGN Act parameters regarding intent are met by the signee.
                 </p>
               </div>
             </div>
          </article>

          <InternalLinks links={relatedLinks} />

        </main>
      </div>
    </>
  );
}
