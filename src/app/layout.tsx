import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://instantgrow.shop'),
  title: {
    default: "InstantGrow.shop - Professional Website Development & SEO Services",
    template: "%s | InstantGrow.shop",
  },
  description: "Expert insights on website development, SEO strategies, and digital marketing. Professional web development services by Rao Jatin in Rewari, Haryana.",
  keywords: "website development, SEO services, digital marketing, web design, freelance developer, rewari web developer, rao jatin",
  authors: [{ name: "Rao Jatin", url: "https://instantgrow.shop" }],
  creator: "Rao Jatin",
  publisher: "InstantGrow.shop",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://instantgrow.shop',
    siteName: 'InstantGrow.shop',
    title: 'InstantGrow.shop - Professional Website Development & SEO',
    description: 'Expert web development and SEO services to grow your business online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstantGrow.shop - Web Development & SEO',
    description: 'Professional web development services',
    creator: '@instantgrow',
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
