'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { TrendingUp, Eye } from 'lucide-react';
import Image from 'next/image';

export default function PopularPosts({ lang = 'en' }: { lang?: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          orderBy('views', 'desc'),
          limit(5)
        );
        const snapshot = await getDocs(q);
        const popularPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as BlogPost));
        setPosts(popularPosts);
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-muted rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted-foreground/20 rounded w-3/4"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-muted-foreground/20 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className="bg-muted rounded-lg p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold">🔥 Popular Posts</h3>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/${lang}/blog/${post.slug}`}
            className="flex gap-3 group hover:bg-background p-2 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title[lang] || post.title.en}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                  unoptimized
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-primary">#{index + 1}</span>
                {post.trending && (
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                    HOT
                  </span>
                )}
              </div>
              <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {post.title[lang] || post.title.en}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{post.views || 0} views</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
