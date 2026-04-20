
import fs from 'fs';
import path from 'path';
import { blogData } from '../src/data/blogData';

const SITEMAP_PATH = path.join(import.meta.dirname, '../public/sitemap.xml');
const BASE_URL = 'https://www.photoresizer.co.in';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' }, // New Blog List
  { path: '/compress-image', priority: '0.9', changefreq: 'monthly' },
  { path: '/jpeg-to-jpg', priority: '0.9', changefreq: 'monthly' },
  { path: '/jpg-to-png', priority: '0.9', changefreq: 'monthly' },
  { path: '/resize-photo-20kb', priority: '0.9', changefreq: 'monthly' },
  { path: '/passport-photo-editor', priority: '0.9', changefreq: 'monthly' },
  { path: '/ssc-photo-resizer', priority: '0.9', changefreq: 'monthly' },
  { path: '/upsc-photo-size', priority: '0.9', changefreq: 'monthly' },
  { path: '/signature-resize-ibps', priority: '0.8', changefreq: 'monthly' },
  { path: '/reduce-photo-size-50kb', priority: '0.9', changefreq: 'monthly' },
  
  // Phase 3: PDF Tools
  { path: '/pdf-size-reducer', priority: '0.9', changefreq: 'monthly' },
  { path: '/merge-pdf', priority: '0.9', changefreq: 'monthly' },
  { path: '/split-pdf', priority: '0.9', changefreq: 'monthly' },
  { path: '/jpg-to-pdf', priority: '0.9', changefreq: 'monthly' },
  { path: '/pdf-to-jpg', priority: '0.9', changefreq: 'monthly' },
  
  // Phase 4: Visa Tools
  { path: '/us-visa-photo', priority: '0.9', changefreq: 'monthly' },
  { path: '/canada-visa-photo', priority: '0.9', changefreq: 'monthly' },
  { path: '/uk-visa-photo', priority: '0.9', changefreq: 'monthly' },
  { path: '/australia-visa-photo', priority: '0.9', changefreq: 'monthly' },
  
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Static Pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${BASE_URL}${page.path === '/' ? '' : page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Dynamic Blog Pages
  blogData.forEach(post => {
    xml += `  <url>
    <loc>${BASE_URL}/${post.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log(`Sitemap generated with ${staticPages.length} static pages and ${blogData.length} blog posts.`);
};

generateSitemap();
