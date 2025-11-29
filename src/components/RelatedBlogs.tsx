'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/types';
import BlogCard from './BlogCard';
import { Sparkles } from 'lucide-react';

export default function RelatedBlogs({ currentPostId, category, lang }: { currentPostId: string; category: string; lang: string }) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchRelatedPosts();
  }, [currentPostId, category]);

  const fetchRelatedPosts = async () => {
    try {
      const q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        where('category', '==', category),
        limit(4)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
        .filter(post => post.id !== currentPostId)
        .slice(0, 3);
      
      setRelatedPosts(posts);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  if (relatedPosts.length === 0) return null;

  return (
    <div className=\"mt-12 border-t pt-12\">
      <h3 className=\"text-2xl font-bold mb-6 flex items-center gap-2\">
        <Sparkles className=\"h-6 w-6 text-primary\" />
        More Articles You'll Love
      </h3>
      <div className=\"grid md:grid-cols-3 gap-6\">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} lang={lang} />
        ))}
      </div>
    </div>
  );
}
