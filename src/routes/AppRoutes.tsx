import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Existing pages
import Home from '@/pages/Home';
import SSCPhotoResizer from '@/pages/ssc-photo-resizer';
import UPSCPhotoSize from '@/pages/upsc-photo-size';
import ReducePhotoSize50KB from '@/pages/reduce-photo-size-50kb';
import SignatureResizeIBPS from '@/pages/signature-resize-ibps';
import NotFound from '@/pages/NotFound';
import BlogPage from '@/pages/BlogPage';
import BlogList from '@/pages/BlogList';

// Lazy load new SEO pages for better performance
const JpegToJpg = lazy(() => import('@/pages/tools/JpegToJpg'));
const CompressImage = lazy(() => import('@/pages/tools/CompressImage'));
const JpgToPng = lazy(() => import('@/pages/tools/JpgToPng'));
const ResizePhoto20KB = lazy(() => import('@/pages/tools/ResizePhoto20KB'));
const PassportPhotoEditor = lazy(() => import('@/pages/tools/PassportPhotoEditor'));

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

// Programmatic SEO pages – KB targets
const PhotoResize15KB = lazy(() => import('@/pages/tools/PhotoResize15KB'));
const PhotoResize30KB = lazy(() => import('@/pages/tools/PhotoResize30KB'));
const PhotoResize40KB = lazy(() => import('@/pages/tools/PhotoResize40KB'));
const PhotoResize100KB = lazy(() => import('@/pages/tools/PhotoResize100KB'));
const PhotoResize150KB = lazy(() => import('@/pages/tools/PhotoResize150KB'));
const PhotoResize200KB = lazy(() => import('@/pages/tools/PhotoResize200KB'));
const PhotoResize500KB = lazy(() => import('@/pages/tools/PhotoResize500KB'));
const PhotoResize1MB = lazy(() => import('@/pages/tools/PhotoResize1MB'));
const PhotoResize2MB = lazy(() => import('@/pages/tools/PhotoResize2MB'));

// Programmatic SEO pages – general/feature
const PhotoResizeMBToKB = lazy(() => import('@/pages/tools/PhotoResizeMBToKB'));
const PhotoResizeDPI = lazy(() => import('@/pages/tools/PhotoResizeDPI'));
const PhotoResizePDF = lazy(() => import('@/pages/tools/PhotoResizePDF'));
const PhotoResizeBulk = lazy(() => import('@/pages/tools/PhotoResizeBulk'));

// Programmatic SEO pages – use-case specific
const PhotoResizeForInstagram = lazy(() => import('@/pages/tools/PhotoResizeForInstagram'));
const PhotoResizeApp = lazy(() => import('@/pages/tools/PhotoResizeApp'));
const HowToResizePhoto = lazy(() => import('@/pages/tools/HowToResizePhoto'));

// Legal pages
const PrivacyPolicy = lazy(() => import('@/pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/legal/TermsOfService'));

// Info pages
const About = lazy(() => import('@/pages/About'));
const FAQ = lazy(() => import('@/pages/FAQ'));

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
        
        {/* Programmatic SEO pages – KB targets */}
        <Route path="/photo-resize-15kb" element={<PhotoResize15KB />} />
        <Route path="/photo-resize-30kb" element={<PhotoResize30KB />} />
        <Route path="/photo-resize-40kb" element={<PhotoResize40KB />} />
        <Route path="/photo-resize-100kb" element={<PhotoResize100KB />} />
        <Route path="/photo-resize-150kb" element={<PhotoResize150KB />} />
        <Route path="/photo-resize-200kb" element={<PhotoResize200KB />} />
        <Route path="/photo-resize-500kb" element={<PhotoResize500KB />} />
        <Route path="/photo-resize-1mb" element={<PhotoResize1MB />} />
        <Route path="/photo-resize-2mb" element={<PhotoResize2MB />} />
        
        {/* Programmatic SEO pages – general/feature */}
        <Route path="/photo-resize-mb-to-kb" element={<PhotoResizeMBToKB />} />
        <Route path="/photo-resize-dpi" element={<PhotoResizeDPI />} />
        <Route path="/photo-resize-pdf" element={<PhotoResizePDF />} />
        <Route path="/photo-resize-bulk" element={<PhotoResizeBulk />} />
        
        {/* Programmatic SEO pages – use-case specific */}
        <Route path="/photo-resize-for-instagram" element={<PhotoResizeForInstagram />} />
        <Route path="/photo-resize-app" element={<PhotoResizeApp />} />
        <Route path="/how-to-resize-photo" element={<HowToResizePhoto />} />
        
        {/* Legal pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* Info pages */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<BlogList />} />

        {/* Dynamic Blog Pages */}
        <Route path="/:slug" element={<BlogPage />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
