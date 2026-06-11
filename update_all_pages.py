import os
import glob

example_jsx = """          {/* ── Example Showcase ────────────────────────────────────────────── */}
          <section className="py-14 bg-slate-50 dark:bg-slate-900/50 border-y border-border">
            <div className="container px-4 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground mb-3">
                  See Your Photo Transform
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  From upload to print-ready — see the complete process with measurements and dimensions.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] relative bg-slate-100 dark:bg-slate-800">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                      alt="Passport photo with measurements"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-base font-bold text-card-foreground">AI Processing</p>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Face detection with biometric measurements applied</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] relative bg-slate-100 dark:bg-slate-800">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg"
                      alt="Final compliant photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-base font-bold text-card-foreground">Final Output</p>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Government-compliant photo with white background</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                  <a href="https://www.photoresizer.co.in/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer" className="block aspect-[3/4] relative bg-slate-100 dark:bg-slate-800 group overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779076959/MakePassportPhoto_ph2uog.jpg"
                      alt="4x6 print sheet"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                  <div className="p-5">
                    <a href="https://www.photoresizer.co.in/passport-photo-print-template-generator" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-card-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
                      Print Template
                      <span className="text-xs">↗</span>
                    </a>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Ready-to-print 4×6 inch sheet with crop guides</p>
                  </div>
                </div>
              </div>
            </div>
          </section>"""

# Grab all potential tool pages
pages = glob.glob("/Users/navnitrai/Desktop/My/photoresizer/src/pages/*.tsx")

for page in pages:
    # Skip main layout/components if any, or non-tool pages
    basename = os.path.basename(page)
    if basename in ['Home.tsx', 'Index.tsx', 'About.tsx', 'Contact.tsx', 'NotFound.tsx', 'BlogList.tsx', 'BlogPage.tsx', 'FAQ.tsx', 'DynamicPageResolver.tsx', 'ToolsList.tsx']:
        continue
        
    with open(page, "r") as f:
        content = f.read()
    
    # If not a tool page, skip
    if 'id="tool"' not in content and "PassportApiTool" not in content and "PhotoResizerTool" not in content:
        continue
    
    # If it already has an Example Showcase (from before)
    if "{/* ── Example Showcase" in content:
        start_idx = content.find("{/* ── Example Showcase")
        end_idx = content.find("</section>", start_idx) + 10
        new_content = content[:start_idx] + example_jsx + content[end_idx:]
    else:
        # insert after the tool section
        tool_end = content.find("</section>", content.find('id="tool"')) + 10
        if tool_end > 9:
            new_content = content[:tool_end] + "\n" + example_jsx + content[tool_end:]
        else:
            continue
        
    with open(page, "w") as f:
        f.write(new_content)
print("Updated all other pages.")
