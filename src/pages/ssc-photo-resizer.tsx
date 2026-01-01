import { SEO } from '@/components/SEO';
import { EditorLayout } from '@/components/layout/EditorLayout';

export default function SSCPhotoResizer() {
  return (
    <>
      <SEO
        title="SSC Photo Resizer Online Free | SSC CGL Photo Size & KB Tool"
        description="Free SSC photo resizer for SSC CGL, CHSL, MTS, GD exams. Resize SSC photo to exact dimensions and reduce size to 20KB, 50KB as per official form requirements."
      />

      <main>
        {/* ================= SEO CONTENT (SR ONLY) ================= */}
        <article className="sr-only">
          <h1>SSC Photo Resizer for SSC CGL, CHSL, MTS & GD Exams</h1>

          <p>
            This free SSC Photo Resizer helps candidates prepare photos for SSC
            exams including CGL, CHSL, MTS, GD Constable, and other SSC
            recruitment exams. Resize your photo to the exact dimensions and
            reduce file size to 20KB or 50KB as required in official SSC forms.
          </p>

          <h2>SSC Photo Size & Format Requirements</h2>
          <p>
            The Staff Selection Commission (SSC) specifies strict photo
            guidelines. Candidates must upload passport-size photos in
            prescribed dimensions and file size to complete the online
            application. Incorrect photo size can lead to rejection of your
            form.
          </p>

          <p>
            Typical requirements include:
          </p>
          <ul>
            <li>Photo dimensions: 35x45mm or 413x531px (varies by exam)</li>
            <li>File size: 20KB or 50KB depending on exam instructions</li>
            <li>Format: JPG, JPEG, PNG</li>
          </ul>

          <h2>How to Resize SSC Photos Online</h2>
          <p>
            Upload your SSC photo, select the required dimensions, adjust file
            size to 20KB or 50KB, and download the optimized image. Our
            online tool ensures the photo is sharp and meets SSC specifications.
          </p>

          <h2>Supported SSC Exams</h2>
          <p>
            This tool is suitable for all SSC exams, including:
          </p>
          <ul>
            <li>SSC CGL (Combined Graduate Level)</li>
            <li>SSC CHSL (Combined Higher Secondary Level)</li>
            <li>SSC MTS (Multi Tasking Staff)</li>
            <li>SSC GD Constable</li>
            <li>Other SSC recruitment exams with photo upload requirements</li>
          </ul>

          <h2>Why Use This SSC Photo Resizer</h2>
          <p>
            - Free and fast<br />
            - Works entirely in your browser, no upload required<br />
            - Maintains photo quality<br />
            - Supports JPG, PNG, WEBP formats<br />
            - Live preview while resizing<br />
            - Avoids last-minute form rejection
          </p>

          <h2>Common Problems Resolved</h2>
          <p>
            Candidates often upload photos that are too large, too small, or
            in the wrong format. This tool prevents such errors by resizing your
            photo to exact SSC specifications.
          </p>

          <h2>Privacy & Security</h2>
          <p>
            All photo processing is done locally in your browser. Your images
            are never uploaded to a server, making it completely safe for
            official form submissions.
          </p>

          <h2>Get Started Free</h2>
          <p>
            Upload your SSC photo now, resize to required dimensions and
            KB, and download instantly. Ensure your SSC application form
            photo meets official requirements without stress.
          </p>
        </article>

        {/* ================= ACTUAL UI ================= */}
        <EditorLayout />
      </main>
    </>
  );
}
