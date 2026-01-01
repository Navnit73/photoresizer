import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import SSCPhotoResizer from '@/pages/ssc-photo-resizer';
import UPSCPhotoSize from '@/pages/upsc-photo-size';
import ReducePhotoSize50KB from '@/pages/reduce-photo-size-50kb';
import SignatureResizeIBPS from '@/pages/signature-resize-ibps';
import NotFound from '@/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ssc-photo-resizer" element={<SSCPhotoResizer />} />
      <Route path="/upsc-photo-size" element={<UPSCPhotoSize />} />
      <Route path="/reduce-photo-size-50kb" element={<ReducePhotoSize50KB />} />
      <Route path="/signature-resize-ibps" element={<SignatureResizeIBPS />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
