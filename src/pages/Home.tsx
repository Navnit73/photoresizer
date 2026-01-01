import { SEO } from '@/components/SEO';
import Index from '@/pages/Index';

export default function Home() {
  return (
    <>
      <SEO
        title="Free Photo Resizer for Government Exam Forms | SSC, UPSC, IBPS"
        description="Resize and compress photos for SSC, UPSC, IBPS, Banking, Railway and government exam forms. Reduce photo size to 20KB, 50KB or exact dimensions like 200x230px. 100% free & private."
      />

      {/* === PRIMARY SEO H1 (hidden visually, visible to Google) === */}
      <h1 className="sr-only">
        Free Photo Resizer for SSC, UPSC, IBPS & Government Exam Forms
      </h1>

      {/* === STATIC SEO INTRO (VERY IMPORTANT) === */}
      <section className="container max-w-4xl mx-auto mt-4 mb-3 sr-only">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This free online photo resizer helps candidates resize and compress
          photos for SSC, UPSC, IBPS, Banking, Railway and other government
          exams. Easily reduce photo size to 20KB, 50KB or set exact dimensions
          like 200×230 pixels as required in official application forms.
        </p>
      </section>

      {/* === ACTUAL APP / EDITOR UI === */}
      <Index />
    </>
  );
}
