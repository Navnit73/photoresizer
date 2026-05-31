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

import AdUnit from "@/components/shared/AdUnit";
import { getExamBySlug, getRelatedExams, type ExamData } from "@/data/examPages";
import { useEffect } from "react";

const year = new Date().getFullYear();

export default function ExamPhotoPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const examSlug = slug?.replace(/-photo-resizer$/, "") || "";
  const exam = getExamBySlug(examSlug);

  useEffect(() => {
    if (!exam) navigate("/404", { replace: true });
  }, [exam, navigate]);

  if (!exam) return null;

  return <ExamPhotoPageContent exam={exam} />;
}

function ExamPhotoPageContent({ exam }: { exam: ExamData }) {
  const {
    imageState, isProcessing, history, loadImage, updateDimensions,
    setRotation, setQuality, setFormat, applyPreset, applyCrop,
    undo, processAndDownload, reset, lastUploadedFile,
  } = useImageEditor();

  const related = getRelatedExams(exam);
  const relatedLinks = related.slice(0, 3).map((r) => ({
    label: `${r.name} Photo Resizer`, href: `/${r.slug}-photo-resizer`,
  }));
  relatedLinks.push({ label: `${exam.name} Signature Resizer`, href: `/${exam.slug}-signature-resizer` });

  const canonicalUrl = `https://www.photoresizer.co.in/${exam.slug}-photo-resizer`;
  const title = `${exam.name} Photo Resizer ${year} | Resize Photo for ${exam.name}`;
  const description = `Free online ${exam.name} photo resizer tool. Resize, crop and compress your photo to exact ${exam.organization} specifications (${exam.photoSpecs.width} × ${exam.photoSpecs.height}, ${exam.photoSpecs.minSize}–${exam.photoSpecs.maxSize}). 100% free, no watermark.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the exact photo size required for ${exam.name} ${year}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${exam.organization} requires photos to be ${exam.photoSpecs.width} × ${exam.photoSpecs.height} in ${exam.photoSpecs.format} format, with file size strictly between ${exam.photoSpecs.minSize} and ${exam.photoSpecs.maxSize}. The photograph must have a plain ${exam.photoSpecs.background.toLowerCase()} background with a clear, recent frontal view of the candidate's face.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I use a mobile phone photo for the ${exam.name} application?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, photographs taken with a smartphone camera are accepted for ${exam.name} applications, provided they meet all the specified dimension and file size requirements. Our free online tool helps you instantly resize and compress any mobile photo to achieve perfect compliance with ${exam.organization} guidelines.`
        }
      },
      {
        "@type": "Question",
        "name": `Is this ${exam.name} photo resizer tool completely free?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our ${exam.name} Photo Resizer tool is 100% free to use. There are no hidden charges, no watermarks added to your photos, no sign-up or registration required, and no limit on the number of photos you can process. All image processing runs locally inside your browser for maximum privacy and security.`
        }
      },
      {
        "@type": "Question",
        "name": `What happens if my photo gets rejected by the ${exam.organization} portal?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `If your uploaded photograph doesn't meet the exact technical specifications, the ${exam.organization} application portal will display an error message and prevent you from completing the submission. In some cases, incorrectly formatted photos may pass the initial upload but result in application rejection during the document verification stage. Using our dedicated ${exam.name} photo resizer tool before uploading completely eliminates this risk.`
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
                  {exam.name} Photo Resizer {year}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly crop, resize, and compress your photo to exact {exam.organization} guidelines
                  ({exam.photoSpecs.width} × {exam.photoSpecs.height}, {exam.photoSpecs.minSize}–{exam.photoSpecs.maxSize}).
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

  
          <AdUnit type="blog" />

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Resize Photo for {exam.name} {year} — Official Requirements (Updated)</h2>

            {exam.slug === "ctet" && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-2xl mb-8 shadow-sm">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mt-0 flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider">Update 2026</span>
                  CTET July/December Session Guidelines
                </h4>
                <p className="text-blue-900 dark:text-blue-200 mb-0 leading-relaxed text-base">
                  For the upcoming <strong>CTET 2026</strong> session, CBSE strictly requires the uploaded photograph to be between <strong>10 KB and 100 KB</strong> in size, with dimensions of <strong>3.5 cm (width) x 4.5 cm (height)</strong>. The signature must be between <strong>3 KB and 30 KB</strong>. Ensure your photo has a plain white background and is taken without spectacles.
                </p>
              </div>
            )}

            <p>
              Are you preparing to submit your <strong>{exam.fullName}</strong> application form? The {exam.organization} strictly enforces
              photograph specifications on its online registration portal. Uploading a photo that does not conform to the exact dimensions,
              file size, or format requirements will lead to immediate rejection — potentially causing you to miss the application deadline
              entirely. Our free online <strong>{exam.name} Photo Resizer</strong> tool helps you instantly crop, resize, and compress your
              photograph to the exact official specifications, all processed securely in your browser without uploading to any external server.
            </p>

            <h3>Official {exam.name} Photo Size Specifications {year}</h3>
            <p>
              The <strong>{exam.organization}</strong> mandates specific technical requirements for the photograph uploaded during the {exam.name} online
              application process. Carefully review the following official specifications before uploading your photo:
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
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Image Dimensions</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">{exam.photoSpecs.width} (width) × {exam.photoSpecs.height} (height)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Acceptable File Size</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">{exam.photoSpecs.minSize} to {exam.photoSpecs.maxSize}</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Allowed File Format</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">{exam.photoSpecs.format}</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Background Color</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">{exam.photoSpecs.background} background only</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Strict Prohibitions</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400">No spectacles, caps, masks, or dark glasses</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>How to Resize Your Photo for {exam.name} {year}</h3>
            <p>
              Follow these simple steps to prepare your photograph for the {exam.name} online application form.
              The entire process takes less than 60 seconds and requires no software installation:
            </p>
            <ol>
              <li>
                <strong>Upload Your Photograph:</strong> Click the upload button above or drag and drop your recent passport-size
                photograph directly into the editor. Our {exam.name} photo resizer processes all images locally inside your browser,
                ensuring complete privacy and security. Your photos are never uploaded to any server.
              </li>
              <li>
                <strong>Adjust the Crop Area:</strong> The editor automatically sets the correct aspect ratio matching
                the {exam.organization} requirements ({exam.photoSpecs.width} × {exam.photoSpecs.height}). Position the crop frame so
                that your face is clearly centered and visible, covering approximately 70% to 80% of the active image area, with a
                plain {exam.photoSpecs.background.toLowerCase()} background visible around the edges.
              </li>
              <li>
                <strong>Optimize the File Size:</strong> Use the quality slider to compress the image until the live file size
                indicator shows a value between {exam.photoSpecs.minSize} and {exam.photoSpecs.maxSize}. The smart compression
                algorithm reduces file size while maintaining facial clarity and sharpness required for identification.
              </li>
              <li>
                <strong>Download and Upload:</strong> Save the optimized {exam.photoSpecs.format} file to your device. Your photograph
                is now 100% compliant with official {exam.organization} specifications and ready to be uploaded directly to the
                {exam.name} registration portal without any errors or rejection.
              </li>
            </ol>

            <h3>Common Photo Upload Mistakes to Avoid for {exam.name}</h3>
            <p>
              Many {exam.name} applicants face unnecessary form rejection due to avoidable photo errors. Here are the most common
              mistakes candidates make and how our tool prevents them:
            </p>
            <ul>
              <li>
                <strong>Incorrect file size:</strong> The {exam.organization} portal strictly enforces the {exam.photoSpecs.minSize} to {exam.photoSpecs.maxSize} file
                size limit. Photos that exceed this range are automatically rejected by the upload validation system. Our tool&apos;s live
                file size counter ensures you hit the exact target range before downloading.
              </li>
              <li>
                <strong>Wrong dimensions:</strong> Using a photo that doesn&apos;t match the required {exam.photoSpecs.width} × {exam.photoSpecs.height} dimensions
                will result in distorted display on your admit card and may trigger application rejection during document verification.
              </li>
              <li>
                <strong>Poor background:</strong> The photograph must have a plain, uniform {exam.photoSpecs.background.toLowerCase()} background. Patterned,
                dark, or cluttered backgrounds are not accepted and will cause rejection during the automated verification stage.
              </li>
              <li>
                <strong>Wearing restricted accessories:</strong> Government exam portals including {exam.organization} strictly prohibit
                photographs where candidates are wearing dark glasses, caps, hats, or any face-covering accessories. Always remove glasses
                before taking your photo for the {exam.name} application.
              </li>
            </ul>

            <h3>Frequently Asked Questions</h3>

            <h4>1. What is the exact photo size required for {exam.name} {year}?</h4>
            <p>
              The {exam.organization} requires photos to be {exam.photoSpecs.width} × {exam.photoSpecs.height} in {exam.photoSpecs.format} format,
              with file size strictly between {exam.photoSpecs.minSize} and {exam.photoSpecs.maxSize}. The photograph must have
              a plain {exam.photoSpecs.background.toLowerCase()} background with a clear, recent frontal view of the candidate&apos;s face.
            </p>

            <h4>2. Can I use a mobile phone photo for the {exam.name} application?</h4>
            <p>
              Yes, photographs taken with a smartphone camera are accepted for {exam.name} applications, provided they meet all the
              specified dimension and file size requirements. Our free online tool helps you instantly resize and compress any mobile
              photo to achieve perfect compliance with {exam.organization} guidelines.
            </p>

            <h4>3. Is this {exam.name} photo resizer tool completely free?</h4>
            <p>
              Yes, our {exam.name} Photo Resizer tool is 100% free to use. There are no hidden charges, no watermarks added to your
              photos, no sign-up or registration required, and no limit on the number of photos you can process. All image processing
              runs locally inside your browser for maximum privacy and security.
            </p>

            <h4>4. What happens if my photo gets rejected by the {exam.organization} portal?</h4>
            <p>
              If your uploaded photograph doesn&apos;t meet the exact technical specifications, the {exam.organization} application portal
              will display an error message and prevent you from completing the submission. In some cases, incorrectly formatted
              photos may pass the initial upload but result in application rejection during the document verification stage. Using our
              dedicated {exam.name} photo resizer tool before uploading completely eliminates this risk.
            </p>
          </article>

          <InternalLinks links={relatedLinks} />
        </main>

        <Footer />
      </div>
    </>
  );
}
