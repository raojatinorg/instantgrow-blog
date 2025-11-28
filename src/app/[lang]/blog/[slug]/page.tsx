'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';
import Image from 'next/image';
import { Clock, Calendar, User, Eye } from 'lucide-react';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BlogPostPage({ params }: { params: { slug: string; lang: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log('🔍 Searching for slug:', params.slug);
        
        // Method 1: Try with slug + published
        let q = query(
          collection(db, 'posts'),
          where('slug', '==', params.slug)
        );
        let snapshot = await getDocs(q);
        
        console.log('📄 Found posts (all):', snapshot.docs.length);
        
        // Filter published posts
        let publishedPosts = snapshot.docs.filter(doc => doc.data().published === true);
        console.log('📄 Found published posts:', publishedPosts.length);
        
        if (publishedPosts.length === 0) {
          // Method 2: Fallback - get all published posts and find by slug
          console.log('⚠️ Trying fallback method...');
          q = query(
            collection(db, 'posts'),
            where('published', '==', true)
          );
          snapshot = await getDocs(q);
          publishedPosts = snapshot.docs.filter(doc => doc.data().slug === params.slug);
          console.log('📄 Fallback found:', publishedPosts.length);
        }
        
        if (publishedPosts.length === 0) {
          console.warn('⚠️ Post not found or not published');
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        const postDoc = publishedPosts[0];
        const postData = { id: postDoc.id, ...postDoc.data() } as BlogPost;
        
        console.log('✅ Post loaded:', postData.title.en);
        console.log('✅ Post slug:', postData.slug);
        setPost(postData);
        
        // Increment view count
        try {
          await updateDoc(doc(db, 'posts', postDoc.id), {
            views: increment(1)
          });
        } catch (viewError) {
          console.warn('View count update failed (non-critical)');
        }
      } catch (error: any) {
        console.error('❌ Error fetching post:', error);
        console.error('Error code:', error?.code);
        console.error('Error message:', error?.message);
        if (error?.code === 'failed-precondition') {
          console.error('🔥 FIRESTORE INDEX MISSING! Deploy indexes with: firebase deploy --only firestore:indexes');
        }
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    console.error('❌ POST NOT FOUND - Redirecting would happen here');
    console.error('Slug searched:', params.slug);
    console.error('Language:', params.lang);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
          <p className="text-muted-foreground mb-6">Slug: {params.slug}</p>
          <p className="text-sm text-muted-foreground mb-6">The blog post you're looking for doesn't exist or is not published.</p>
          <a href={`/${params.lang}/blog`} className="text-primary hover:underline">← Back to Blog</a>
        </div>
      </div>
    );
  }

  const title = post.title[params.lang] || post.title.en;
  const excerpt = post.excerpt[params.lang] || post.excerpt.en;
  const content = post.content[params.lang] || post.content.en;

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    image: post.coverImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://instantgrow.shop',
    },
    publisher: {
      '@type': 'Organization',
      name: 'InstantGrow.shop',
      logo: {
        '@type': 'ImageObject',
        url: 'https://instantgrow.shop/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://instantgrow.shop/${params.lang}/blog/${params.slug}`,
    },
    keywords: post.seo?.keywords?.join(', '),
    articleSection: post.category,
    wordCount: content.replace(/<[^>]*>/g, '').split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb for SEO */}
        <nav className="text-sm text-muted-foreground mb-6">
          <a href={`/${params.lang}`} className="hover:text-primary">Home</a>
          {' / '}
          <a href={`/${params.lang}/blog`} className="hover:text-primary">Blog</a>
          {' / '}
          <span className="text-foreground">{title}</span>
        </nav>

        {/* Category Badge */}
        {post.category && (
          <div className="mb-4">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-foreground leading-tight">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{post.views || 0} views</span>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden bg-muted">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            {excerpt}
          </p>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-playfair prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-primary
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-secondary
            prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-bold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-foreground prose-li:mb-2
            prose-img:rounded-lg prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-foreground px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-muted rounded-lg border">
          <div className="flex items-start gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={80}
              height={80}
              className="rounded-full"
              unoptimized
            />
            <div>
              <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
              <p className="text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Professional Website?</h3>
          <p className="mb-6">Let's build something amazing together. Get in touch for a free consultation!</p>
          <a
            href={`/${params.lang}/contact`}
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </article>
    </>
  );
}
