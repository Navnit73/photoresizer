import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { blogData } from '@/data/blogData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Search, X, FileText, Calendar, Camera, HardDrive, Ruler, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import AdUnit from '@/components/shared/AdUnit';

export default function BlogList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dynamically extract unique categories from blogData
  const allCategories = ["All", ...new Set(blogData.map(post => post.category).filter(Boolean))];
  
  // Sort categories logically
  const categoryOrder = ["All", "Exam Guides", "Official IDs", "Technical Tools", "UPSC", "SSC", "Banking", "State Exams", "Social Media", "Tools & Utilities", "Software Troubleshooting"];
  const categories = categoryOrder.filter(cat => allCategories.includes(cat));

  // Filter logic
  const filteredPosts = blogData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Helper function to get specification badge
  const getSpecBadge = (post: typeof blogData[0] & { specifications?: { totalVacancies?: string | number, fileSize?: string, dimensions?: string } }) => {
    if (post.specifications?.fileSize && post.specifications.fileSize !== "-") {
      return post.specifications.fileSize;
    }
    if (post.specifications?.dimensions && post.specifications.dimensions !== "-" && post.specifications.dimensions !== "Any") {
      return post.specifications.dimensions;
    }
    if (post.category === "Exam Guides" && post.specifications?.totalVacancies) {
      return `${post.specifications.totalVacancies} Vacancies`;
    }
    return "Free Tool";
  };

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Official IDs":
        return <Camera className="w-4 h-4" />;
      case "Technical Tools":
        return <HardDrive className="w-4 h-4" />;
      case "Exam Guides":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO 
        title="Form Photo Specifications & Guidelines Blog | Photo Resizer Pro"
        description="Complete guide for government exam photo and signature requirements. UPSC, SSC, IBPS, and State exam photo specifications explanations and resizing tips. Updated 2026."
      />
      
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center mb-20 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-100/50 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
            <BookOpen className="w-4 h-4" />
            <span>Knowledge Base • Updated {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Photo Specifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Guides</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Everything you need to know about photo and signature requirements for various government exams and official documents in India.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-2xl mx-auto relative mb-12 group">
            <div className="absolute inset-0 bg-blue-200/20 dark:bg-blue-500/10 blur-xl rounded-full opacity-50 transition-opacity group-hover:opacity-100" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
            <Input 
              type="text" 
              placeholder="Search guides (e.g., UPSC, 20KB, Driving License, Passport)..." 
              className="pl-12 pr-12 py-7 text-lg rounded-full shadow-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all relative z-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
             {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                  ${selectedCategory === cat 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }
                `}
              >
                {getCategoryIcon(cat)}
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* AdSense Unit - Below Hero */}
        <div className="mb-12">
            <AdUnit />
        </div>

        {/* ================= POSTS GRID ================= */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.slug} to={`/${post.slug}`} className="group h-full block">
                <Card className="h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-800">
                  
                  <CardHeader className="pb-4 pt-6 px-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 rounded-md px-2 py-1 flex items-center gap-1">
                        {getCategoryIcon(post.category)}
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-slate-400 font-medium">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.lastUpdated || "2026"}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 mt-auto">
                     <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                       {post.metaDescription}
                     </p>
                     
                     <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400">
                                {post.category === "Official IDs" ? <Camera className="w-4 h-4" /> : 
                                 post.category === "Technical Tools" ? <HardDrive className="w-4 h-4" /> : 
                                 post.category === "Exam Guides" ? <BookOpen className="w-4 h-4" /> : 
                                 <FileText className="w-4 h-4" />}
                            </span>
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                                  {post.category === "Exam Guides" ? "VACANCIES/REQ" : 
                                   post.specifications?.fileSize && post.specifications.fileSize !== "-" ? "MAX SIZE" : 
                                   post.specifications?.dimensions && post.specifications.dimensions !== "-" ? "DIMENSIONS" : 
                                   "REQUIREMENT"}
                                </span>
                                {getSpecBadge(post)}
                            </div>
                        </div>

                        <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-0 h-auto font-semibold text-sm group-hover:underline decoration-2 underline-offset-4">
                          Read Guide <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                     </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
               <Search className="w-8 h-8 text-slate-400" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No guides found</h3>
             <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
               We couldn't find any guides matching "{searchQuery}" in {selectedCategory}.
             </p>
             <Button 
               variant="outline" 
               className="mt-6 border-slate-200 dark:border-slate-700"
               onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
             >
               Clear all filters
             </Button>
          </div>
        )}

        {/* ================= CTA ================= */}
        <section className="mt-24 text-center bg-slate-900 dark:bg-black rounded-3xl p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to resize your documents?</h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
              Our AI-powered tool automatically handles strict dimension and size requirements for all the exams and documents listed above. Secure, fast, and free.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-7 h-auto text-lg shadow-xl shadow-blue-500/20 border-none transition-all transform hover:-translate-y-1"
              onClick={() => navigate('/')}
            >
              Open Photo Resizer
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}