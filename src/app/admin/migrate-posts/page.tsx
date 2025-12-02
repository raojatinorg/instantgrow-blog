'use client';

import { useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MigratePostsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const migratePosts = async () => {
    setLoading(true);
    setResults([]);
    const logs: string[] = [];

    try {
      logs.push('🔄 Starting migration...\n');
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

      let migrated = 0;
      let skipped = 0;

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        
        if (typeof data.title === 'string') {
          logs.push(`✓ Already migrated: "${data.title}"`);
          setResults([...logs]);
          skipped++;
          continue;
        }

        const updates: any = {};
        
        if (data.title?.en) updates.title = data.title.en;
        if (data.excerpt?.en) updates.excerpt = data.excerpt.en;
        if (data.content?.en) updates.content = data.content.en;
        if (data.seo?.metaTitle?.en) updates['seo.metaTitle'] = data.seo.metaTitle.en;
        if (data.seo?.metaDescription?.en) updates['seo.metaDescription'] = data.seo.metaDescription.en;

        if (Object.keys(updates).length > 0) {
          await updateDoc(doc(db, 'posts', docSnap.id), {
            ...updates,
            updatedAt: new Date().toISOString()
          });

          logs.push(`✅ Migrated: "${updates.title}"`);
          setResults([...logs]);
          migrated++;
        } else {
          skipped++;
        }
      }

      logs.push(`\n📊 Summary: Migrated ${migrated}, Already OK ${skipped}`);
      logs.push(`\n✅ Done! URLs are now /blog/slug`);
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
          <CardTitle className="text-2xl">🔄 Migrate to Simple Format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 className="font-bold text-blue-800 mb-2">ℹ️ What This Does</h3>
            <p className="text-blue-700 text-sm">
              Converts posts from multi-language format to simple format. URLs will be /blog/slug instead of /en/blog/slug
            </p>
          </div>

          <Button 
            onClick={migratePosts} 
            disabled={loading}
            className="w-full bg-primary"
            size="lg"
          >
            {loading ? '🔄 Migrating...' : '🚀 Start Migration'}
          </Button>

          {results.length > 0 && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {results.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex-1"
            >
              🏠 Home
            </Button>
            <Button 
              onClick={() => window.location.href = '/admin'}
              variant="outline"
              className="flex-1"
            >
              ⚙️ Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
