import { FileImage, Heart, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileImage className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading font-semibold">
                Government Form Image Editor
              </p>
              <p className="text-sm text-background/70">
                Free online photo resizer for official documents
              </p>
            </div>
          </div>

          {/* Love line */}
          <div className="flex items-center gap-1 text-sm text-background/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>for hassle-free form submissions</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/15 mt-6 pt-6 text-center text-xs text-background/60 space-y-2">
          <p>
            © {new Date().getFullYear()} Government Form Image Editor. All rights reserved.
          </p>

          <p>
            Your images are processed locally and never uploaded to any server.
          </p>

          <p>
            Popular uses: SSC photo resizer · UPSC exam photo resize · PAN card photo size · Aadhaar photo editor · Passport size photo maker
          </p>

          {/* Developer info */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-background/70">
            <span className="font-medium">
              Developed by <b className="text-background">Navnit Rai</b>
            </span>

            <span className="hidden sm:inline">•</span>

            <a
              href="mailto:navnitrai5389@gmail.com"
              className="flex items-center gap-1 hover:text-background transition"
            >
              <Mail className="w-3.5 h-3.5" />
              navnitrai5389@gmail.com
            </a>

            <span className="hidden sm:inline">•</span>

            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              7355087072
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
