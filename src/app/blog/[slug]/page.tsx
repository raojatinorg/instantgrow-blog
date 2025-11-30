import { BlogPost } from '@/types';
import Image from 'next/image';
import { Clock, Calendar, User, Eye } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Metadata } from 'next';
import ViewCounter from '@/components/ViewCounter';
import CommentsSection from '@/components/CommentsSection';
import RelatedBlogs from '@/components/RelatedBlogs';
import ShareButtons from '@/components/ShareButtons';
import ReadingProgress from '@/components/ReadingProgress';
import LikeButton from '@/components/LikeButton';
import BookmarkButton from '@/components/BookmarkButton';
import ScrollToTop from '@/components/ScrollToTop';
import TableOfContents from '@/components/TableOfContents';
import SocialProof from '@/components/SocialProof';
import PopularPosts from '@/components/PopularPosts';
import PrintButton from '@/components/PrintButton';
import FontSizeAdjuster from '@/components/FontSizeAdjuster';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    const posts = snapshot.docs.map(doc => ({
      slug: doc.data().slug
    }));
    
    return posts.filter(p => p.slug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const q = query(collection(db, 'posts'), where('slug', '==', params.slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const post = snapshot.docs[0].data() as BlogPost;
      const title = post.title.en;
      const excerpt = post.excerpt.en;
      
      return {
        title: post.seo?.metaTitle?.en || title,
        description: post.seo?.metaDescription?.en || excerpt,
        keywords: post.seo?.keywords?.join(', '),
        openGraph: {
          title: title,
          description: excerpt,
          images: [post.coverImage],
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: title,
          description: excerpt,
          images: [post.coverImage],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: 'Blog Post',
    description: 'Read our latest blog post',
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: BlogPost | null = null;
  let notFound = false;

  try {
    const q = query(
      collection(db, 'posts'),
      where('slug', '==', params.slug)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const publishedPosts = snapshot.docs.filter(doc => doc.data().published === true);
      if (publishedPosts.length > 0) {
        post = { id: publishedPosts[0].id, ...publishedPosts[0].data() } as BlogPost;
      } else {
        notFound = true;
      }
    } else {
      notFound = true;
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound = true;
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
          <p className="text-muted-foreground mb-6">Slug: {params.slug}</p>
          <a href="/blog" className="text-primary hover:underline">← Back to Blog</a>
        </div>
      </div>
    );
  }

  const title = post.title.en;
  const excerpt = post.excerpt.en;
  const content = post.content.en;

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
      '@id': `https://instantgrow.shop/blog/${params.slug}`,
    },
    keywords: post.seo?.keywords?.join(', '),
    articleSection: post.category,
    wordCount: content.replace(/<[^>]*>/g, '').split(/\s+/).length,
  };

  return (
    <>
      <ReadingProgress />
      <FontSizeAdjuster />
      <ViewCounter 
        postId={post.id} 
        postData={{
          slug: post.slug,
          title: title,
          coverImage: post.coverImage
        }}
      />
      <ScrollToTop />
      <SocialProof postId={post.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <TableOfContents />
            <PopularPosts lang="en" />
          </aside>

          <article className="lg:col-span-9">
        <nav className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a>
          {' / '}
          <a href="/blog" className="hover:text-primary">Blog</a>
          {' / '}
          <span className="text-foreground">{title}</span>
        </nav>

        {post.category && (
          <div className="mb-4">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-foreground leading-tight hover:text-primary transition-colors">
          {title}
        </h1>

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

        {post.coverImage && (
          <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden bg-muted shadow-2xl group">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {excerpt && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            {excerpt}
          </p>
        )}

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

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 mb-6">
            <LikeButton postId={post.id} />
            <BookmarkButton postId={post.id} title={title} />
            <PrintButton />
          </div>
          <ShareButtons title={title} url={`https://instantgrow.shop/blog/${params.slug}`} />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8">
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

        <div className="mt-12 p-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Professional Website?</h3>
          <p className="mb-6">Let's build something amazing together. Get in touch for a free consultation!</p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Contact Us
          </a>
        </div>

        <RelatedBlogs currentPostId={post.id} category={post.category} lang="en" />

        <CommentsSection postId={post.id} />
      </article>
      </div>
      </div>
    </>
  );
}
