import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const srcPagesDir = path.resolve('./src/pages');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html not found. Run build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

function extractSEOProps(content) {
  // Try to match url, title, description
  const urlMatch = content.match(/url=(?:\{"|'|`|"|)(https:\/\/www\.photoresizer\.co\.in[^"'}]+)(?:"|'|`|\})/);
  const titleMatch = content.match(/title="([^"]+)"/);
  const descMatch = content.match(/description="([^"]+)"/);

  if (urlMatch && titleMatch && descMatch) {
    return {
      url: urlMatch[1],
      title: titleMatch[1],
      description: descMatch[1]
    };
  }
  return null;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const seoProps = extractSEOProps(content);
      
      if (seoProps) {
        // Find route path
        const urlObj = new URL(seoProps.url);
        let pathname = urlObj.pathname;
        if (pathname === '/' || pathname.includes('$')) continue; // skip index and dynamic routes
        
        let outHtml = baseHtml;
        
        // Replace title
        outHtml = outHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${seoProps.title}</title>`);
        
        // Replace description
        outHtml = outHtml.replace(/<meta\s+name="description"[\s\S]*?content="[\s\S]*?"\s*\/>/g, `<meta name="description" content="${seoProps.description}" />`);
        
        // Replace og:title
        outHtml = outHtml.replace(/<meta\s+property="og:title"[\s\S]*?content="[\s\S]*?"\s*\/>/g, `<meta property="og:title" content="${seoProps.title}" />`);
        
        // Replace og:description
        outHtml = outHtml.replace(/<meta\s+property="og:description"[\s\S]*?content="[\s\S]*?"\s*\/>/g, `<meta property="og:description" content="${seoProps.description}" />`);
        
        // Replace twitter:title
        outHtml = outHtml.replace(/<meta\s+name="twitter:title"[\s\S]*?content="[\s\S]*?"\s*\/>/g, `<meta name="twitter:title" content="${seoProps.title}" />`);
        
        // Replace twitter:description
        outHtml = outHtml.replace(/<meta\s+name="twitter:description"[\s\S]*?content="[\s\S]*?"\s*\/>/g, `<meta name="twitter:description" content="${seoProps.description}" />`);
        
        // Add canonical and og:url before </head>
        const seoTags = `
    <link rel="canonical" href="${seoProps.url}" />
    <link rel="alternate" href="${seoProps.url}" hreflang="x-default" />
    <link rel="alternate" href="${seoProps.url}" hreflang="en" />
    <meta property="og:url" content="${seoProps.url}" />
`;
        outHtml = outHtml.replace('</head>', seoTags + '</head>');
        
        // Create directory structure if needed
        const outHtmlFile = path.join(distDir, pathname.substring(1) + '.html');
        
        fs.writeFileSync(outHtmlFile, outHtml);
        console.log(`Generated SEO HTML for: ${pathname} -> ${path.basename(outHtmlFile)}`);
      }
    }
  }
}

processDirectory(srcPagesDir);
