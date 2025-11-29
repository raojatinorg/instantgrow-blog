import { MetadataRoute } from 'next';
import { SUPPORTED_LANGUAGES } from '@/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://instantgrow.shop';
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/editorial', priority: 0.5, changeFrequency: 'yearly' as const },
  ];
  
  // Static pages for all languages
  const staticUrls = SUPPORTED_LANGUAGES.flatMap(lang =>
    staticPages.map(page => ({
      url: `${baseUrl}/${lang.code}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Dynamic blog post URLs
  try {
    const postsSnapshot = await getDocs(collection(db, 'posts'));
    const blogUrls = postsSnapshot.docs
      .filter(doc => doc.data().published === true)
      .flatMap(doc => {
        const post = doc.data();
        return SUPPORTED_LANGUAGES.map(lang => ({
          url: `${baseUrl}/${lang.code}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
      });
    
    return [...staticUrls, ...blogUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticUrls;
  }
}
