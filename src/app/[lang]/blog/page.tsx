'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/types';
import BlogCard from '@/components/BlogCard';
import LoadingScreen from '@/components/LoadingScreen';
import AdvancedSearch from '@/components/AdvancedSearch';

export default function BlogPage({ params }: { params: { lang: string } }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let postsData: BlogPost[] = [];
        
        try {
          // Try with index
          const q = query(
            collection(db, 'posts'),
            where('published', '==', true),
            orderBy('createdAt', 'desc')
          );
          const snapshot = await getDocs(q);
          postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
          console.log('✅ Blog page: Fetched posts (indexed):', postsData.length);
        } catch (indexError: any) {
          if (indexError?.code === 'failed-precondition') {
            console.warn('⚠️ Index not ready, using fallback...');
            // Fallback: Get all posts and filter
            const snapshot = await getDocs(collection(db, 'posts'));
            postsData = snapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
              .filter(p => p.published === true)
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            console.log('✅ Blog page: Fetched posts (fallback):', postsData.length);
          } else {
            throw indexError;
          }
        }
        
        setPosts(postsData);
        setFilteredPosts(postsData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(postsData.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error: any) {
        console.error('❌ Blog page error:', error);
        console.error('Error code:', error?.code);
        console.error('Error message:', error?.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleSearch = (filters: any) => {
    let filtered = [...posts];

    // Search query
    if (filters.query) {
      filtered = filtered.filter(post => 
        post.title[params.lang]?.toLowerCase().includes(filters.query.toLowerCase()) ||
        post.excerpt[params.lang]?.toLowerCase().includes(filters.query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Sort
    if (filters.sortBy === 'popular') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (filters.sortBy === 'trending') {
      filtered = filtered.filter(p => p.trending).concat(filtered.filter(p => !p.trending));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredPosts(filtered);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-playfair font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insights on website development, SEO, and digital growth strategies.
        </p>
      </div>

      <AdvancedSearch onSearch={handleSearch} categories={categories} />

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} lang={params.lang} />
          ))}
        </div>
      )}
    </div>
  );
}
