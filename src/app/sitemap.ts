import { MetadataRoute } from 'next';
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
  
  const staticUrls = staticPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  try {
    const postsSnapshot = await getDocs(collection(db, 'posts'));
    const blogUrls = postsSnapshot.docs
      .filter(doc => doc.data().published === true)
      .map(doc => {
        const post = doc.data();
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        };
      });
    
    return [...staticUrls, ...blogUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticUrls;
  }
}
