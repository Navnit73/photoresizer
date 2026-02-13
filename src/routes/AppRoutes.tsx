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
const ResizePhoto50KB = lazy(() => import('@/pages/tools/ResizePhoto50KB'));
const PassportPhotoEditor = lazy(() => import('@/pages/tools/PassportPhotoEditor'));

// Programmatic SEO pages – KB targets
const PhotoResize15KB = lazy(() => import('@/pages/tools/PhotoResize15KB'));
const PhotoResize30KB = lazy(() => import('@/pages/tools/PhotoResize30KB'));
const PhotoResize40KB = lazy(() => import('@/pages/tools/PhotoResize40KB'));
const PhotoResize80KB = lazy(() => import('@/pages/tools/PhotoResize80KB'));
const PhotoResize100KB = lazy(() => import('@/pages/tools/PhotoResize100KB'));
const PhotoResize150KB = lazy(() => import('@/pages/tools/PhotoResize150KB'));
const PhotoResize200KB = lazy(() => import('@/pages/tools/PhotoResize200KB'));
const PhotoResize500KB = lazy(() => import('@/pages/tools/PhotoResize500KB'));
const PhotoResize1MB = lazy(() => import('@/pages/tools/PhotoResize1MB'));
const PhotoResize2MB = lazy(() => import('@/pages/tools/PhotoResize2MB'));

// Programmatic SEO pages – general/feature
const PhotoResizeByKB = lazy(() => import('@/pages/tools/PhotoResizeByKB'));
const PhotoResizeInKB = lazy(() => import('@/pages/tools/PhotoResizeInKB'));
const PhotoResizePixel = lazy(() => import('@/pages/tools/PhotoResizePixel'));
const PhotoResizeOnline = lazy(() => import('@/pages/tools/PhotoResizeOnline'));
const PhotoResizeFree = lazy(() => import('@/pages/tools/PhotoResizeFree'));
const PhotoResizeInPX = lazy(() => import('@/pages/tools/PhotoResizeInPX'));
const PhotoResizeCM = lazy(() => import('@/pages/tools/PhotoResizeCM'));
const PhotoResizeWidthHeight = lazy(() => import('@/pages/tools/PhotoResizeWidthHeight'));
const PhotoResizeAndCrop = lazy(() => import('@/pages/tools/PhotoResizeAndCrop'));
const PhotoResizeMB = lazy(() => import('@/pages/tools/PhotoResizeMB'));
const PhotoResizeMBToKB = lazy(() => import('@/pages/tools/PhotoResizeMBToKB'));
const PhotoResizeDPI = lazy(() => import('@/pages/tools/PhotoResizeDPI'));
const PhotoResizePDF = lazy(() => import('@/pages/tools/PhotoResizePDF'));
const PhotoResizeBulk = lazy(() => import('@/pages/tools/PhotoResizeBulk'));
const PhotoResizeWithoutLosingQuality = lazy(() => import('@/pages/tools/PhotoResizeWithoutLosingQuality'));

// Programmatic SEO pages – use-case specific
const PhotoResizeForPanCard = lazy(() => import('@/pages/tools/PhotoResizeForPanCard'));
const PhotoResizeForInstagram = lazy(() => import('@/pages/tools/PhotoResizeForInstagram'));
const PhotoResizeForSSC = lazy(() => import('@/pages/tools/PhotoResizeForSSC'));
const PhotoResizePassportSize = lazy(() => import('@/pages/tools/PhotoResizePassportSize'));
const PhotoResizeApp = lazy(() => import('@/pages/tools/PhotoResizeApp'));
const PhotoResizeTool = lazy(() => import('@/pages/tools/PhotoResizeTool'));
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
        <Route path="/resize-photo-50kb" element={<ResizePhoto50KB />} />
        <Route path="/passport-photo-editor" element={<PassportPhotoEditor />} />
        
        {/* Programmatic SEO pages – KB targets */}
        <Route path="/photo-resize-15kb" element={<PhotoResize15KB />} />
        <Route path="/photo-resize-30kb" element={<PhotoResize30KB />} />
        <Route path="/photo-resize-40kb" element={<PhotoResize40KB />} />
        <Route path="/photo-resize-80kb" element={<PhotoResize80KB />} />
        <Route path="/photo-resize-100kb" element={<PhotoResize100KB />} />
        <Route path="/photo-resize-150kb" element={<PhotoResize150KB />} />
        <Route path="/photo-resize-200kb" element={<PhotoResize200KB />} />
        <Route path="/photo-resize-500kb" element={<PhotoResize500KB />} />
        <Route path="/photo-resize-1mb" element={<PhotoResize1MB />} />
        <Route path="/photo-resize-2mb" element={<PhotoResize2MB />} />
        
        {/* Programmatic SEO pages – general/feature */}
        <Route path="/photo-resize-by-kb" element={<PhotoResizeByKB />} />
        <Route path="/photo-resize-in-kb" element={<PhotoResizeInKB />} />
        <Route path="/photo-resize-pixel" element={<PhotoResizePixel />} />
        <Route path="/photo-resize-online" element={<PhotoResizeOnline />} />
        <Route path="/photo-resize-free" element={<PhotoResizeFree />} />
        <Route path="/photo-resize-in-px" element={<PhotoResizeInPX />} />
        <Route path="/photo-resize-cm" element={<PhotoResizeCM />} />
        <Route path="/photo-resize-width-height" element={<PhotoResizeWidthHeight />} />
        <Route path="/photo-resize-and-crop" element={<PhotoResizeAndCrop />} />
        <Route path="/photo-resize-mb" element={<PhotoResizeMB />} />
        <Route path="/photo-resize-mb-to-kb" element={<PhotoResizeMBToKB />} />
        <Route path="/photo-resize-dpi" element={<PhotoResizeDPI />} />
        <Route path="/photo-resize-pdf" element={<PhotoResizePDF />} />
        <Route path="/photo-resize-bulk" element={<PhotoResizeBulk />} />
        <Route path="/photo-resize-without-losing-quality" element={<PhotoResizeWithoutLosingQuality />} />
        
        {/* Programmatic SEO pages – use-case specific */}
        <Route path="/photo-resize-for-pan-card" element={<PhotoResizeForPanCard />} />
        <Route path="/photo-resize-for-instagram" element={<PhotoResizeForInstagram />} />
        <Route path="/photo-resize-for-ssc" element={<PhotoResizeForSSC />} />
        <Route path="/photo-resize-passport-size" element={<PhotoResizePassportSize />} />
        <Route path="/photo-resize-app" element={<PhotoResizeApp />} />
        <Route path="/photo-resize-tool" element={<PhotoResizeTool />} />
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
