import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { blogData } from '@/data/blogData';
import { ArrowLeft, ArrowRight, Upload, Clock, CheckCircle2, AlertCircle, Share2, Printer, ChevronRight, Camera, FileImage, FileIcon, Ruler, HardDrive } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import AdUnit from '@/components/shared/AdUnit';

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogData.find(p => p.slug === slug);

  // Redirect to 404 if not found (or home for now)
  useEffect(() => {
    if (!post && slug) {
      console.log("Post not found:", slug);
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Post not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Helper function to extract numeric value from fileSize string
  const getFileSizeValue = (fileSize: string) => {
    const match = fileSize.match(/\d+/);
    return match ? match[0] : "20";
  };

  // Helper function to extract unit from fileSize string
  const getFileSizeUnit = (fileSize: string) => {
    if (fileSize.includes("KB")) return "KB";
    if (fileSize.includes("MB")) return "MB";
    return "";
  };

  // Determine icon based on category
  const getCategoryIcon = () => {
    if (post.category === "Official IDs") return <Camera className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />;
    if (post.category === "Technical Tools") return <FileImage className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />;
    if (post.category === "Exam Guides") return <FileIcon className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />;
    return <CheckCircle2 className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 font-sans selection:bg-blue-100 selection:text-blue-900">

      <SEO 
        title={post.metaTitle}
        description={post.metaDescription}
        type="article"
        publishedTime={new Date().toISOString()}
        modifiedTime={new Date().toISOString()}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.metaDescription,
            "image": "https://www.photoresizer.co.in/og-image.png",
            "author": {
              "@type": "Organization",
              "name": "Photo Resizer Pro"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Photo Resizer Pro",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.photoresizer.co.in/logo.png"
              }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString()
          },
          ...(post.faq?.length > 0 ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faq.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          }] : [])
        ]}
      />
      
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* ================= BREADCRUMB ================= */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-blue-700 transition-colors font-medium">Home</Link>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <Link to="/blog" className="hover:text-blue-700 transition-colors font-medium">Guides</Link>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className="text-slate-900 dark:text-white font-semibold">{post.category}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          
          {/* ================= MAIN CONTENT ================= */}
          <article className="min-w-0">
            
            {/* HERO HEADER */}
            <header className="mb-10">
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                 <div className="flex items-center">
                    <Badge variant="outline" className="rounded-md border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 px-2 py-0.5">
                      {post.category}
                    </Badge>
                 </div>
                 <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                    Updated {post.lastUpdated}
                 </div>
                 <div className="flex items-center text-slate-400">
                    &bull; {post.content.split(/\s+/).length > 300 ? '5' : '3'} min read
                 </div>
              </div>

              <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                {post.metaDescription}
              </p>
            </header>

            {/* CTA CARD (MOBILE ONLY) */}
            <div className="lg:hidden bg-slate-900 text-white rounded-xl p-6 mb-10 shadow-lg">
               <h3 className="font-bold text-lg mb-2">
                 {post.category === "Official IDs" ? `Resize ${post.title.split(' ').slice(0, 3).join(' ')}` : 
                  post.category === "Exam Guides" ? "Prepare Your Documents" : 
                  "Compress Your Photo"}
               </h3>
               <p className="text-slate-300 text-sm mb-4">
                 {post.specifications?.dimensions !== "-" && post.specifications?.dimensions !== "Any" ? 
                   `Get exact ${post.specifications.dimensions} under ${post.specifications.fileSize}` : 
                   `Meet ${post.specifications.fileSize} requirement instantly`}
               </p>
               <Button onClick={() => navigate('/')} className="w-full bg-blue-600 hover:bg-blue-500 font-bold" size="lg">
                 {post.category === "Technical Tools" ? "Compress Now" : "Resize Now"}
               </Button>
            </div>

            {/* AdSense Unit - Top of Content */}
            <div className="mb-10">
               <AdUnit />
            </div>

            {/* SPECIFICATION CARDS - DYNAMIC RENDERING */}
            {post.specifications && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  {getCategoryIcon()}
                  {post.category === "Exam Guides" ? "Exam Requirements at a Glance" : 
                   post.category === "Technical Tools" ? "Compression Specifications" : 
                   "Key Photo Requirements"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Dimensions Card - Show only if not placeholder */}
                  {post.specifications.dimensions && post.specifications.dimensions !== "-" && post.specifications.dimensions !== "Any" && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-start hover:border-blue-200 transition-colors group">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center w-full">
                        <Ruler className="w-3.5 h-3.5 mr-1.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        Dimensions
                      </span>
                      <div className="font-mono text-lg font-bold text-slate-900 dark:text-white break-words w-full">
                        {post.specifications.dimensions}
                      </div>
                      {post.slug.includes("passport") && (
                        <span className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">Indian Standard</span>
                      )}
                    </div>
                  )}

                  {/* File Size Card - Show only if not placeholder */}
                  {post.specifications.fileSize && post.specifications.fileSize !== "-" && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-start hover:border-blue-200 transition-colors group">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center w-full">
                        <HardDrive className="w-3.5 h-3.5 mr-1.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        File Size
                      </span>
                      <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                        {post.specifications.fileSize}
                      </div>
                      {post.specifications.fileSize.includes("10 KB") && (
                        <span className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">Strict limit</span>
                      )}
                    </div>
                  )}

                  {/* Format Card - Show only if not placeholder */}
                  {post.specifications.format && post.specifications.format !== "-" && post.specifications.format !== "Convert to .jpg" && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-start hover:border-blue-200 transition-colors group">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center w-full">
                        <FileImage className="w-3.5 h-3.5 mr-1.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        Format
                      </span>
                      <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                        {post.specifications.format}
                      </div>
                      {post.specifications.format.includes("JPG") && (
                        <span className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">Most compatible</span>
                      )}
                    </div>
                  )}

                  {/* Special case for JPEG to JPG converter */}
                  {post.slug === "convert-jpeg-to-jpg-online" && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-start hover:border-blue-200 transition-colors md:col-span-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                        <FileImage className="w-3.5 h-3.5 mr-1.5" />
                        Conversion Type
                      </span>
                      <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                        .jpeg → .jpg (Extension only, no recompression)
                      </div>
                      <span className="text-xs text-blue-600 dark:text-blue-400 mt-2">Original quality preserved • No data loss • Instant</span>
                    </div>
                  )}

                  {/* Special case for Exam Guides - show additional metrics */}
                  {post.category === "Exam Guides" && post.specifications.totalExams && (
                    <>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-start">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Total Exams</span>
                        <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">{post.specifications.totalExams}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-start">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Total Vacancies</span>
                        <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">{post.specifications.totalVacancies}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-start">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Application Status</span>
                        <div className="font-mono text-lg font-bold text-green-600 dark:text-green-400">{post.specifications.applicationStatus}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* DYNAMIC CONTENT */}
            <div className="max-w-[720px] mx-auto">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }} 
                className="prose prose-lg prose-slate dark:prose-invert max-w-none
                           prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                           prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight
                           prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:font-semibold
                           prose-p:text-lg prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-8 prose-p:mb-8
                           prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                           prose-li:my-3 prose-li:text-lg prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:marker:text-blue-500
                           prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6
                           prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-800 transition-colors
                           prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
                           prose-blockquote:border-l-[6px] prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-slate-800 dark:prose-blockquote:text-slate-200 prose-blockquote:my-10
                           prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10
                           marker:text-blue-500
                           prose-table:border-collapse prose-table:border prose-table:border-slate-200 dark:prose-table:border-slate-800 prose-table:my-10
                           prose-th:bg-slate-50 dark:prose-th:bg-slate-800/50 prose-th:p-3 prose-th:text-left prose-th:font-bold
                           prose-td:p-3 prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-800"
              />
            </div>

            {/* AdSense Unit - Bottom of Content */}
            <div className="mt-10">
               <AdUnit />
            </div>

            {/* FAQ SECTION */}
            {post.faq && post.faq.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center">
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 p-2 rounded-lg mr-3">
                    <AlertCircle className="w-6 h-6" />
                  </span>
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {post.faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 data-[state=open]:bg-white dark:data-[state=open]:bg-slate-900 data-[state=open]:shadow-md transition-all duration-200">
                      <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 px-4 py-4 text-lg hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 dark:text-slate-400 px-4 pb-4 leading-7 text-base">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* RELATED LINKS */}
            {post.relatedLinks && post.relatedLinks.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Related Guides</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {post.relatedLinks.map((link, idx) => (
                    <Link 
                      key={idx} 
                      to={link.path}
                      className="group flex p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 mb-2 transition-colors">
                          {link.title}
                        </h4>
                        <span className="text-sm text-blue-600 font-medium flex items-center group-hover:underline">
                          Read Guide <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
          </article>
          
          {/* ================= SIDEBAR ================= */}
          <aside className="sticky top-24 space-y-8 hidden lg:block">
            
            {/* AdSense Unit - Sidebar */}
            <AdUnit className="mb-8" />
            
            {/* Tool Card - Dynamically Updated */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full group-hover:bg-blue-500/30 transition-all pointer-events-none" />
              
              <h4 className="font-bold text-xl mb-2 relative z-10">
                {post.category === "Technical Tools" ? "Compress Your File" : 
                 post.category === "Exam Guides" ? "Prepare Documents" : 
                 `Resize ${post.category} Photo`}
              </h4>
              <p className="text-slate-300 text-sm mb-6 relative z-10">
                {post.specifications?.dimensions !== "-" && post.specifications?.dimensions !== "Any" ? 
                  `Get exact ${post.specifications.dimensions}` : 
                  post.category === "Exam Guides" ? "Get exam-ready photos instantly" :
                  `Meet ${post.specifications.fileSize} requirement`}
              </p>
              
              <div className="space-y-3 mb-8 relative z-10">
                {post.specifications?.dimensions && post.specifications.dimensions !== "-" && post.specifications.dimensions !== "Any" && (
                  <div className="flex items-center text-sm text-slate-200">
                     <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 text-green-400 font-bold">✓</div>
                     {post.specifications.dimensions}
                  </div>
                )}
                {post.specifications?.fileSize && post.specifications.fileSize !== "-" && (
                  <div className="flex items-center text-sm text-slate-200">
                     <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 text-green-400 font-bold">✓</div>
                     {post.specifications.fileSize}
                  </div>
                )}
                {post.specifications?.format && post.specifications.format !== "-" && post.specifications.format !== "Convert to .jpg" && (
                  <div className="flex items-center text-sm text-slate-200">
                     <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 text-green-400 font-bold">✓</div>
                     {post.specifications.format}
                  </div>
                )}
              </div>

              <Button onClick={() => navigate('/')} className="w-full font-bold bg-blue-600 hover:bg-blue-500 text-white h-12 shadow-lg shadow-blue-900/50" size="lg">
                {post.category === "Technical Tools" ? "Compress Now" : 
                 post.category === "Exam Guides" ? "Upload & Resize" : 
                 "Upload & Resize"}
              </Button>
            </div>

            {/* Share Card */}
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
               <h4 className="font-bold text-xs text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Help others</h4>
               <div className="flex gap-2">
                 <Button variant="outline" className="flex-1 gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                   <Share2 className="w-4 h-4" /> Share
                 </Button>
                 <Button variant="outline" className="flex-1 gap-2 hover:bg-slate-50 hover:text-slate-700">
                   <Printer className="w-4 h-4" /> Print
                 </Button>
               </div>
             </div>

          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}