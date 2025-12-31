import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function SEO({
  title = 'SSC Photo Resizer & Government Exam Image Resizer Online Free',
  description = 'Free online photo & image resizer for SSC, UPSC, Banking, Railway, Defence and all government exams. Resize photos for Passport, PAN Card, Aadhaar, Visa, job applications and exam forms. Supports JPG, PNG, WEBP. 100% private.',
  keywords = `
    ssc photo resizer,
    ssc image resizer,
    upsc photo resizer,
    government exam photo resizer,
    govt exam image resizer,
    banking exam photo resize,
    ibps photo resizer,
    sbi po photo resize,
    rrb photo resizer,
    railway exam photo size,
    defence exam photo resize,
    nda photo resizer,
    cds photo resizer,
    afcat photo resize,
    state government exam photo resizer,
    police exam photo size,
    teacher exam photo resizer,
    ctet photo resize,
    tet photo size,
    passport photo resizer online,
    pan card photo size,
    aadhaar photo resize,
    visa photo editor,
    job application photo resizer,
    online image resizer india,
    photo resize for government forms
  `
}: SEOProps) {

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Government Exam Photo Resizer',
    description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'SSC photo resizer',
      'UPSC exam photo resize',
      'Banking & Railway exam image resizer',
      'Defence exam photo editor',
      'Passport, PAN, Aadhaar photo resize',
      'Exact size & KB control',
      'JPG, PNG, WEBP support',
      'Client-side processing (no upload)'
    ],
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I resize photo for SSC and other government exams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, this tool supports photo resizing for SSC, UPSC, Banking, Railway, Defence, Police, Teaching and all government exams as per required size and format.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this photo resizer safe for government forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All image processing happens in your browser. Photos are never uploaded to any server, making it completely safe and private.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which formats are supported for exam photo upload?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can resize and convert photos in JPG, JPEG, PNG and WEBP formats for government exam and form submissions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I resize passport, PAN and Aadhaar photos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the tool includes preset and custom sizes for Passport, PAN Card, Aadhaar, Visa and other official documents.',
        },
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Government Exam Photo Resizer" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Canonical (SPA-safe) */}
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />

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
