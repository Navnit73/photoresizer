import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({
  title = 'Free Photo Resizer for SSC, UPSC & Government Exam Forms Online',
  description = 'Resize and compress photos for SSC, UPSC, IBPS, Banking, Railway and all government exams. Reduce photo size to 20KB, 50KB or exact dimensions like 200x230px. Supports Passport, PAN, Aadhaar, Visa photos. 100% free & private.',
}: SEOProps) {
  const canonicalUrl =
    typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : '';

  /* -------------------- Software Application Schema -------------------- */
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Government Exam Photo Resizer',
    description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Works offline after page load.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Photo resizer for SSC CGL exam online free',
      'Reduce photo size to 20KB and 50KB for government forms',
      'UPSC exam photo dimensions and size',
      'Signature size reducer for IBPS exams',
      'Passport, PAN Card, Aadhaar, Visa photo editor',
      'Exact pixel size control like 200x230px',
      'JPG, PNG, WEBP support',
      'Client-side processing (no upload)',
    ],
  };

  /* -------------------- FAQ Schema -------------------- */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How to resize photo for SSC CGL exam online free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload your photo, select SSC preset or custom dimensions, adjust file size if required, and download instantly. No registration needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I reduce photo size to 50KB for government forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the quality control to compress your photo until it reaches 50KB while maintaining clarity. Preview updates in real time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I compress photo to 20KB for exam forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can reduce photo size to 20KB or any custom size required by SSC, UPSC, IBPS, Banking and Railway exams.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are UPSC exam photo dimensions and size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UPSC photo requirements vary by form, but usually include specific pixel dimensions and KB limits. This tool lets you set both precisely.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I resize signature image for IBPS exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can resize and compress signature images as per IBPS and other banking exam specifications.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this photo resizer safe for government forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All processing happens locally in your browser. Images are never uploaded to any server.',
        },
      },
    ],
  };

  /* -------------------- HowTo Schema -------------------- */
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Resize Photo for Government Exam Forms',
    description,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload Photo',
        text: 'Upload your photo in JPG, PNG or WEBP format.',
      },
      {
        '@type': 'HowToStep',
        name: 'Set Required Size',
        text: 'Choose SSC, UPSC, IBPS or custom dimensions and file size like 20KB or 50KB.',
      },
      {
        '@type': 'HowToStep',
        name: 'Download',
        text: 'Preview and download your resized photo instantly.',
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
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
    </Helmet>
  );
}
