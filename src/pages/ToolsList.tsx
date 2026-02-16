import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FileImage,
  Minimize2,
  Crop,
  Maximize,
  Image,
  UserSquare2,
  FileCheck,
  ArrowRight,
  Zap,
  LayoutGrid,
  Search,
  Sliders,
  FileType,
  Scissors,
  Smartphone,
  CreditCard,
  GraduationCap,
  Stamp,
  Printer,
  FileText,
  Layers
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Tool categories with specific icons for each tool
const toolCategories = [
  {
    title: "Popular Tools",
    icon: Zap,
    description: "Most used photo editing tools",
    tools: [
      { name: "Compress Image", href: "/compress-image", icon: Minimize2, desc: "Reduce file size efficiently", badge: "Hot" },
      { name: "Passport Photo Maker", href: "/passport-photo-editor", icon: UserSquare2, desc: "Create passport size photos", badge: "New" },
      { name: "SSC Photo Resizer", href: "/ssc-photo-resizer", icon: FileCheck, desc: "Resize for SSC exams" },
      { name: "JPEG to JPG", href: "/jpeg-to-jpg", icon: FileType, desc: "Convert JPEG to JPG format" },
    ]
  },
  {
    title: "Resize by Size (KB/MB)",
    icon: Minimize2,
    description: "Compress photos to specific file sizes",
    tools: [
      { name: "Resize to 15KB", href: "/photo-resize-15kb", icon: Minimize2 },
      { name: "Resize to 20KB", href: "/resize-photo-20kb", icon: Minimize2 },
      { name: "Resize to 30KB", href: "/photo-resize-30kb", icon: Minimize2 },
      { name: "Resize to 40KB", href: "/photo-resize-40kb", icon: Minimize2 },
      { name: "Resize to 50KB", href: "/resize-photo-50kb", icon: Minimize2, badge: "Popular" },
      { name: "Resize to 80KB", href: "/photo-resize-80kb", icon: Minimize2 },
      { name: "Resize to 100KB", href: "/photo-resize-100kb", icon: Minimize2 },
      { name: "Resize to 150KB", href: "/photo-resize-150kb", icon: Minimize2 },
      { name: "Resize to 200KB", href: "/photo-resize-200kb", icon: Minimize2 },
      { name: "Resize to 500KB", href: "/photo-resize-500kb", icon: Minimize2 },
      { name: "Resize to 1MB", href: "/photo-resize-1mb", icon: Minimize2 },
      { name: "Resize to 2MB", href: "/photo-resize-2mb", icon: Minimize2 },
      { name: "Resize by KB", href: "/photo-resize-by-kb", icon: Sliders },
      { name: "Resize MB to KB", href: "/photo-resize-mb-to-kb", icon: ArrowRight },
    ]
  },
  {
    title: "Resize by Dimensions",
    icon: Maximize,
    description: "Resize photos to specific width and height",
    tools: [
      { name: "Resize in Pixels", href: "/photo-resize-in-px", icon: Maximize },
      { name: "Resize in CM", href: "/photo-resize-cm", icon: Maximize },
      { name: "Resize by Width & Height", href: "/photo-resize-width-height", icon: Maximize },
      { name: "Resize and Crop", href: "/photo-resize-and-crop", icon: Crop },
      { name: "Photo Resize Tool", href: "/photo-resize-tool", icon: Scissors },
    ]
  },
  {
    title: "Converters & Formats",
    icon: FileImage,
    description: "Convert between different image formats",
    tools: [
      { name: "JPEG to JPG", href: "/jpeg-to-jpg", icon: FileType },
      { name: "JPG to PNG", href: "/jpg-to-png", icon: FileImage },
      { name: "Photo Resize PDF", href: "/photo-resize-pdf", icon: FileText },
    ]
  },
  {
    title: "Specialized Tools",
    icon: LayoutGrid,
    description: "Tools for specific platforms and uses",
    tools: [
      { name: "For Instagram", href: "/photo-resize-for-instagram", icon: Image },
      { name: "For PAN Card", href: "/photo-resize-for-pan-card", icon: CreditCard },
      { name: "For UPSC", href: "/upsc-photo-size", icon: GraduationCap },
      { name: "IBPS Signature", href: "/signature-resize-ibps", icon: Stamp },
      { name: "Photo Resize App", href: "/photo-resize-app", icon: Smartphone },
      { name: "Bulk Resizer", href: "/photo-resize-bulk", icon: Layers },
      { name: "Resize Without Quality Loss", href: "/photo-resize-without-losing-quality", icon: Zap },
    ]
  }
];

export default function ToolsList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tools based on search
  const filteredCategories = toolCategories.map(cat => ({
    ...cat,
    tools: cat.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.tools.length > 0);

  return (
    <>
      <Helmet>
        <title>All Photo Tools – Resize, Compress & Convert Online</title>
        <meta name="description" content="Explore our complete collection of free online photo tools. Resize by KB/MB, pixel, or cm. Convert formats, crop, and compress images instantly." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Header />
        
        <main className="flex-1 relative overflow-hidden">
          {/* Background Gradients - Adjusted for both modes */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-100/50 to-slate-50/0 dark:from-indigo-900/20 dark:to-slate-900/0 pointer-events-none transition-colors duration-500" />
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-600/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 dark:bg-cyan-600/10 blur-[100px] pointer-events-none" />

          <div className="container relative px-4 py-16 md:py-24">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 animate-[fadeInDown_0.5s_ease-out]"
              >
                <Zap className="w-4 h-4" />
                <span>All-in-One Photo Suite</span>
              </div>
              
              <h1 
                className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight animate-[fadeInUp_0.6s_ease-out_0.1s_both]"
              >
                All Important Tools for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
                  Every Photo Need
                </span>
              </h1>
              
              <p 
                className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed animate-[fadeIn_0.6s_ease-out_0.2s_both]"
              >
                Resize, compress, convert, and edit your images with our comprehensive suite of free tools. 
                Fast, secure, and running entirely in your browser.
              </p>

              {/* Search Bar */}
              <div 
                className="relative max-w-xl mx-auto animate-[fadeInUp_0.5s_ease-out_0.3s_both]"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 dark:opacity-25 dark:group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl flex items-center p-2 shadow-xl dark:shadow-2xl">
                    <Search className="w-5 h-5 text-slate-400 ml-3" />
                    <Input 
                      type="text" 
                      placeholder="Search tools (e.g., 'compress', 'passport', 'instagram')..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-0 text-base h-11"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="space-y-16">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, idx) => (
                  <section
                    key={category.title}
                    className="scroll-mt-20 animate-[fadeInUp_0.6s_ease-out_both]"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-end gap-4 mb-8 border-b border-slate-200 dark:border-white/5 pb-4">
                      <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {category.title}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {category.tools.map((tool) => (
                        <Link 
                          key={tool.href} 
                          to={tool.href}
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-indigo-500/10 dark:to-cyan-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none">
                            {tool.badge && (
                              <Badge className="absolute top-4 right-4 bg-indigo-500 hover:bg-indigo-600 text-[10px] px-2 h-5">
                                {tool.badge}
                              </Badge>
                            )}
                            
                            <div className="flex flex-col h-full">
                              <div className="mb-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                  {tool.icon ? <tool.icon className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                                </div>
                              </div>
                              
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {tool.name}
                              </h3>
                              
                              {tool.desc && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                                  {tool.desc}
                                </p>
                              )}
                              
                              <div className="mt-auto flex items-center text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                Open Tool <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <div 
                  className="text-center py-20 animate-[fadeIn_0.3s_ease-out]"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No tools found</h3>
                  <p className="text-slate-500 dark:text-slate-400">Try searching for something else like "compress" or "passport"</p>
                </div>
              )}
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
