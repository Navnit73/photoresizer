import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

const ExamPhotoPage = lazy(() => import("./exams/ExamPhotoPage"));
const ExamSignaturePage = lazy(() => import("./exams/ExamSignaturePage"));
const BlogPage = lazy(() => import("./BlogPage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-slate-600 dark:text-slate-300">Loading...</div>
    </div>
  );
}

export default function DynamicPageResolver() {
  const { slug } = useParams<{ slug: string }>();

  if (slug?.endsWith("-photo-resizer")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ExamPhotoPage />
      </Suspense>
    );
  }

  if (slug?.endsWith("-signature-resizer")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ExamSignaturePage />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  );
}
