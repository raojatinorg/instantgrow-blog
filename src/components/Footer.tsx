import Link from 'next/link';

export default function Footer({ lang = 'en' }: { lang?: string }) {
  return (
    <footer className="bg-muted mt-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">Premium Blog</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted source for website development, SEO, and digital growth strategies.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}`} className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href={`/${lang}/blog`} className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href={`/${lang}/about`} className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/privacy`} className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href={`/${lang}/terms`} className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href={`/${lang}/disclaimer`} className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
              <li><Link href={`/${lang}/cookies`} className="text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
              <li><Link href={`/${lang}/editorial`} className="text-muted-foreground hover:text-primary">Editorial Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Premium Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
