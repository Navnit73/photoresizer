import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function SEO({ 
  title = 'Government Form Image Editor - Free Online Photo Resizer & Converter',
  description = 'Free online image editor for government forms. Resize photos for Passport, PAN Card, Aadhaar, Visa, and job applications. Convert JPG, PNG, WEBP instantly.',
  keywords = 'government form image editor, photo resize for forms, passport photo resize, online image compressor, photo converter online, aadhaar photo size, pan card photo size, visa photo editor'
}: SEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Government Form Image Editor',
    description,
    applicationCategory: 'PhotographyApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Photo resizing for government forms',
      'Multiple format support (JPG, PNG, WEBP)',
      'Preset sizes for Passport, PAN, Aadhaar, Visa',
      'Background color change',
      'Quality adjustment',
      'Client-side processing',
    ],
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What image formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support all major image formats including JPG, JPEG, PNG, and WEBP.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my image data secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All image processing happens directly in your browser. Your images are never uploaded to any server.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the standard sizes for government forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common sizes include: Passport Photo (413×531px), PAN Card (206×265px), Aadhaar Card (140×182px), Visa Photo (600×600px).',
        },
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Government Form Image Editor" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical */}
      <link rel="canonical" href={window.location.href} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
    </Helmet>
  );
}
