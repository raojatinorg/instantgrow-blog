'use client';

import Image from 'next/image';
import { BlogPost } from '@/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Clock, Heart, Eye, Flame, Sparkles } from 'lucide-react';
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
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border hover:border-primary hover:scale-[1.02] cursor-pointer group"
    >
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title[lang] || post.title.en}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {post.trending && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold animate-pulse">
                <Flame className="h-3 w-3" />
                HOT
              </div>
            )}
            {post.featured && (
              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                <Sparkles className="h-3 w-3" />
                FEATURED
              </div>
            )}
          </div>
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {post.category}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-playfair font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title[lang] || post.title.en}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {post.excerpt[lang] || post.excerpt.en}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            {post.views && post.views > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.views}</span>
              </div>
            )}
            {post.likes && post.likes > 0 && (
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                <span>{post.likes}</span>
              </div>
            )}
          </div>
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
