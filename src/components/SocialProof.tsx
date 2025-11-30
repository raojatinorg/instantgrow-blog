'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function SocialProof({ postId }: { postId: string }) {
  const [readers, setReaders] = useState(0);

  useEffect(() => {
    // Simulate live readers (3-15 random)
    const randomReaders = Math.floor(Math.random() * 13) + 3;
    setReaders(randomReaders);

    // Update every 30 seconds
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
      setReaders(prev => Math.max(1, Math.min(20, prev + change)));
    }, 30000);

    return () => clearInterval(interval);
  }, [postId]);

  return (
    <div className="hidden md:flex fixed bottom-8 left-8 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg items-center gap-2 animate-pulse z-40">
      <Users className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {readers} {readers === 1 ? 'person' : 'people'} reading
      </span>
    </div>
  );
}
