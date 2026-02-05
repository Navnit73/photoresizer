import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Existing pages
import Home from '@/pages/Home';
import SSCPhotoResizer from '@/pages/ssc-photo-resizer';
import UPSCPhotoSize from '@/pages/upsc-photo-size';
import ReducePhotoSize50KB from '@/pages/reduce-photo-size-50kb';
import SignatureResizeIBPS from '@/pages/signature-resize-ibps';
import NotFound from '@/pages/NotFound';

// Lazy load new SEO pages for better performance
const JpegToJpg = lazy(() => import('@/pages/tools/JpegToJpg'));
const CompressImage = lazy(() => import('@/pages/tools/CompressImage'));
const JpgToPng = lazy(() => import('@/pages/tools/JpgToPng'));
const ResizePhoto20KB = lazy(() => import('@/pages/tools/ResizePhoto20KB'));
const ResizePhoto50KB = lazy(() => import('@/pages/tools/ResizePhoto50KB'));
const PassportPhotoEditor = lazy(() => import('@/pages/tools/PassportPhotoEditor'));

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

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        
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
        
        {/* Legal pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* Info pages */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
