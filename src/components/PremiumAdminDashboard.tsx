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
import { Trash2, Edit, Plus, Eye, Save, X, Mail, MessageSquare, Code, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

export default function PremiumAdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewPost, setPreviewPost] = useState<Partial<BlogPost> | null>(null);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, views: 0 });
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [seoSuggestions, setSeoSuggestions] = useState<any>(null);

  useEffect(() => {
    fetchPosts();
    fetchContacts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as BlogPost));
      setPosts(postsData);
      
      const published = postsData.filter(p => p.published).length;
      const totalViews = postsData.reduce((sum, p) => sum + (p.views || 0), 0);
      setStats({
        total: postsData.length,
        published,
        drafts: postsData.length - published,
        views: totalViews,
      });
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      if (error?.code === 'permission-denied') {
        alert('⚠️ Firebase permission error. Check Firestore rules.');
      }
    }
  };

  const fetchContacts = async () => {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
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
      title: { en: '' },
      excerpt: { en: '' },
      content: { en: '' },
      coverImage: '',
      category: '',
      tags: [],
      author: {
        name: 'Rao Jatin',
        avatar: 'https://ui-avatars.com/api/?name=Rao+Jatin&size=150&background=F59E0B&color=fff',
        bio: 'Professional Web Developer & Digital Marketing Expert',
      },
      seo: {
        metaTitle: { en: '' },
        metaDescription: { en: '' },
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
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      if (!file) throw new Error('No file selected');
      if (file.size > 5 * 1024 * 1024) throw new Error('File too large (max 5MB)');
      
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `images/${fileName}`);
      
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      return url;
    } catch (error: any) {
      console.error('Image upload error:', error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  };

  const autoGenerateSEO = async () => {
    if (!currentPost?.title?.en) {
      alert('Please enter a title first!');
      return;
    }

    setAiGenerating(true);
    try {
      const { generateViralSEO } = await import('@/lib/gemini-seo');
      
      const result = await generateViralSEO(
        currentPost.title.en,
        currentPost.content?.en || '',
        currentPost.excerpt?.en || ''
      );

      setSeoSuggestions(result);

      setCurrentPost({
        ...currentPost,
        seo: {
          ...currentPost.seo,
          metaTitle: { en: result.metaTitle },
          metaDescription: { en: result.metaDescription },
          keywords: result.keywords,
          ogImage: currentPost.coverImage || '',
        },
      });

      alert('🚀 AI-powered viral SEO generated! Check the suggestions below.');
    } catch (error) {
      console.error('AI SEO generation error:', error);
      
      // Fallback to basic SEO
      const title = currentPost.title.en;
      const content = currentPost.content?.en || '';
      const excerpt = currentPost.excerpt?.en || '';

      const metaTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
      const metaDescription = excerpt || (content.replace(/<[^>]*>/g, '').substring(0, 157) + '...');
      const words = (title + ' ' + content.replace(/<[^>]*>/g, '')).toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 4)
        .slice(0, 10);

      setCurrentPost({
        ...currentPost,
        seo: {
          ...currentPost.seo,
          metaTitle: { en: metaTitle },
          metaDescription: { en: metaDescription },
          keywords: [...new Set(words)],
          ogImage: currentPost.coverImage || '',
        },
      });

      alert('⚠️ AI unavailable. Basic SEO generated.');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!currentPost?.title?.en) {
      alert('Please enter a title!');
      return;
    }

    setLoading(true);
    try {
      let coverImageUrl = currentPost.coverImage || '';
      
      if (imageFile) {
        try {
          coverImageUrl = await handleImageUpload(imageFile);
        } catch (imgError) {
          console.error('Image upload error:', imgError);
          alert('⚠️ Image upload failed, but continuing with post save...');
        }
      }

      const slug = currentPost.slug || generateSlug(currentPost.title.en);
      const readTime = calculateReadTime(currentPost.content?.en || '');

      // Ensure all required fields are present
      const postData = {
        slug,
        title: currentPost.title || { en: '' },
        excerpt: currentPost.excerpt || { en: '' },
        content: currentPost.content || { en: '' },
        coverImage: coverImageUrl,
        category: currentPost.category || 'Uncategorized',
        tags: currentPost.tags || [],
        author: currentPost.author || {
          name: 'Rao Jatin',
          avatar: 'https://ui-avatars.com/api/?name=Rao+Jatin&size=150&background=F59E0B&color=fff',
          bio: 'Professional Web Developer',
        },
        seo: {
          metaTitle: currentPost.seo?.metaTitle || { en: currentPost.title.en },
          metaDescription: currentPost.seo?.metaDescription || { en: currentPost.excerpt?.en || '' },
          ogImage: coverImageUrl,
          keywords: currentPost.seo?.keywords || [],
        },
        published: currentPost.published || false,
        featured: currentPost.featured || false,
        readTime,
        updatedAt: new Date().toISOString(),
      };

      if (currentPost.id) {
        await updateDoc(doc(db, 'posts', currentPost.id), postData);
        alert('✅ Post updated successfully!');
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postData,
          views: 0,
          createdAt: new Date().toISOString(),
        });
        alert('✅ Post created successfully!');
      }

      setIsEditing(false);
      setCurrentPost(null);
      setImageFile(null);
      await fetchPosts();
    } catch (error: any) {
      console.error('Error saving post:', error);
      const errorMessage = error?.message || 'Unknown error';
      alert(`❌ Error: ${errorMessage}\n\nPlease check:\n1. Firebase connection\n2. Firestore rules\n3. All required fields filled`);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing && currentPost) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {currentPost.id ? 'Edit' : 'Create New'} Blog Post
              </span>
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
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">📝 Blog Title *</label>
                <Input
                  value={currentPost.title?.en || ''}
                  onChange={(e) => setCurrentPost({
                    ...currentPost,
                    title: { ...currentPost.title, en: e.target.value }
                  })}
                  placeholder="Enter compelling blog title..."
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">🔗 URL Slug</label>
                <Input
                  value={currentPost.slug || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-2">📄 Excerpt (Short Description)</label>
              <textarea
                value={currentPost.excerpt?.en || ''}
                onChange={(e) => setCurrentPost({
                  ...currentPost,
                  excerpt: { ...currentPost.excerpt, en: e.target.value }
                })}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={3}
                placeholder="Write a compelling 150-160 character summary..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(currentPost.excerpt?.en || '').length}/160 characters
              </p>
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold">✍️ Blog Content *</label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={editorMode === 'visual' ? 'default' : 'outline'}
                    onClick={() => setEditorMode('visual')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Visual
                  </Button>
                  <Button
                    size="sm"
                    variant={editorMode === 'html' ? 'default' : 'outline'}
                    onClick={() => setEditorMode('html')}
                  >
                    <Code className="h-4 w-4 mr-1" />
                    HTML
                  </Button>
                </div>
              </div>

              {editorMode === 'visual' ? (
                <ReactQuill
                  value={currentPost.content?.en || ''}
                  onChange={(value) => setCurrentPost({
                    ...currentPost,
                    content: { ...currentPost.content, en: value }
                  })}
                  modules={quillModules}
                  className="bg-white"
                  theme="snow"
                />
              ) : (
                <textarea
                  value={currentPost.content?.en || ''}
                  onChange={(e) => setCurrentPost({
                    ...currentPost,
                    content: { ...currentPost.content, en: e.target.value }
                  })}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                  rows={20}
                  placeholder="<h2>Your HTML content here...</h2>"
                />
              )}
            </div>

            {/* SEO Section */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>🚀 AI-Powered Viral SEO</span>
                  <Button size="sm" onClick={autoGenerateSEO} variant="outline" disabled={aiGenerating}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {aiGenerating ? 'Generating...' : 'Generate Viral SEO'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {seoSuggestions && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/30">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI Viral Suggestions
                    </h3>

                    {seoSuggestions.viralTitles && seoSuggestions.viralTitles.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2 text-primary">🔥 Viral Title Options (Click to use):</h4>
                        <div className="space-y-2">
                          {seoSuggestions.viralTitles.map((title: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPost({
                                ...currentPost,
                                title: { ...currentPost.title, en: title }
                              })}
                              className="w-full text-left text-sm bg-white p-3 rounded hover:bg-primary/10 transition-colors border border-primary/20"
                            >
                              {i + 1}. {title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {seoSuggestions.viralHooks && seoSuggestions.viralHooks.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2 text-secondary">🎯 Viral Hooks:</h4>
                        <ul className="space-y-1 text-sm">
                          {seoSuggestions.viralHooks.map((hook: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-secondary">•</span>
                              <span>{hook}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {seoSuggestions.contentSuggestions && seoSuggestions.contentSuggestions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-primary">💡 Content Improvements:</h4>
                        <ul className="space-y-1 text-sm">
                          {seoSuggestions.contentSuggestions.map((suggestion: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-2">Meta Title (60 chars max)</label>
                  <Input
                    value={currentPost.seo?.metaTitle?.en || ''}
                    onChange={(e) => setCurrentPost({
                      ...currentPost,
                      seo: {
                        ...currentPost.seo,
                        metaTitle: { en: e.target.value }
                      }
                    })}
                    placeholder="SEO-optimized title for search engines"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(currentPost.seo?.metaTitle?.en || '').length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Meta Description (160 chars max)</label>
                  <textarea
                    value={currentPost.seo?.metaDescription?.en || ''}
                    onChange={(e) => setCurrentPost({
                      ...currentPost,
                      seo: {
                        ...currentPost.seo,
                        metaDescription: { en: e.target.value }
                      }
                    })}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={3}
                    placeholder="Compelling description for search results"
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(currentPost.seo?.metaDescription?.en || '').length}/160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Focus Keywords (comma-separated)</label>
                  <Input
                    value={currentPost.seo?.keywords?.join(', ') || ''}
                    onChange={(e) => setCurrentPost({
                      ...currentPost,
                      seo: {
                        ...currentPost.seo,
                        keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                      }
                    })}
                    placeholder="web development, SEO, business growth"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category & Tags */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">📁 Category</label>
                <select
                  value={currentPost.category || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Website Development">Website Development</option>
                  <option value="SEO">SEO</option>
                  <option value="Brand Building">Brand Building</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Business Growth">Business Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">🏷️ Tags (comma-separated)</label>
                <Input
                  value={currentPost.tags?.join(', ') || ''}
                  onChange={(e) => setCurrentPost({
                    ...currentPost,
                    tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                  })}
                  placeholder="wordpress, seo, marketing"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                <ImageIcon className="inline h-4 w-4 mr-1" />
                Cover Image (16:9 ratio recommended)
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {currentPost.coverImage && (
                <img src={currentPost.coverImage} alt="Current cover" className="mt-2 h-32 object-cover rounded" />
              )}
            </div>

            {/* Publishing Options */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPost.published || false}
                  onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                  className="rounded w-4 h-4"
                />
                <span className="text-sm font-semibold">✅ Publish Immediately</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPost.featured || false}
                  onChange={(e) => setCurrentPost({ ...currentPost, featured: e.target.checked })}
                  className="rounded w-4 h-4"
                />
                <span className="text-sm font-semibold">⭐ Featured Post</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t">
              <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90" size="lg">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Post'}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} size="lg">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={!!previewPost} onOpenChange={() => setPreviewPost(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview</DialogTitle>
            </DialogHeader>
            <article className="prose prose-lg max-w-none">
              <h1>{previewPost?.title?.en}</h1>
              {previewPost?.coverImage && (
                <img src={previewPost.coverImage} alt="Cover" className="w-full rounded-lg" />
              )}
              <p className="lead">{previewPost?.excerpt?.en}</p>
              <div dangerouslySetInnerHTML={{ __html: previewPost?.content?.en || '' }} />
            </article>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="contacts" className="relative">
            Messages
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
                <div className="text-3xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-secondary">{stats.published}</div>
                <div className="text-sm text-muted-foreground">Published</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-muted-foreground">{stats.drafts}</div>
                <div className="text-sm text-muted-foreground">Drafts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary">{stats.views}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">All Blog Posts</h2>
            <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create New Post
            </Button>
          </div>

          <div className="grid gap-4">
            {posts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No posts yet. Create your first blog post!</p>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {post.coverImage && (
                        <img src={post.coverImage} alt="" className="w-32 h-32 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{post.title.en}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt.en}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
                          <span>{post.published ? '✅ Published' : '📝 Draft'}</span>
                          <span>👁️ {post.views || 0} views</span>
                          <span>⏱️ {post.readTime} min read</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="mt-8">
          <h2 className="text-3xl font-bold mb-8">Contact Messages</h2>
          <div className="grid gap-4">
            {contacts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No messages yet</p>
                </CardContent>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card key={contact.id} className={contact.status === 'new' ? 'border-primary border-2' : ''}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Mail className={`h-6 w-6 ${contact.status === 'new' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div>
                          <h3 className="font-bold text-lg">{contact.name}</h3>
                          <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">
                            {contact.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {contact.status === 'new' && (
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
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
