'use client';

import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';

export default function BookmarkButton({ postId, title }: { postId: string; title: string }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarked(bookmarks.some((b: any) => b.id === postId));
  }, [postId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarked) {
      const updated = bookmarks.filter((b: any) => b.id !== postId);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      setBookmarked(false);
    } else {
      bookmarks.push({ id: postId, title, savedAt: new Date().toISOString() });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
        bookmarked
          ? 'bg-yellow-500 text-white'
          : 'bg-muted hover:bg-yellow-500 hover:text-white'
      }`}
    >
      <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-white' : ''}`} />
      <span>{bookmarked ? 'Saved' : 'Save'}</span>
    </button>
  );
}
