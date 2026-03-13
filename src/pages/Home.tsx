import { SEO } from '@/components/SEO';
import Index from '@/pages/Index';

export default function Home() {
  return (
    <>
      <SEO
        title="Photo Resizer, Compressor & Editor for Exams - (20KB-50KB)"
        description="Free online photo resizer, image compressor, and editor for SSC, UPSC, IBPS, Banking, Railway and government exam forms. Reduce photo size to 20KB, 50KB or exact dimensions like 200x230px. 100% free & private."
      />

    
      {/* === ACTUAL APP / EDITOR UI === */}
      <Index />
    </>
  );
}
