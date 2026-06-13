
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: string;
  url?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
}

export function SEO({
  title = "Free Photo Resizer, Compressor & Editor for SSC, UPSC & Exams",
  description = "Free online photo resizer, compressor and image editor for global passport/visa forms, SSC, UPSC, IBPS, and government exams. Reduce photo size to 20KB, 50KB or exact dimensions like 200x230px. 100% free & private.",
  type = 'website',
  image = "https://www.photoresizer.co.in/og-image.png", // Default OG Image
  url,
  publishedTime,
  modifiedTime,
  author = "Photo Resizer Pro",
  structuredData
}: SEOProps) {
  const siteUrl = "https://www.photoresizer.co.in";
  const canonicalUrl = typeof window !== "undefined"
      ? (url || `${siteUrl}${window.location.pathname === "/" ? "" : window.location.pathname}`)
      : "";

  const finalImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  /* -------------------- Default Schemas -------------------- */
  const defaultSoftwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Government Exam Photo Resizer",
    description,
    image: finalImage,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Works offline after page load.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    author: {
        "@type": "Organization",
        name: "Photo Resizer Pro",
        url: siteUrl
    }
  };

  return (
    <Helmet>
      {/* ---------- Primary SEO ---------- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl} hreflang="x-default" />
      <link rel="alternate" href={canonicalUrl} hreflang="en" />

      {/* ---------- Open Graph ---------- */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Government Exam Photo Resizer" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalImage} />
      
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && author && <meta property="article:author" content={author} />}

      {/* ---------- Twitter ---------- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* ---------- Structured Data ---------- */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultSoftwareAppSchema)}
      </script>
    </Helmet>
  );
}
