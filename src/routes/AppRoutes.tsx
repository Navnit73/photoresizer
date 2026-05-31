import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Only Home is eagerly loaded (it's the landing page)
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

// Lazy load ALL other pages for better INP / reduced initial bundle
const SSCPhotoResizer = lazy(() => import('@/pages/ssc-photo-resizer'));
const UPSCPhotoSize = lazy(() => import('@/pages/upsc-photo-size'));
const ReducePhotoSize50KB = lazy(() => import('@/pages/reduce-photo-size-50kb'));
const SignatureResizeIBPS = lazy(() => import('@/pages/signature-resize-ibps'));
const DynamicPageResolver = lazy(() => import('@/pages/DynamicPageResolver'));
const BlogList = lazy(() => import('@/pages/BlogList'));

// Lazy load new SEO pages for better performance
const JpegToJpg = lazy(() => import('@/pages/tools/JpegToJpg'));
const CompressImage = lazy(() => import('@/pages/tools/CompressImage'));
const JpgToPng = lazy(() => import('@/pages/tools/JpgToPng'));
const ResizePhoto20KB = lazy(() => import('@/pages/tools/ResizePhoto20KB'));
const PassportPhotoEditor = lazy(() => import('@/pages/tools/PassportPhotoEditor'));
const PassportPhotoMaker = lazy(() => import('@/pages/tools/PassportPhotoMaker'));
const PassportSizePhotoMaker = lazy(() => import('@/pages/tools/PassportSizePhotoMaker'));
const PassportPhotoApp = lazy(() => import('@/pages/tools/PassportPhotoApp'));

// Foreign Exam Pages
const IELTSPhotoSize = lazy(() => import('@/pages/ielts-photo-size'));
const TOEFLPhotoSize = lazy(() => import('@/pages/toefl-photo-size'));
const SATPhotoSize = lazy(() => import('@/pages/sat-photo-size'));
const PTEPhotoSize = lazy(() => import('@/pages/pte-photo-size'));
const GREPhotoSize = lazy(() => import('@/pages/gre-photo-size'));
const GMATPhotoSize = lazy(() => import('@/pages/gmat-photo-size'));

// Visa Photo Tools
const UsVisaPhoto = lazy(() => import('@/pages/us-visa-photo'));
const CanadaVisaPhoto = lazy(() => import('@/pages/canada-visa-photo'));
const UkVisaPhoto = lazy(() => import('@/pages/uk-visa-photo'));
const AustraliaVisaPhoto = lazy(() => import('@/pages/australia-visa-photo'));

// PDF Tools
const PdfSizeReducer = lazy(() => import('@/pages/tools/PdfSizeReducer'));
const MergePdf = lazy(() => import('@/pages/tools/MergePdf'));
const SplitPdf = lazy(() => import('@/pages/tools/SplitPdf'));
const JpgToPdf = lazy(() => import('@/pages/tools/JpgToPdf'));
const PdfToJpg = lazy(() => import('@/pages/tools/PdfToJpg'));
// const PdfEditor = lazy(() => import('@/pages/tools/PdfEditor'));


// Legal pages
const PrivacyPolicy = lazy(() => import('@/pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/legal/TermsOfService'));

// Info pages
const About = lazy(() => import('@/pages/About'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Contact = lazy(() => import('@/pages/Contact'));

// Loading Component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-slate-600 dark:text-slate-300">Loading...</div>
    </div>
  );
}

// Lazy load ToolsList
const ToolsList = lazy(() => import('@/pages/ToolsList'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more-tools" element={<ToolsList />} />
        
        {/* Existing SEO pages */}
        <Route path="/ssc-photo-resizer" element={<SSCPhotoResizer />} />
        <Route path="/upsc-photo-size" element={<UPSCPhotoSize />} />
        <Route path="/reduce-photo-size-50kb" element={<ReducePhotoSize50KB />} />
        <Route path="/signature-resize-ibps" element={<SignatureResizeIBPS />} />
        
        {/* New tool pages */}
        <Route path="/jpeg-to-jpg" element={<JpegToJpg />} />
        <Route path="/compress-image" element={<CompressImage />} />
        <Route path="/jpg-to-png" element={<JpgToPng />} />
        <Route path="/resize-photo-20kb" element={<ResizePhoto20KB />} />
        <Route path="/passport-photo-editor" element={<PassportPhotoEditor />} />
        <Route path="/passport-photo-maker" element={<PassportPhotoMaker />} />
        <Route path="/passport-size-photo-maker" element={<PassportSizePhotoMaker />} />
        <Route path="/passport-photo-app" element={<PassportPhotoApp />} />
        
        {/* Foreign Exam SEO Pages */}
        <Route path="/ielts-photo-size" element={<IELTSPhotoSize />} />
        <Route path="/toefl-photo-size" element={<TOEFLPhotoSize />} />
        <Route path="/sat-photo-size" element={<SATPhotoSize />} />
        <Route path="/pte-photo-size" element={<PTEPhotoSize />} />
        <Route path="/gre-photo-size" element={<GREPhotoSize />} />
        <Route path="/gmat-photo-size" element={<GMATPhotoSize />} />

        {/* Visa Photo Tools */}
        <Route path="/us-visa-photo" element={<UsVisaPhoto />} />
        <Route path="/canada-visa-photo" element={<CanadaVisaPhoto />} />
        <Route path="/uk-visa-photo" element={<UkVisaPhoto />} />
        <Route path="/australia-visa-photo" element={<AustraliaVisaPhoto />} />
        
        {/* PDF Tools */}
        <Route path="/pdf-size-reducer" element={<PdfSizeReducer />} />
        <Route path="/merge-pdf" element={<MergePdf />} />
        <Route path="/split-pdf" element={<SplitPdf />} />
        <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
        <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
        {/* <Route path="/pdf-editor" element={<PdfEditor />} /> */}
        

        {/* Legal pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* Info pages */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogList />} />

        {/* Dynamic Pages: Exam Photo/Signature Resizer + Blog */}
        <Route path="/:slug" element={<DynamicPageResolver />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
