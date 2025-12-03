'use client';

import { useEffect } from 'react';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ViewCounterProps {
  postId: string;
  postData?: {
    slug: string;
    title: string;
    coverImage: string;
  };
}

export default function ViewCounter({ postId, postData }: ViewCounterProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await updateDoc(doc(db, 'posts', postId), {
          views: increment(1)
        });
        
        // Save to reading history
        if (postData) {
          const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
          const newItem = {
            id: postId,
            slug: postData.slug,
            title: postData.title,
            coverImage: postData.coverImage,
            visitedAt: new Date().toISOString()
          };
          
          const filtered = history.filter((item: any) => item.id !== postId);
          filtered.unshift(newItem);
          const updated = filtered.slice(0, 10);
          localStorage.setItem('readingHistory', JSON.stringify(updated));
        }
      } catch (error) {
        console.error('View count error:', error);
      }
    };

    const timer = setTimeout(incrementView, 3000);
    return () => clearTimeout(timer);
  }, [postId, postData?.slug, postData?.title, postData?.coverImage]);

  return null; // This component doesn't render anything
}
