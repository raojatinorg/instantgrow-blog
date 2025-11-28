'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TestFirebase() {
  const [status, setStatus] = useState('Testing...');
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function test() {
      try {
        setStatus('Connecting to Firebase...');
        
        const postsRef = collection(db, 'posts');
        setStatus('Fetching posts...');
        
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        setStatus(`Found ${snapshot.docs.length} posts`);
        
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPosts(postsData);
      } catch (err: any) {
        setError(err.message);
        setStatus('Error!');
      }
    }
    test();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🔍 Firebase Connection Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold mb-2">Status:</h2>
          <p className={`text-lg ${error ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Posts in Database:</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts found</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border p-4 rounded">
                  <h3 className="font-bold text-lg">{post.title?.en || 'No title'}</h3>
                  <p className="text-sm text-gray-600">ID: {post.id}</p>
                  <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                  <p className="text-sm">
                    Published: {post.published ? '✅ Yes' : '❌ No'}
                  </p>
                  <p className="text-sm">
                    Featured: {post.featured ? '⭐ Yes' : 'No'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Category: {post.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 bg-blue-100 p-4 rounded">
          <h3 className="font-bold mb-2">🔧 Debug Info:</h3>
          <p className="text-sm">Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}</p>
          <p className="text-sm">Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}</p>
        </div>
      </div>
    </div>
  );
}
