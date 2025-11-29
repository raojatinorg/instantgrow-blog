import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { t } from '@/lib/translations';

export default function Footer({ lang = 'en' }: { lang?: string }) {
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
              {t(lang, 'footerDescription')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t(lang, 'quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}`} className="text-muted-foreground hover:text-primary">{t(lang, 'home')}</Link></li>
              <li><Link href={`/${lang}/blog`} className="text-muted-foreground hover:text-primary">{t(lang, 'blog')}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-muted-foreground hover:text-primary">{t(lang, 'about')}</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-muted-foreground hover:text-primary">{t(lang, 'contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t(lang, 'legal')}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/privacy`} className="text-muted-foreground hover:text-primary">{t(lang, 'privacyPolicy')}</Link></li>
              <li><Link href={`/${lang}/terms`} className="text-muted-foreground hover:text-primary">{t(lang, 'termsOfService')}</Link></li>
              <li><Link href={`/${lang}/disclaimer`} className="text-muted-foreground hover:text-primary">{t(lang, 'disclaimer')}</Link></li>
              <li><Link href={`/${lang}/cookies`} className="text-muted-foreground hover:text-primary">{t(lang, 'cookiePolicy')}</Link></li>
              <li><Link href={`/${lang}/editorial`} className="text-muted-foreground hover:text-primary">{t(lang, 'editorialPolicy')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InstantGrow.shop - {t(lang, 'allRightsReserved')} | {t(lang, 'developedBy')} <a href="mailto:info.raojatin@gmail.com" className="text-primary hover:underline">Rao Jatin</a></p>
        </div>
      </div>
    </footer>
  );
}
