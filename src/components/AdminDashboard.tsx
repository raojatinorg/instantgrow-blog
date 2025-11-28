'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { BlogPost, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { generateSlug, calculateReadTime } from '@/lib/utils';
import { Trash2, Edit, Plus, RefreshCw } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [selectedLang, setSelectedLang] = useState(DEFAULT_LANGUAGE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
  };

  const handleCreateNew = () => {
    setCurrentPost({
      slug: '',
      title: {},
      excerpt: {},
      content: {},
      coverImage: '',
      category: '',
      tags: [],
      author: {
        name: 'Admin',
        avatar: 'https://via.placeholder.com/150',
        bio: 'Content Creator',
      },
      seo: {
        metaTitle: {},
        metaDescription: {},
        ogImage: '',
        keywords: [],
      },
      published: false,
      featured: false,
      readTime: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (!currentPost) return;
    
    setLoading(true);
    try {
      let coverImageUrl = currentPost.coverImage || '';
      
      if (imageFile) {
        coverImageUrl = await handleImageUpload(imageFile);
      }

      const slug = currentPost.slug || generateSlug(currentPost.title[DEFAULT_LANGUAGE] || '');
      const readTime = calculateReadTime(currentPost.content[DEFAULT_LANGUAGE] || '');

      const postData = {
        ...currentPost,
        slug,
        coverImage: coverImageUrl,
        readTime,
        updatedAt: new Date().toISOString(),
      };

      if (currentPost.id) {
        await updateDoc(doc(db, 'posts', currentPost.id), postData);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: new Date().toISOString(),
        });
      }

      await revalidateContent(slug);
      setIsEditing(false);
      setCurrentPost(null);
      setImageFile(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    }
    setLoading(false);
  };

  const revalidateContent = async (slug: string) => {
    try {
      await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: slug, type: 'blog' }),
      });
    } catch (error) {
      console.error('Revalidation error:', error);
    }
  };

  if (isEditing && currentPost) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{currentPost.id ? 'Edit Post' : 'Create New Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2 flex-wrap">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLang === lang.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLang(lang.code)}
                >
                  {lang.code.toUpperCase()}
                </Button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title ({selectedLang})</label>
              <Input
                value={currentPost.title?.[selectedLang] || ''}
                onChange={(e) => setCurrentPost({
                  ...currentPost,
                  title: { ...currentPost.title, [selectedLang]: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt ({selectedLang})</label>
              <textarea
                value={currentPost.excerpt?.[selectedLang] || ''}
                onChange={(e) => setCurrentPost({
                  ...currentPost,
                  excerpt: { ...currentPost.excerpt, [selectedLang]: e.target.value }
                })}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content ({selectedLang})</label>
              <ReactQuill
                value={currentPost.content?.[selectedLang] || ''}
                onChange={(value) => setCurrentPost({
                  ...currentPost,
                  content: { ...currentPost.content, [selectedLang]: value }
                })}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image', 'code-block'],
                    ['clean'],
                  ],
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Input
                  value={currentPost.category || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={currentPost.tags?.join(', ') || ''}
                  onChange={(e) => setCurrentPost({
                    ...currentPost,
                    tags: e.target.value.split(',').map(t => t.trim())
                  })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Title ({selectedLang})</label>
              <Input
                value={currentPost.seo?.metaTitle?.[selectedLang] || ''}
                onChange={(e) => setCurrentPost({
                  ...currentPost,
                  seo: {
                    ...currentPost.seo!,
                    metaTitle: { ...currentPost.seo?.metaTitle, [selectedLang]: e.target.value }
                  }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Description ({selectedLang})</label>
              <textarea
                value={currentPost.seo?.metaDescription?.[selectedLang] || ''}
                onChange={(e) => setCurrentPost({
                  ...currentPost,
                  seo: {
                    ...currentPost.seo!,
                    metaDescription: { ...currentPost.seo?.metaDescription, [selectedLang]: e.target.value }
                  }
                })}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={2}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentPost.published || false}
                  onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Published</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentPost.featured || false}
                  onChange={(e) => setCurrentPost({ ...currentPost, featured: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Featured</span>
              </label>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                {loading ? 'Saving...' : 'Save Post'}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">All Posts</h2>
        <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{post.title.en}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{post.excerpt.en}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Category: {post.category}</span>
                    <span>Status: {post.published ? 'Published' : 'Draft'}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
