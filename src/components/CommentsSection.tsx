'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Comment));
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) {
      alert('Please fill all fields!');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        name,
        email,
        comment,
        createdAt: new Date().toISOString(),
      });

      alert('✅ Comment posted successfully!');
      setName('');
      setEmail('');
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('❌ Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"mt-12 border-t pt-12\">
      <h3 className=\"text-2xl font-bold mb-6 flex items-center gap-2\">
        <MessageSquare className=\"h-6 w-6\" />
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className=\"mb-8 p-6 bg-muted rounded-lg\">
        <h4 className=\"font-bold mb-4\">Leave a Comment</h4>
        <div className=\"grid md:grid-cols-2 gap-4 mb-4\">
          <Input
            placeholder=\"Your Name\"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type=\"email\"
            placeholder=\"Your Email\"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <textarea
          placeholder=\"Your Comment...\"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className=\"w-full p-3 border rounded-lg mb-4 min-h-[100px]\"
          required
        />
        <Button type=\"submit\" disabled={loading}>
          <Send className=\"h-4 w-4 mr-2\" />
          {loading ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      {/* Comments List */}
      <div className=\"space-y-4\">
        {comments.length === 0 ? (
          <p className=\"text-muted-foreground text-center py-8\">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className=\"p-4 bg-muted rounded-lg\">
              <div className=\"flex items-center gap-2 mb-2\">
                <div className=\"w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold\">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className=\"font-bold\">{c.name}</p>
                  <p className=\"text-xs text-muted-foreground\">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className=\"text-sm\">{c.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
