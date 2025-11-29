'use client';

import { useEffect } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ViewCounter({ postId }: { postId: string }) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await updateDoc(doc(db, 'posts', postId), {
          views: increment(1)
        });
        console.log('✅ View count incremented for:', postId);
      } catch (error) {
        console.error('❌ View count error:', error);
      }
    };

    // Increment after 3 seconds (user actually reading)
    const timer = setTimeout(incrementView, 3000);
    return () => clearTimeout(timer);
  }, [postId]);

  return null; // This component doesn't render anything
}
