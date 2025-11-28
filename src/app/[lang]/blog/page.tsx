'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/types';
import BlogCard from '@/components/BlogCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function BlogPage({ params }: { params: { lang: string } }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post => 
        post.title[params.lang]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt[params.lang]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts, params.lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-playfair font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insights on website development, SEO, and digital growth strategies.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

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
