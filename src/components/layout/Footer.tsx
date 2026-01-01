import { FileImage, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileImage className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading font-semibold">Government Form Image Editor</p>
              <p className="text-sm text-muted-foreground">Free online photo resizer for official documents</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>for hassle-free form submissions</span>
          </div>
        </div>
        
        <div className="border-t border-background/10 mt-6 pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Government Form Image Editor. All rights reserved.</p>
          <p className="mt-1">Your images are processed locally and never uploaded to any server.</p>
          <p className="text-xs mt-2 text-muted-foreground">
  Popular uses: SSC photo resizer · UPSC exam photo resize · PAN card photo size · Aadhaar photo editor · Passport size photo maker
</p>

        </div>
      </div>
    </footer>
  );
}
