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
  Layers,
  Sparkles
} from "lucide-react";
import AdUnit from "@/components/shared/AdUnit";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ExamDirectory } from "@/components/shared/ExamDirectory";

// Interface for tool objects
interface Tool {
  name: string;
  href: string;
  icon: React.ElementType;
  desc?: string;
  badge?: string;
}

// Tool categories with specific icons for each tool
const toolCategories: {
  title: string;
  icon: React.ElementType;
  description: string;
  tools: Tool[];
}[] = [
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
    title: "Resize by Dimensions",
    icon: Maximize,
    description: "Resize photos to specific width and height",
    tools: [
    ]
  },
  {
    title: "Converters & Formats",
    icon: FileImage,
    description: "Convert between different image formats",
    tools: [
      { name: "JPEG to JPG", href: "/jpeg-to-jpg", icon: FileType },
      { name: "JPG to PNG", href: "/jpg-to-png", icon: FileImage },
    ]
  },
  {
    title: "Specialized Tools",
    icon: LayoutGrid,
    description: "Tools for specific platforms and uses",
    tools: [
      { name: "For PAN Card", href: "/pan-card-photo-signature-resizer", icon: CreditCard },
      { name: "For UPSC", href: "/upsc-photo-size", icon: GraduationCap },
      { name: "For SSC", href: "/ssc-photo-resizer", icon: FileCheck },
      { name: "IBPS Signature", href: "/signature-resize-ibps", icon: Stamp },
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
          {/* Background removed for cleaner flat layout */}

          <div className="container relative px-4 py-16 md:py-24">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary dark:text-primary-400 text-sm font-bold tracking-wide mb-6 animate-fade-up shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>All-in-One Photo Suite</span>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                All Important Tools for <br />
                <span className="text-primary font-bold">
                  Every Photo Need
                </span>
              </h1>
              
              <p 
                className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed animate-[fadeIn_0.6s_ease-out_0.2s_both]"
              >
                Resize, compress, convert, and edit your images with our comprehensive suite of free tools. 
                Fast, secure, and running entirely in your browser.
              </p>

              <div 
                className="relative max-w-xl mx-auto animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="relative bg-card border border-border shadow-sm rounded-xl flex items-center p-2">
                  <Search className="w-5 h-5 text-muted-foreground ml-3" />
                  <Input 
                    type="text" 
                    placeholder="Search tools (e.g., 'compress', 'passport', 'instagram')..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-base h-11"
                  />
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="space-y-16">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, idx) => (
                  <div key={category.title}>
                    <section
                      className="scroll-mt-20 animate-[fadeInUp_0.6s_ease-out_both]"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="flex items-end gap-3 mb-8 border-b border-slate-200/50 dark:border-white/10 pb-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-sm border border-primary/20">
                          <category.icon className="w-6 h-6" />
                        </div>
                        <div className="pb-1">
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
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
                            className="group relative h-full bg-card border border-border rounded-xl p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200 block"
                          >
                              {tool.badge && (
                                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0 text-[10px] px-2.5 h-6 shadow-sm">
                                  {tool.badge}
                                </Badge>
                              )}
                              
                              <div className="flex flex-col h-full">
                                <div className="mb-5">
                                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                                    {tool.icon ? <tool.icon className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                                  </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-400 transition-colors">
                                  {tool.name}
                                </h3>
                                
                                {tool.desc && (
                                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-5 font-medium">
                                    {tool.desc}
                                  </p>
                                )}
                                
                                <div className="mt-auto flex items-center text-sm font-bold text-primary dark:text-primary-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                  Open Tool <ArrowRight className="w-4 h-4 ml-1.5" />
                                </div>
                              </div>
                            </Link>
                        ))}
                      </div>
                    </section>
                    {(idx === 0 || idx === 2) && (
                      <div className="w-full relative py-4 flex justify-center border-b border-slate-200/50 dark:border-white/10">
                        <AdUnit type="sidebar" />
                      </div>
                    )}
                  </div>
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
        
        <ExamDirectory />
        <Footer />
      </div>
    </>
  );
}
