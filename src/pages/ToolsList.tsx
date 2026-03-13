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
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
          {/* Animated Background Orbs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-lighten" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-secondary/10 dark:bg-secondary/5 blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-lighten" style={{ animationDelay: "2s" }} />
          </div>

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
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
                className="relative max-w-xl mx-auto animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative glass-panel rounded-2xl flex items-center p-2">
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
                    <div className="flex items-end gap-3 mb-8 border-b border-slate-200/50 dark:border-white/10 pb-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary dark:text-primary-400 shadow-sm border border-primary/10">
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
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative h-full glass-panel border border-white/60 dark:border-white/10 rounded-3xl p-6 hover:-translate-y-1.5 transition-all duration-300">
                            {tool.badge && (
                              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white border-0 text-[10px] px-2.5 h-6 shadow-sm">
                                {tool.badge}
                              </Badge>
                            )}
                            
                            <div className="flex flex-col h-full">
                              <div className="mb-5">
                                <div className="w-14 h-14 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
                                  {tool.icon ? <tool.icon className="w-7 h-7" /> : <Zap className="w-7 h-7" />}
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
