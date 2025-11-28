'use client';

import Image from 'next/image';
import { BlogPost } from '@/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  post: BlogPost;
  lang: string;
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  const router = useRouter();
  
  const handleClick = () => {
    const url = `/${lang}/blog/${post.slug}`;
    console.log('🔗 Clicking blog card');
    console.log('📝 Post:', post.title.en);
    console.log('🔗 Slug:', post.slug);
    console.log('🌐 URL:', url);
    router.push(url);
  };
  
  return (
    <Card 
      onClick={handleClick}
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full border hover:border-primary/50 cursor-pointer"
    >
        <div className="relative h-48 w-full bg-muted">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title[lang] || post.title.en}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
            {post.category}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-playfair font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {post.title[lang] || post.title.en}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.excerpt[lang] || post.excerpt.en}
          </p>
        </CardContent>
        <CardFooter className="px-6 pb-6 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-secondary" />
            <span>{post.readTime} min read</span>
          </div>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </CardFooter>
    </Card>
  );
}
