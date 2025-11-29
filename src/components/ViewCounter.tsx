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
        console.log('✅ View count incremented for:', postId);
        
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
          
          // Remove if already exists
          const filtered = history.filter((item: any) => item.id !== postId);
          // Add to beginning
          filtered.unshift(newItem);
          // Keep only last 10
          const updated = filtered.slice(0, 10);
          localStorage.setItem('readingHistory', JSON.stringify(updated));
        }
      } catch (error) {
        console.error('❌ View count error:', error);
      }
    };

    // Increment after 3 seconds (user actually reading)
    const timer = setTimeout(incrementView, 3000);
    return () => clearTimeout(timer);
  }, [postId, postData]);

  return null; // This component doesn't render anything
}
