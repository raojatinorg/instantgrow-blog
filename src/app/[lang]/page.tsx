import { BlogPost } from '@/types';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

export default async function HomePage({ params }: { params: { lang: string } }) {
  const featured: BlogPost[] = [];
  const latest: BlogPost[] = [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-20 gradient-bg py-20 rounded-2xl">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-foreground">
          Grow Your Business<br />with Premium Websites
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Expert insights on website development, SEO strategies, and building a powerful digital presence.
        </p>
        <Link href={`/${params.lang}/blog`}>
          <Button size="lg" className="bg-primary hover:bg-primary/90">Explore Articles</Button>
        </Link>
      </section>

      {featured.length > 0 && (
        <section className="mb-20">
          <h2 className="text-3xl font-playfair font-bold mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((post) => (
              <BlogCard key={post.id} post={post} lang={params.lang} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair font-bold">Latest Articles</h2>
          <Link href={`/${params.lang}/blog`}>
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        {latest.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-4">No posts yet. Check back soon for amazing content!</p>
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
        <h2 className="text-3xl font-playfair font-bold mb-4 text-foreground">Ready to Transform Your Business?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for weekly insights on website development, SEO, and digital growth.
        </p>
        <Link href={`/${params.lang}/contact`}>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">Get Started</Button>
        </Link>
      </section>
    </div>
  );
}
