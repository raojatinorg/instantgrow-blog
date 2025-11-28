'use client';

import { useEffect } from 'react';

interface SEOEnhancerProps {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  url: string;
  publishedTime: string;
  modifiedTime: string;
  author: string;
}

export default function SEOEnhancer({
  title,
  description,
  keywords,
  ogImage,
  url,
  publishedTime,
  modifiedTime,
  author,
}: SEOEnhancerProps) {
  useEffect(() => {
    // Add structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      image: ogImage,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Premium Blog',
        logo: {
          '@type': 'ImageObject',
          url: '/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [title, description, ogImage, url, publishedTime, modifiedTime, author]);

  return null;
}
