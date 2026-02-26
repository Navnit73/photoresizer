import fs from "fs";
import path from "path";
import { globSync } from "glob";

const pagesDir = path.resolve("src/pages");
const toolsDir = path.resolve("src/pages/tools");

const files = [
  ...globSync(`${toolsDir}/*.tsx`),
  path.join(pagesDir, "ssc-photo-resizer.tsx"),
  path.join(pagesDir, "upsc-photo-size.tsx"),
  path.join(pagesDir, "reduce-photo-size-50kb.tsx"),
  path.join(pagesDir, "signature-resize-ibps.tsx"),
];

let modifiedCount = 0;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.warn(`File not found: ${file}`);
    continue;
  }

  let content = fs.readFileSync(file, "utf8");

  // Check if AmazonAd is already present
  if (content.includes("AmazonAd")) {
    console.log(`Skipping (already has AmazonAd): ${file}`);
    continue;
  }

  // 1. Add Import
  // Find the last import
  const importMatches = [...content.matchAll(/^import .* from .*$/gm)];
  if (importMatches.length > 0) {
    const lastImportMatch = importMatches[importMatches.length - 1];
    const insertPos = lastImportMatch.index + lastImportMatch[0].length;

    content =
      content.slice(0, insertPos) +
      '\nimport { AmazonAd } from "@/components/shared/AmazonAd";' +
      content.slice(insertPos);
  } else {
    content =
      'import { AmazonAd } from "@/components/shared/AmazonAd";\n' + content;
  }

  // 2. Add Component after the first </section>
  // This places it right under the main tool editor block!
  content = content.replace(
    /<\/section>/,
    `</section>\n\n          <div className="py-2">\n            <AmazonAd />\n          </div>`,
  );

  fs.writeFileSync(file, content, "utf8");
  console.log(`Injected AmazonAd into: ${file}`);
  modifiedCount++;
}

console.log(`\nSuccessfully modified ${modifiedCount} files.`);
