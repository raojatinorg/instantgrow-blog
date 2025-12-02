export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    keywords: string[];
  };
  published: boolean;
  featured: boolean;
  readTime: number;
  views?: number;
  likes?: number;
  trending?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface UserActivity {
  userId: string;
  postId: string;
  liked: boolean;
  bookmarked: boolean;
  readingHistory: string[];
  lastVisited: string;
}
