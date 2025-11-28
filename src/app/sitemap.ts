import { MetadataRoute } from 'next';
import { SUPPORTED_LANGUAGES } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com';
  const staticPages = ['', '/blog', '/about', '/contact'];
  
  const staticUrls = SUPPORTED_LANGUAGES.flatMap(lang =>
    staticPages.map(page => ({
      url: `${baseUrl}/${lang.code}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  return staticUrls;
}
