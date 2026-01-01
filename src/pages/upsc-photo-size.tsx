import { SEO } from '@/components/SEO';
import { EditorLayout } from '@/components/layout/EditorLayout';

export default function UPSCPhotoSize() {
  return (
    <>
      <SEO
        title="UPSC Exam Photo Size & Dimensions | UPSC Photo Resizer Online"
        description="Check UPSC exam photo dimensions and resize photo online for UPSC CSE, CDS, NDA and other exams. Compress to required size without quality loss."
      />

      <main>
        {/* ================= SEO CONTENT (SR ONLY) ================= */}
        <article className="sr-only">
          <h1>UPSC Exam Photo Size and Dimension Tool</h1>

          <p>
            The UPSC Photo Size Tool is designed for candidates applying to UPSC
            exams such as Civil Services (CSE), CDS, NDA, and other recruitment
            exams. Upload your photo to resize it to exact dimensions and
            compress it to meet UPSC file size requirements without losing image
            quality.
          </p>

          <h2>UPSC Photo Size & Dimensions Requirements</h2>
          <p>
            UPSC specifies precise photo dimensions and file size for online
            applications. Uploading an incorrect photo may lead to application
            rejection. Typically, the requirements include:
          </p>
          <ul>
            <li>Passport-size photo (usually 3.5 x 4.5 cm / 413 x 531 pixels)</li>
            <li>File size: usually between 20KB to 50KB depending on exam</li>
            <li>Format: JPG, JPEG, PNG</li>
          </ul>

          <h2>How to Resize UPSC Photos Online</h2>
          <p>
            Upload your photo using this tool, select the correct dimensions and
            file size, and download the optimized image. The live preview helps
            you ensure that the photo remains sharp and complies with UPSC
            guidelines. No server upload is required — everything happens in your
            browser.
          </p>

          <h2>Supported UPSC Exams</h2>
          <p>
            This UPSC photo resizer works for a variety of exams:
          </p>
          <ul>
            <li>UPSC Civil Services Examination (CSE)</li>
            <li>UPSC Combined Defence Services (CDS)</li>
            <li>National Defence Academy (NDA)</li>
            <li>UPSC CAPF, CMS, and other UPSC recruitment exams</li>
          </ul>

          <h2>Why Use This UPSC Photo Resizer</h2>
          <p>
            - Free and fast online tool<br />
            - Maintains image quality while compressing<br />
            - Supports JPG, PNG, and WEBP formats<br />
            - Live preview while resizing<br />
            - Eliminates errors like "file too large" or wrong dimensions<br />
            - Client-side processing ensures privacy
          </p>

          <h2>Common Issues Resolved</h2>
          <p>
            Candidates often upload photos that are either too large, too small,
            or in the wrong format. This tool ensures compliance with UPSC
            requirements, preventing rejection during the application process.
          </p>

          <h2>Privacy & Security</h2>
          <p>
            All photo processing occurs locally in your browser. Your images are
            never uploaded to a server, guaranteeing complete privacy for official
            applications.
          </p>

          <h2>Get Started Now</h2>
          <p>
            Upload your photo, adjust dimensions and file size according to UPSC
            guidelines, and download the ready-to-upload image instantly. Ensure
            your application photo is fully compliant with UPSC standards.
          </p>
        </article>

        {/* ================= ACTUAL UI ================= */}
        <EditorLayout />
      </main>
    </>
  );
}
