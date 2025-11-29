'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, X } from 'lucide-react';
import Image from 'next/image';

interface HistoryItem {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  visitedAt: string;
}

export default function ReadingHistory({ lang = 'en' }: { lang?: string }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');
    setHistory(savedHistory.slice(0, 5)); // Show last 5
  }, []);

  const removeItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('readingHistory', JSON.stringify(updated));
  };

  if (history.length === 0) return null;

  return (
    <div className="bg-muted rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-bold">Continue Reading</h3>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="flex gap-3 group bg-background p-2 rounded-lg hover:shadow-md transition-all">
            <Link href={`/${lang}/blog/${item.slug}`} className="flex gap-3 flex-1">
              <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(item.visitedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
