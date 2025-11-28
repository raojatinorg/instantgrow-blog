'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedAdminDashboard from '@/components/EnhancedAdminDashboard';
import BlogPromptGenerator from '@/components/BlogPromptGenerator';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('raojatin@admin.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPromptGenerator, setShowPromptGenerator] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Card className="w-full max-w-md shadow-lg border">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-primary/30 focus:border-primary"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="border-primary/30 focus:border-primary"
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">{error}</div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-primary text-primary-foreground border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-playfair font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowPromptGenerator(!showPromptGenerator)} 
              variant="outline" 
              className="bg-white text-primary hover:bg-white/90 border-white"
            >
              {showPromptGenerator ? 'Dashboard' : 'Blog Prompt'}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="bg-white text-primary hover:bg-white/90 border-white">
              Logout
            </Button>
          </div>
        </div>
      </div>
      {showPromptGenerator ? <BlogPromptGenerator /> : <EnhancedAdminDashboard />}
    </div>
  );
}
