'use client';

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('newsletterSubscribed');
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    
    if (!hasSubscribed && !hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000); // Show after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterPopupSeen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: new Date().toISOString(),
        active: true
      });
      
      setSuccess(true);
      localStorage.setItem('newsletterSubscribed', 'true');
      
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </button>

        {!success ? (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Mail className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-playfair font-bold text-center mb-2">
              📧 Stay Updated!
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Get the latest articles delivered to your inbox. No spam, unsubscribe anytime.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? 'Subscribing...' : 'Subscribe Now 🚀'}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Welcome Aboard!</h3>
            <p className="text-muted-foreground">
              You're now subscribed to our newsletter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
