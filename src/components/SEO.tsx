import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({
  title = "Free Photo Resizer for SSC, UPSC & Government Exam Forms Online, photo resizer, photo compressor, photo reduce",
  description = "Resize and compress photos for SSC, UPSC, IBPS, Banking, Railway and all government exams. Reduce photo size to 20KB, 50KB or exact dimensions like 200x230px. Supports Passport, PAN, Aadhaar, Visa photos. 100% free & private. This online photo resizer and photo compressor helps you resize and compress images easily for government and exam forms in India. Using this photo resizer online, you can adjust image size in KB, pixel, or cm, making it ideal for photo resizer 20KB, photo resizer 50KB, photo resizer 100KB, and exact requirements like PAN card photo resizer, SSC photo resizer, UPSC photo resizer, TNPSC photo compressor, Aadhaar photo resize, and passport photo resizer online. The tool also works as a powerful photo compressor in KB, allowing you to compress images to 10KB, 15KB, 20KB, 30KB, 40KB, 50KB, 100KB, 200KB, or even 500KB, making it a reliable online photo compressor and image size reducer in India. Whether you need a JPG photo compressor, JPEG to JPG converter, JPG to JPEG converter, or a fast online image resizer free, this tool ensures accurate compression, high quality, and instant download—without uploads or watermarks.",
}: SEOProps) {
  const canonicalUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";

  /* -------------------- Software Application Schema -------------------- */
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Government Exam Photo Resizer",
  description,
  image: "https://www.photoresizer.co.in/og-image.jpg",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Works offline after page load.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock"
  },
  featureList: [
    /* Exam & Document Specific */
    "Photo resizer for SSC CGL exam online free",
    "Reduce photo size to 20KB, 30KB, 50KB, 100KB for government forms",
    "UPSC exam photo dimensions and file size control",
    "Signature size reducer for IBPS and banking exams",
    "Passport, PAN Card, Aadhaar, Visa photo editor online",
    "Job application and railway exam photo resize tool",

    /* Generic Image Resize & Compression */
    "Online image resizer in KB without quality loss",
    "Image compressor with real-time quality preview",
    "Reduce image size in KB for form upload requirements",
    "Resize image dimensions in pixels and centimeters",
    "Smart compression for clear text and face visibility",
    "Photo compression without watermark",
    "High-quality JPEG and PNG image compression",

    /* Technical & Format Support */
    "Exact pixel size control like 200x230px or 300x300px",
    "JPG to JPEG and JPEG to JPG converter",
    "PNG to JPG and WEBP image converter",
    "Supports JPG, JPEG, PNG, and WEBP formats",
    "Maintain aspect ratio while resizing images",

    /* Privacy & Performance */
    "Client-side image processing (no server upload)",
    "100% private and secure image resizing",
    "Works offline after initial page load",
    "Fast image compression with instant download",
    "No signup, no login, no data storage"
  ]
};


  /* -------------------- FAQ Schema -------------------- */
 const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to resize photo for SSC CGL exam online free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo, select SSC preset or custom dimensions, adjust file size if required, and download instantly. No registration needed."
      }
    },
    {
      "@type": "Question",
      name: "How can I reduce photo size to 50KB for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the quality control slider to compress your photo until it reaches 50KB while keeping the image clear and readable."
      }
    },
    {
      "@type": "Question",
      name: "Can I compress photo to 20KB for exam forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can reduce photo size to 20KB or any custom size required by SSC, UPSC, IBPS, Banking and Railway exams."
      }
    },
    {
      "@type": "Question",
      name: "What are UPSC exam photo dimensions and size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UPSC photo requirements usually include fixed pixel dimensions and file size limits. This tool allows precise control over both."
      }
    },
    {
      "@type": "Question",
      name: "Can I resize signature image for IBPS exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can resize and compress signature images according to IBPS and other banking exam specifications."
      }
    },
    {
      "@type": "Question",
      name: "Is this photo resizer safe for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All image processing happens locally in your browser. Your photos are never uploaded to any server."
      }
    },

    /* -------- GENERIC SEO QUESTIONS -------- */

    {
      "@type": "Question",
      name: "How to reduce image size without losing quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use smart compression by slightly lowering image quality while keeping resolution intact. This reduces file size with minimal visible quality loss."
      }
    },
    {
      "@type": "Question",
      name: "Can I compress images online without quality loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Online image compressors use optimized algorithms to reduce file size while preserving sharpness and color accuracy."
      }
    },
    {
      "@type": "Question",
      name: "How to reduce image size in KB online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your image and adjust the compression level until the file size reaches the required KB limit, then download instantly."
      }
    },
    {
      "@type": "Question",
      name: "What is the best image compressor for low quality loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best image compressor lets you control quality manually, preview changes in real time, and export images without visible degradation."
      }
    },
    {
      "@type": "Question",
      name: "Can I resize image dimensions and file size together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can change image width and height in pixels or cm and also compress the file to meet specific KB requirements."
      }
    },
    {
      "@type": "Question",
      name: "Does image compression affect photo clarity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Heavy compression can reduce clarity, but controlled compression keeps text, faces, and details clear for official use."
      }
    },
    {
      "@type": "Question",
      name: "Is online image compression free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can resize and compress images online for free without sign-up or watermark."
      }
    },
    {
      "@type": "Question",
      name: "Which image formats are supported for resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG, JPG, PNG, and WEBP formats are supported for image resizing and compression."
      }
    },
    {
      "@type": "Question",
      name: "Can I compress passport size photos online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Passport size photos can be resized and compressed to meet form-specific size and dimension requirements."
      }
    },
    {
      "@type": "Question",
      name: "Will my image be stored after compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Images are processed locally and are not stored or shared after compression."
      }
    }
  ]
};


  /* -------------------- HowTo Schema -------------------- */
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Resize Photo for Government Exam Forms",
    description,
    step: [
      {
        "@type": "HowToStep",
        name: "Upload Photo",
        text: "Upload your photo in JPG, PNG or WEBP format.",
      },
      {
        "@type": "HowToStep",
        name: "Set Required Size",
        text: "Choose SSC, UPSC, IBPS or custom dimensions and file size like 20KB or 50KB.",
      },
      {
        "@type": "HowToStep",
        name: "Download",
        text: "Preview and download your resized photo instantly.",
      },
    ],
  };

  return (
    <Helmet>
      {/* ---------- Primary SEO ---------- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ---------- Open Graph ---------- */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Government Exam Photo Resizer" />
      <meta property="og:url" content={canonicalUrl} />

      {/* ---------- Twitter ---------- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* ---------- Structured Data ---------- */}
      <script type="application/ld+json">
        {JSON.stringify(softwareAppSchema)}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
    </Helmet>
  );
}
