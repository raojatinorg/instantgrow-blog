'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const postRef = doc(db, 'posts', postId);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setLikes(postSnap.data().likes || 0);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();

    // Check if already liked
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setLiked(likedPosts.includes(postId));
  }, [postId]);

  const handleLike = async () => {
    if (loading || liked) return;
    
    setLoading(true);
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(1)
      });
      
      setLikes(prev => prev + 1);
      setLiked(true);
      
      // Save to localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      likedPosts.push(postId);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading || liked}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
        liked
          ? 'bg-red-500 text-white'
          : 'bg-muted hover:bg-red-500 hover:text-white'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Heart className={`h-5 w-5 ${liked ? 'fill-white' : ''}`} />
      <span>{likes} {liked ? 'Liked' : 'Like'}</span>
    </button>
  );
}
