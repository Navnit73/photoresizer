import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useImageEditor } from "@/hooks/useImageEditor";
import { UploadZone } from "@/components/editor/UploadZone";
import { EditorControls } from "@/components/editor/EditorControls";
import { InteractiveCanvas } from "@/components/editor/InteractiveCanvas";
import { LivePreview } from "@/components/editor/LivePreview";
import { DownloadButton } from "@/components/editor/DownloadButton";
import { Undo2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { AmazonAd } from "@/components/shared/AmazonAd";
import AdUnit from "@/components/shared/AdUnit";
import { getExamBySlug, getRelatedExams, type ExamData } from "@/data/examPages";
import { useEffect } from "react";

const year = new Date().getFullYear();

export default function ExamSignaturePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const examSlug = slug?.replace(/-signature-resizer$/, "") || "";
  const exam = getExamBySlug(examSlug);

  useEffect(() => {
    if (!exam) navigate("/404", { replace: true });
  }, [exam, navigate]);

  if (!exam) return null;

  return <ExamSignaturePageContent exam={exam} />;
}

function ExamSignaturePageContent({ exam }: { exam: ExamData }) {
  const {
    imageState, isProcessing, history, loadImage, updateDimensions,
    setRotation, setQuality, setFormat, applyPreset, applyCrop,
    undo, processAndDownload, reset, lastUploadedFile,
  } = useImageEditor();

  const related = getRelatedExams(exam);
  const relatedLinks = related.slice(0, 3).map((r) => ({
    label: `${r.name} Signature Resizer`, href: `/${r.slug}-signature-resizer`,
  }));
  relatedLinks.push({ label: `${exam.name} Photo Resizer`, href: `/${exam.slug}-photo-resizer` });

  const canonicalUrl = `https://www.photoresizer.co.in/${exam.slug}-signature-resizer`;
  const title = `${exam.name} Signature Resizer ${year} | Resize Signature for ${exam.name}`;
  const description = `Free online ${exam.name} signature resizer tool. Resize, crop and compress your signature to exact ${exam.organization} specifications (${exam.signatureSpecs.width} × ${exam.signatureSpecs.height}, ${exam.signatureSpecs.minSize}–${exam.signatureSpecs.maxSize}). 100% free, no watermark.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the exact signature size required for ${exam.name} ${year}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${exam.organization} requires scanned signatures to be ${exam.signatureSpecs.width} × ${exam.signatureSpecs.height} in ${exam.signatureSpecs.format} format, with file size between ${exam.signatureSpecs.minSize} and ${exam.signatureSpecs.maxSize}. The signature must be made with black or dark blue ink on a plain white paper background.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I use a phone camera to scan my signature for ${exam.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, smartphone photographs of your handwritten signature are perfectly acceptable for the ${exam.name} application, as long as the final image meets all dimension and file size requirements. Our tool helps you crop, resize, and compress phone camera images to exact ${exam.organization} specifications in seconds.`
        }
      },
      {
        "@type": "Question",
        "name": `Is this ${exam.name} signature resizer tool free?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our ${exam.name} Signature Resizer is completely free with no watermarks, no registration required, and unlimited usage. All image processing runs entirely inside your browser, so your sensitive signature data never leaves your device.`
        }
      },
      {
        "@type": "Question",
        "name": `My signature file keeps getting rejected — what should I do?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The most common reasons for ${exam.name} signature rejection are: incorrect file size (not within the ${exam.signatureSpecs.minSize}–${exam.signatureSpecs.maxSize} range), wrong dimensions, poor image clarity, or the wrong file format. Upload your signature to our tool, follow the steps above, and download the optimized file. It will meet all ${exam.organization} specifications precisely and upload successfully on the first attempt.`
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          {/* ================= EDITOR UI ================= */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  {exam.name} Signature Resizer {year}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly crop, resize, and compress your signature scan to exact {exam.organization} guidelines
                  ({exam.signatureSpecs.width} × {exam.signatureSpecs.height}, {exam.signatureSpecs.minSize}–{exam.signatureSpecs.maxSize}).
                </p>
              </div>

              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={undo}>
                          <Undo2 className="w-3.5 h-3.5 mr-1" /> Undo
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={reset}>
                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
                      </Button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 lg:sticky lg:top-20 max-h-[85vh] overflow-y-auto flex flex-col gap-4">
                      <div className="w-full relative py-2 flex justify-center min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                        <AdUnit type="sidebar" />
                      </div>
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 w-full max-w-full overflow-hidden">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div>
                          <DownloadButton onDownload={processAndDownload} />
                          <LivePreview imageState={imageState} />
                        </div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={processAndDownload} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="py-2"><AmazonAd /></div>

          <AdUnit type="blog" />

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Resize Signature for {exam.name} {year} — Official Requirements</h2>
            <p>
              Applying for the <strong>{exam.fullName}</strong>? Along with your photograph, the {exam.organization} requires you to
              upload a scanned signature image that meets very specific technical requirements. A signature that is too large, too
              small, blurry, or in the wrong format will be instantly rejected by the automated upload validation system, blocking
              you from completing your application. Our free <strong>{exam.name} Signature Resizer</strong> tool lets you instantly
              crop, resize, and compress your scanned signature to perfectly match the official {exam.organization} specifications —
              all processing happens securely inside your browser.
            </p>

            <h3>Official {exam.name} Signature Size Specifications {year}</h3>
            <p>
              The {exam.organization} requires candidates to upload a scanned signature image that adheres to the following strict
              technical specifications. Non-compliance with any of these requirements will result in upload failure or application rejection:
            </p>

            <div className="not-prose overflow-x-auto my-8">
              <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="p-4 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">Specification</th>
                    <th className="p-4 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">Official Requirement</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Signature Dimensions</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">{exam.signatureSpecs.width} (width) × {exam.signatureSpecs.height} (height)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Acceptable File Size</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">{exam.signatureSpecs.minSize} to {exam.signatureSpecs.maxSize}</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Allowed File Format</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">{exam.signatureSpecs.format}</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Ink Color</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Black or Dark Blue ink only</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Paper Background</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Clean White paper, no ruled lines</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>How to Resize Your Signature for {exam.name} {year}</h3>
            <p>
              Follow these straightforward steps to prepare your scanned signature for the {exam.name} application form.
              The process is fast, free, and entirely browser-based:
            </p>
            <ol>
              <li>
                <strong>Scan or Photograph Your Signature:</strong> Sign your name on a clean, plain white sheet of paper using
                black or dark blue ink. Then scan the signature or take a clear, well-lit photograph using your smartphone camera.
                Ensure there are no shadows, wrinkles, or stains visible on the paper.
              </li>
              <li>
                <strong>Upload to Our Tool:</strong> Click the upload button above (or drag and drop) to load your signature image
                into the {exam.name} Signature Resizer. All processing happens locally inside your browser — your signature image
                is never uploaded to any external server, ensuring complete privacy and security.
              </li>
              <li>
                <strong>Crop and Resize:</strong> Use the interactive cropping tool to remove excess white border around your signature.
                The signature itself should occupy the majority of the frame. Adjust dimensions to match the required
                {exam.signatureSpecs.width} × {exam.signatureSpecs.height} specifications prescribed by {exam.organization}.
              </li>
              <li>
                <strong>Compress to Target Size:</strong> Adjust the quality slider until the live file size indicator shows a value
                between {exam.signatureSpecs.minSize} and {exam.signatureSpecs.maxSize}. The intelligent compression algorithm preserves
                the sharpness and legibility of your handwriting while reducing unnecessary visual data.
              </li>
              <li>
                <strong>Download and Upload:</strong> Save the processed {exam.signatureSpecs.format} file and upload it directly to the
                {exam.organization} application portal. Your signature is now fully compliant with all official requirements.
              </li>
            </ol>

            <h3>Tips for a Perfect {exam.name} Signature Scan</h3>
            <p>
              Getting a clean signature scan is just as important as resizing it correctly. Follow these expert tips to avoid
              common problems that cause rejection during the {exam.name} application process:
            </p>
            <ul>
              <li>
                <strong>Use plain white paper:</strong> Always sign on clean, unlined white paper. Lined, ruled, or colored paper
                will cause visual noise in the scanned image and may trigger rejection by the {exam.organization} automated validation system.
              </li>
              <li>
                <strong>Use the right ink:</strong> The {exam.organization} accepts signatures made with black or dark blue ballpoint
                or gel pen ink only. Pencil signatures, light-colored ink, or digital signatures created with a stylus on a tablet
                may not pass the verification stage.
              </li>
              <li>
                <strong>Ensure proper lighting:</strong> If photographing your signature with a smartphone, take the photo in bright,
                even lighting without shadows falling across the paper. Shadows can make the signature appear faded or distorted.
              </li>
              <li>
                <strong>Maintain consistent style:</strong> Your uploaded signature should match the signature you use on official
                documents and will use during the {exam.name} examination. Any significant mismatch between your uploaded and
                handwritten signatures can lead to identity verification issues.
              </li>
            </ul>

            <h3>Frequently Asked Questions</h3>

            <h4>1. What is the exact signature size required for {exam.name} {year}?</h4>
            <p>
              The {exam.organization} requires scanned signatures to be {exam.signatureSpecs.width} × {exam.signatureSpecs.height} in
              {exam.signatureSpecs.format} format, with file size between {exam.signatureSpecs.minSize} and {exam.signatureSpecs.maxSize}.
              The signature must be made with black or dark blue ink on a plain white paper background.
            </p>

            <h4>2. Can I use a phone camera to scan my signature for {exam.name}?</h4>
            <p>
              Yes, smartphone photographs of your handwritten signature are perfectly acceptable for the {exam.name} application, as long
              as the final image meets all dimension and file size requirements. Our tool helps you crop, resize, and compress phone camera
              images to exact {exam.organization} specifications in seconds.
            </p>

            <h4>3. Is this {exam.name} signature resizer tool free?</h4>
            <p>
              Yes, our {exam.name} Signature Resizer is completely free with no watermarks, no registration required, and unlimited usage.
              All image processing runs entirely inside your browser, so your sensitive signature data never leaves your device.
            </p>

            <h4>4. My signature file keeps getting rejected — what should I do?</h4>
            <p>
              The most common reasons for {exam.name} signature rejection are: incorrect file size (not within
              the {exam.signatureSpecs.minSize}–{exam.signatureSpecs.maxSize} range), wrong dimensions, poor image clarity, or the wrong
              file format. Upload your signature to our tool, follow the steps above, and download the optimized file. It will meet
              all {exam.organization} specifications precisely and upload successfully on the first attempt.
            </p>
          </article>

          <InternalLinks links={relatedLinks} />
        </main>

        <Footer />
      </div>
    </>
  );
}
