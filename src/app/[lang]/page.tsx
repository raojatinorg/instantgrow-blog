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
import { t } from '@/lib/translations';

export default function HomePage({ params }: { params: { lang: string } }) {
  const [featured, setFeatured] = useState<BlogPost[]>([]);
  const [latest, setLatest] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, 'posts');
        let allPosts: BlogPost[] = [];
        
        try {
          // Try with index
          const publishedQuery = query(postsRef, where('published', '==', true), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(publishedQuery);
          allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
          console.log('✅ Home page: Fetched posts (indexed):', allPosts.length);
        } catch (indexError: any) {
          if (indexError?.code === 'failed-precondition') {
            console.warn('⚠️ Index not ready, using fallback...');
            // Fallback: Get all posts and filter
            const snapshot = await getDocs(postsRef);
            allPosts = snapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
              .filter(p => p.published === true)
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            console.log('✅ Home page: Fetched posts (fallback):', allPosts.length);
          } else {
            throw indexError;
          }
        }
        
        setFeatured(allPosts.filter(p => p.featured).slice(0, 3));
        setLatest(allPosts.slice(0, 6));
      } catch (error: any) {
        console.error('❌ Home page error:', error);
        console.error('Error code:', error?.code);
        console.error('Error message:', error?.message);
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
            {t(params.lang, 'heroTitle')}<br />{t(params.lang, 'heroSubtitle')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {t(params.lang, 'heroDescription')}
          </p>
          <Link href={`/${params.lang}/blog`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform shadow-lg">
              {t(params.lang, 'exploreArticles')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
            <h2 className="text-3xl font-playfair font-bold">{t(params.lang, 'featuredArticles')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((post) => (
              <BlogCard key={post.id} post={post} lang={params.lang} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Flame className="h-10 w-10 text-orange-500" />
            <h2 className="text-3xl font-playfair font-bold">{t(params.lang, 'latestArticles')}</h2>
          </div>
          {latest.length > 0 && (
            <Link href={`/${params.lang}/blog`}>
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                {t(params.lang, 'viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-4">{t(params.lang, 'loading')}</p>
          </div>
        ) : latest.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-4">{t(params.lang, 'noPosts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latest.map((post) => (
              <BlogCard key={post.id} post={post} lang={params.lang} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-20 bg-muted rounded-2xl p-12 text-center border border-border">
        <h2 className="text-3xl font-playfair font-bold mb-4 text-foreground">{t(params.lang, 'transformBusiness')}</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {t(params.lang, 'newsletterText')}
        </p>
        <Link href={`/${params.lang}/contact`}>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">{t(params.lang, 'getStarted')}</Button>
        </Link>
      </section>
    </div>
  );
}
