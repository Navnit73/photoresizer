import { SEO } from '@/components/SEO';
import Index from '@/pages/Index';

export default function Home() {
  return (
    <>
      <SEO
        title="Free Online Photo Resizer, Compressor & Editor (20KB–50KB)"
        description="Free online photo resizer, image compressor & editor. Resize photos for passports, visas, IDs, SSC, UPSC, IBPS & government forms worldwide. Reduce to 20KB, 50KB or exact dimensions like 200x230px. 100% free, private & browser-based."
      />

    
      {/* === ACTUAL APP / EDITOR UI === */}
      <Index />
    </>
  );
}
