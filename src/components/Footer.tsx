import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted mt-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-playfair font-bold text-foreground">InstantGrow<span className="text-primary">.shop</span></h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Professional website development and SEO services to grow your business online.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
              <li><Link href="/cookies" className="text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
              <li><Link href="/editorial" className="text-muted-foreground hover:text-primary">Editorial Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InstantGrow.shop - All Rights Reserved | Developed by <a href="mailto:info.raojatin@gmail.com" className="text-primary hover:underline">Rao Jatin</a></p>
        </div>
      </div>
    </footer>
  );
}
