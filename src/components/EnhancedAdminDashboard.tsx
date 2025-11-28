'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { BlogPost, ContactSubmission, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { generateSlug, calculateReadTime } from '@/lib/utils';
import { translateBlogContent } from '@/lib/translate';
import { Trash2, Edit, Plus, Eye, Languages, Save, X, Mail, MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EnhancedAdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [selectedLang, setSelectedLang] = useState(DEFAULT_LANGUAGE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [previewPost, setPreviewPost] = useState<Partial<BlogPost> | null>(null);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, views: 0 });

  useEffect(() => {
    fetchPosts();
    fetchContacts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
    setPosts(postsData);
    
    const published = postsData.filter(p => p.published).length;
    const totalViews = postsData.reduce((sum, p) => sum + (p.views || 0), 0);
    setStats({
      total: postsData.length,
      published,
      drafts: postsData.length - published,
      views: totalViews,
    });
  };

  const fetchContacts = async () => {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
    setContacts(contactsData);
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Delete this message?')) {
      await deleteDoc(doc(db, 'contacts', id));
      fetchContacts();
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await updateDoc(doc(db, 'contacts', id), { status: 'read' });
    fetchContacts();
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
        avatar: 'https://ui-avatars.com/api/?name=Admin&size=150',
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
      views: 0,
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
    if (confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleAutoTranslate = async () => {
    if (!currentPost?.title?.en) {
      alert('Fill English content first!');
      return;
    }

    setTranslating(true);
    try {
      const translations = await translateBlogContent(
        {
          title: currentPost.title.en,
          excerpt: currentPost.excerpt?.en || '',
          content: currentPost.content?.en || '',
        },
        ['hi', 'es', 'fr']
      );

      setCurrentPost({
        ...currentPost,
        title: { ...currentPost.title, ...translations.title },
        excerpt: { ...currentPost.excerpt, ...translations.excerpt },
        content: { ...currentPost.content, ...translations.content },
      });

      alert('Translation completed!');
    } catch (error) {
      alert('Translation failed');
    }
    setTranslating(false);
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
          views: 0,
          createdAt: new Date().toISOString(),
        });
      }

      setIsEditing(false);
      setCurrentPost(null);
      setImageFile(null);
      fetchPosts();
      alert('Saved!');
    } catch (error) {
      alert('Error saving');
    }
    setLoading(false);
  };

  if (isEditing && currentPost) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex justify-between items-center">
              <span>{currentPost.id ? 'Edit' : 'Create'} Post</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-white text-primary" onClick={() => setPreviewPost(currentPost)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" className="bg-white text-primary" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex justify-between items-center mb-4">
              <Tabs defaultValue="en" className="w-full">
                <TabsList>
                  {SUPPORTED_LANGUAGES.slice(0, 5).map((lang) => (
                    <TabsTrigger key={lang.code} value={lang.code}>
                      {lang.code.toUpperCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {SUPPORTED_LANGUAGES.slice(0, 5).map((lang) => (
                  <TabsContent key={lang.code} value={lang.code} className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={currentPost.title?.[lang.code] || ''}
                        onChange={(e) => setCurrentPost({
                          ...currentPost,
                          title: { ...currentPost.title, [lang.code]: e.target.value }
                        })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Excerpt</label>
                      <textarea
                        value={currentPost.excerpt?.[lang.code] || ''}
                        onChange={(e) => setCurrentPost({
                          ...currentPost,
                          excerpt: { ...currentPost.excerpt, [lang.code]: e.target.value }
                        })}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <ReactQuill
                        value={currentPost.content?.[lang.code] || ''}
                        onChange={(value) => setCurrentPost({
                          ...currentPost,
                          content: { ...currentPost.content, [lang.code]: value }
                        })}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              <Button onClick={handleAutoTranslate} disabled={translating} variant="outline" size="sm" className="ml-4">
                <Languages className="h-4 w-4 mr-2" />
                {translating ? 'Translating...' : 'Auto Translate'}
              </Button>
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
                <label className="block text-sm font-medium mb-2">Tags</label>
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
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!previewPost} onOpenChange={() => setPreviewPost(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview</DialogTitle>
            </DialogHeader>
            <div className="prose max-w-none">
              <h1>{previewPost?.title?.en}</h1>
              <p>{previewPost?.excerpt?.en}</p>
              <div dangerouslySetInnerHTML={{ __html: previewPost?.content?.en || '' }} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="contacts" className="relative">
            Contact Messages
            {contacts.filter(c => c.status === 'new').length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {contacts.filter(c => c.status === 'new').length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-secondary">{stats.published}</div>
            <div className="text-sm text-muted-foreground">Published</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-muted-foreground">{stats.drafts}</div>
            <div className="text-sm text-muted-foreground">Drafts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{stats.views}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">All Posts</h2>
        <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New
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
                    <span>{post.category}</span>
                    <span>{post.published ? '✓ Published' : '○ Draft'}</span>
                    <span>Views: {post.views || 0}</span>
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
        </TabsContent>

        <TabsContent value="contacts" className="mt-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <div className="text-sm text-muted-foreground">
              {contacts.filter(c => c.status === 'new').length} new messages
            </div>
          </div>

          <div className="grid gap-4">
            {contacts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet</p>
                </CardContent>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card key={contact.id} className={contact.status === 'new' ? 'border-primary' : ''}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Mail className={`h-5 w-5 ${contact.status === 'new' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div>
                          <h3 className="font-bold text-lg">{contact.name}</h3>
                          <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">
                            {contact.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {contact.status === 'new' && (
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            NEW
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                    </div>

                    <div className="flex gap-2">
                      {contact.status === 'new' && (
                        <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(contact.id)}>
                          Mark as Read
                        </Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteContact(contact.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
