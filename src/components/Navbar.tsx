'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { SUPPORTED_LANGUAGES } from '@/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'en';

  const navLinks = [
    { href: `/${currentLang}`, label: 'Home' },
    { href: `/${currentLang}/blog`, label: 'Blog' },
    { href: `/${currentLang}/about`, label: 'About' },
    { href: `/${currentLang}/contact`, label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-2 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${currentLang}`} className="text-2xl font-playfair font-bold text-foreground hover:text-primary transition-colors">
              Premium Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {currentLang.toUpperCase()}
              </Button>
              
              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-md shadow-lg max-h-96 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <Link
                      key={lang.code}
                      href={pathname.replace(`/${currentLang}`, `/${lang.code}`)}
                      className="block px-4 py-2 text-sm hover:bg-accent"
                      onClick={() => setLangOpen(false)}
                    >
                      {lang.nativeName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
