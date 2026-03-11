import { SEO } from '@/components/SEO';
import Index from '@/pages/Index';

export default function Home() {
  return (
    <>
      <SEO
        title="Photo Resizer, Compressor & Editor for Exams - (20KB-50KB)"
        description="Free online photo resizer, image compressor, and editor for SSC, UPSC, IBPS, Banking, Railway and government exam forms. Reduce photo size to 20KB, 50KB or exact dimensions like 200x230px. 100% free & private."
      />


      {/* === STATIC SEO INTRO (VERY IMPORTANT) === */}
      <section className="container max-w-4xl mx-auto mt-4 mb-3 sr-only">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This free online photo resizer, image compressor, and editor helps candidates and general users resize and compress
          photos for SSC, UPSC, IBPS, Banking, Railway and other government
          exams. Easily reduce photo size to 20KB, 50KB or set exact dimensions
          like 200×230 pixels as required in official application forms. Perfect as a generic photo resizer for any need.
        </p>
      </section>

      {/* === ACTUAL APP / EDITOR UI === */}
      <Index />
    </>
  );
}
