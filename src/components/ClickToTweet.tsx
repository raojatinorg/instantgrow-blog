'use client';

import { Twitter } from 'lucide-react';

export default function ClickToTweet({ quote, url }: { quote: string; url: string }) {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500 rounded-r-lg group hover:shadow-lg transition-all">
      <p className="text-lg italic mb-4 text-foreground">&ldquo;{quote}&rdquo;</p>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold group-hover:gap-3 transition-all"
      >
        <Twitter className="h-5 w-5" />
        Click to Tweet
      </a>
    </div>
  );
}
