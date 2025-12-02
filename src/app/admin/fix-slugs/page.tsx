'use client';

import { useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSlug } from '@/lib/utils';

export default function FixSlugsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const fixAllSlugs = async () => {
    setLoading(true);
    setResults([]);
    const logs: string[] = [];

    try {
      logs.push('🔍 Checking all posts...\n');
      setResults([...logs]);

      const snapshot = await getDocs(collection(db, 'posts'));
      
      if (snapshot.empty) {
        logs.push('❌ No posts found!');
        setResults([...logs]);
        setLoading(false);
        return;
      }

      logs.push(`📊 Total posts: ${snapshot.size}\n`);
      setResults([...logs]);

      let fixed = 0;
      let alreadyOk = 0;

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const title = data.title?.en;
        const currentSlug = data.slug;

        if (!title) {
          logs.push(`⚠️ Skipping post ${docSnap.id} - No title`);
          setResults([...logs]);
          continue;
        }

        if (!currentSlug || currentSlug.trim() === '') {
          const newSlug = generateSlug(title);
          
          await updateDoc(doc(db, 'posts', docSnap.id), {
            slug: newSlug,
            updatedAt: new Date().toISOString()
          });

          logs.push(`✅ Fixed: "${title}"`);
          logs.push(`   New slug: ${newSlug}`);
          logs.push(`   URL: /blog/${newSlug}\n`);
          setResults([...logs]);
          fixed++;
        } else {
          logs.push(`✓ OK: "${title}" (slug: ${currentSlug})`);
          setResults([...logs]);
          alreadyOk++;
        }
      }

      logs.push(`\n📊 Summary:`);
      logs.push(`   Fixed: ${fixed}`);
      logs.push(`   Already OK: ${alreadyOk}`);
      logs.push(`\n✅ Done! All posts now have proper slugs.`);
      logs.push(`\n🔗 Test your blog posts now!`);
      setResults([...logs]);

    } catch (error: any) {
      logs.push(`\n❌ Error: ${error.message}`);
      setResults([...logs]);
    } finally {
      setLoading(false);
    }
  };

  const checkSlugs = async () => {
    setLoading(true);
    setResults([]);
    const logs: string[] = [];

    try {
      logs.push('🔍 Checking all posts for slug field...\n');
      setResults([...logs]);

      const snapshot = await getDocs(collection(db, 'posts'));
      
      if (snapshot.empty) {
        logs.push('❌ No posts found!');
        setResults([...logs]);
        setLoading(false);
        return;
      }

      logs.push(`📊 Total posts: ${snapshot.size}\n`);
      setResults([...logs]);

      let hasIssues = false;

      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const title = data.title?.en || 'No title';
        const slug = data.slug;
        const published = data.published;

        logs.push(`📝 Post: ${title}`);
        logs.push(`   ID: ${docSnap.id}`);
        logs.push(`   Slug: ${slug || '❌ MISSING'}`);
        logs.push(`   Published: ${published ? '✅ Yes' : '❌ No'}`);
        logs.push(`   URL: /blog/${slug || 'MISSING'}\n`);
        setResults([...logs]);

        if (!slug || slug.trim() === '') {
          hasIssues = true;
          logs.push('   ⚠️ WARNING: This post has no slug!\n');
          setResults([...logs]);
        }
      });

      if (hasIssues) {
        logs.push('\n❌ Some posts are missing slugs. Click "Fix All Slugs" to fix them.');
      } else {
        logs.push('\n✅ All posts have valid slugs!');
      }
      setResults([...logs]);

    } catch (error: any) {
      logs.push(`\n❌ Error: ${error.message}`);
      setResults([...logs]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardTitle className="text-2xl">🔧 Fix Blog Slugs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h3 className="font-bold text-yellow-800 mb-2">⚠️ Problem</h3>
            <p className="text-yellow-700 text-sm">
              अगर blog card पर click करने पर article page नहीं खुल रहा है, तो यह tool उसे fix कर देगा।
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 className="font-bold text-blue-800 mb-2">ℹ️ What This Does</h3>
            <p className="text-blue-700 text-sm">
              यह tool सभी blog posts को check करेगा और missing slugs को automatically generate करेगा।
            </p>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={checkSlugs} 
              disabled={loading}
              variant="outline"
              className="flex-1"
            >
              {loading ? 'Checking...' : '🔍 Check Slugs'}
            </Button>
            <Button 
              onClick={fixAllSlugs} 
              disabled={loading}
              className="flex-1 bg-primary"
            >
              {loading ? 'Fixing...' : '🔧 Fix All Slugs'}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {results.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <h3 className="font-bold text-green-800 mb-2">✅ After Fixing</h3>
            <ol className="text-green-700 text-sm space-y-1 list-decimal list-inside">
              <li>Go to home page</li>
              <li>Click on any blog card</li>
              <li>Blog article should open properly</li>
              <li>URL should be: /blog/your-blog-slug</li>
            </ol>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex-1"
            >
              🏠 Go to Home
            </Button>
            <Button 
              onClick={() => window.location.href = '/blog'}
              variant="outline"
              className="flex-1"
            >
              📝 Go to Blog
            </Button>
            <Button 
              onClick={() => window.location.href = '/admin'}
              variant="outline"
              className="flex-1"
            >
              ⚙️ Go to Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
