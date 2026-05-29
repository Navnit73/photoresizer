import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AdUnit from "@/components/shared/AdUnit";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>

        {/* Even 404 pages get traffic — monetize them */}
        <div className="w-full max-w-2xl">
          <AdUnit type="sidebar" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
