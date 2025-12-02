'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';
import BlogCard from '@/components/BlogCard';
import LoadingScreen from '@/components/LoadingScreen';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Star, Flame, ArrowRight } from 'lucide-react';
import ReadingHistory from '@/components/ReadingHistory';

export default function HomePage() {
  const [featured, setFeatured] = useState<BlogPost[]>([]);
  const [latest, setLatest] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, 'posts');
        let allPosts: BlogPost[] = [];
        
        try {
          const publishedQuery = query(postsRef, where('published', '==', true), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(publishedQuery);
          allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        } catch (indexError: any) {
          if (indexError?.code === 'failed-precondition') {
            const snapshot = await getDocs(postsRef);
            allPosts = snapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
              .filter(p => p.published === true)
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          } else {
            throw indexError;
          }
        }
        
        setFeatured(allPosts.filter(p => p.featured).slice(0, 3));
        setLatest(allPosts.slice(0, 6));
      } catch (error: any) {
        console.error('❌ Home page error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <section className="text-center mb-20 gradient-bg py-20 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-foreground animate-fade-in">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover insights on website development, SEO, and digital growth strategies.
          </p>
          <Link href="/blog">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform shadow-lg">
              Explore Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
            <h2 className="text-3xl font-playfair font-bold">Featured Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Flame className="h-10 w-10 text-orange-500" />
            <h2 className="text-3xl font-playfair font-bold">Latest Articles</h2>
          </div>
          {latest.length > 0 && (
            <Link href="/blog">
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        {latest.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-4">No posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latest.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-20 bg-muted rounded-2xl p-12 text-center border border-border">
        <h2 className="text-3xl font-playfair font-bold mb-4 text-foreground">Transform Your Business</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get in touch with us to discuss your project and take your business to the next level.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">Get Started</Button>
        </Link>
      </section>
    </div>
  );
}
