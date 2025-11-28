# Firestore Database Schema

## Collections Overview

```
firestore/
├── posts/              # Blog posts
├── categories/         # Post categories
└── users/             # User profiles (optional)
```

## Posts Collection

**Collection Path:** `/posts/{postId}`

### Document Structure

```typescript
{
  // Identifiers
  id: string;                    // Auto-generated document ID
  slug: string;                  // URL-friendly slug (unique)
  
  // Multi-language Content
  title: {
    en: string;                  // English title
    hi: string;                  // Hindi title
    ta: string;                  // Tamil title
    // ... other languages
  };
  
  excerpt: {
    en: string;                  // English excerpt
    hi: string;                  // Hindi excerpt
    // ... other languages
  };
  
  content: {
    en: string;                  // English HTML content
    hi: string;                  // Hindi HTML content
    // ... other languages
  };
  
  // Media
  coverImage: string;            // Firebase Storage URL
  
  // Taxonomy
  category: string;              // Category name
  tags: string[];                // Array of tags
  
  // Author Information
  author: {
    name: string;                // Author name
    avatar: string;              // Author avatar URL
    bio: string;                 // Author bio
  };
  
  // SEO Fields
  seo: {
    metaTitle: {
      en: string;
      hi: string;
      // ... other languages
    };
    metaDescription: {
      en: string;
      hi: string;
      // ... other languages
    };
    ogImage: string;             // Open Graph image URL
    keywords: string[];          // SEO keywords
  };
  
  // Status
  published: boolean;            // Published status
  featured: boolean;             // Featured on homepage
  
  // Metadata
  readTime: number;              // Estimated read time in minutes
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}
```

### Example Document

```json
{
  "id": "abc123",
  "slug": "how-to-build-premium-website",
  "title": {
    "en": "How to Build a Premium Website in 2024",
    "hi": "2024 में प्रीमियम वेबसाइट कैसे बनाएं",
    "es": "Cómo construir un sitio web premium en 2024"
  },
  "excerpt": {
    "en": "Learn the essential steps to create a professional, high-converting website.",
    "hi": "एक पेशेवर, उच्च-परिवर्तन वेबसाइट बनाने के लिए आवश्यक कदम सीखें।"
  },
  "content": {
    "en": "<h2>Introduction</h2><p>Building a premium website requires...</p>",
    "hi": "<h2>परिचय</h2><p>एक प्रीमियम वेबसाइट बनाने के लिए...</p>"
  },
  "coverImage": "https://firebasestorage.googleapis.com/v0/b/raosuplode.appspot.com/o/images%2F1234567890_cover.jpg?alt=media",
  "category": "Website Development",
  "tags": ["web design", "development", "SEO", "business"],
  "author": {
    "name": "John Doe",
    "avatar": "https://firebasestorage.googleapis.com/v0/b/raosuplode.appspot.com/o/images%2Favatar.jpg?alt=media",
    "bio": "Web development expert with 10+ years of experience"
  },
  "seo": {
    "metaTitle": {
      "en": "How to Build a Premium Website in 2024 | Complete Guide",
      "hi": "2024 में प्रीमियम वेबसाइट कैसे बनाएं | पूर्ण गाइड"
    },
    "metaDescription": {
      "en": "Step-by-step guide to building a premium website that converts. Learn design, development, and SEO best practices.",
      "hi": "एक प्रीमियम वेबसाइट बनाने के लिए चरण-दर-चरण गाइड जो परिवर्तित करती है।"
    },
    "ogImage": "https://firebasestorage.googleapis.com/v0/b/raosuplode.appspot.com/o/images%2Fog-image.jpg?alt=media",
    "keywords": ["premium website", "web development", "website design", "SEO", "business website"]
  },
  "published": true,
  "featured": true,
  "readTime": 8,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Indexes Required

Create these composite indexes in Firestore:

1. **Published Posts by Date**
   - Collection: `posts`
   - Fields: `published` (Ascending), `createdAt` (Descending)

2. **Featured Posts by Date**
   - Collection: `posts`
   - Fields: `published` (Ascending), `featured` (Ascending), `createdAt` (Descending)

3. **Posts by Category**
   - Collection: `posts`
   - Fields: `published` (Ascending), `category` (Ascending), `createdAt` (Descending)

4. **Posts by Slug**
   - Collection: `posts`
   - Fields: `slug` (Ascending), `published` (Ascending)

### Creating Indexes

Go to Firebase Console > Firestore > Indexes and create the above indexes, or they will be auto-created when you run queries.

## Categories Collection

**Collection Path:** `/categories/{categoryId}`

### Document Structure

```typescript
{
  id: string;                    // Auto-generated document ID
  slug: string;                  // URL-friendly slug
  name: {
    en: string;                  // English name
    hi: string;                  // Hindi name
    // ... other languages
  };
  description: {
    en: string;                  // English description
    hi: string;                  // Hindi description
    // ... other languages
  };
  createdAt: string;             // ISO 8601 timestamp
}
```

### Example Document

```json
{
  "id": "cat123",
  "slug": "website-development",
  "name": {
    "en": "Website Development",
    "hi": "वेबसाइट विकास",
    "es": "Desarrollo Web"
  },
  "description": {
    "en": "Articles about building and developing websites",
    "hi": "वेबसाइट बनाने और विकसित करने के बारे में लेख"
  },
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Users Collection (Optional)

**Collection Path:** `/users/{userId}`

### Document Structure

```typescript
{
  uid: string;                   // Firebase Auth UID
  email: string;                 // User email
  displayName: string;           // Display name
  role: string;                  // "admin" | "editor" | "viewer"
  createdAt: string;             // ISO 8601 timestamp
  lastLogin: string;             // ISO 8601 timestamp
}
```

### Example Document

```json
{
  "uid": "firebase-auth-uid-123",
  "email": "admin@example.com",
  "displayName": "Admin User",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastLogin": "2024-01-15T10:30:00.000Z"
}
```

## Security Rules

See `firestore.rules` file for complete security rules.

### Key Rules

1. **Posts**: Read if published, write if admin
2. **Categories**: Read all, write if admin
3. **Users**: Read/write own document only

## Data Migration

### Import Sample Data

Use Firebase Admin SDK to import sample data:

```javascript
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const samplePost = {
  slug: "grow-business-with-websites",
  title: {
    en: "How to Grow Your Business with Websites",
    hi: "वेबसाइटों के साथ अपने व्यवसाय को कैसे बढ़ाएं"
  },
  excerpt: {
    en: "Discover proven strategies to expand your business using a professional website.",
    hi: "एक पेशेवर वेबसाइट का उपयोग करके अपने व्यवसाय का विस्तार करने के लिए सिद्ध रणनीतियों की खोज करें।"
  },
  content: {
    en: "<h2>Introduction</h2><p>In today's digital age...</p>",
    hi: "<h2>परिचय</h2><p>आज के डिजिटल युग में...</p>"
  },
  coverImage: "https://via.placeholder.com/1200x600",
  category: "Business Growth",
  tags: ["business", "websites", "growth", "digital marketing"],
  author: {
    name: "Admin",
    avatar: "https://via.placeholder.com/150",
    bio: "Digital marketing expert"
  },
  seo: {
    metaTitle: {
      en: "How to Grow Your Business with Websites | Expert Guide",
      hi: "वेबसाइटों के साथ अपने व्यवसाय को कैसे बढ़ाएं | विशेषज्ञ गाइड"
    },
    metaDescription: {
      en: "Learn how to leverage websites to grow your business exponentially.",
      hi: "अपने व्यवसाय को तेजी से बढ़ाने के लिए वेबसाइटों का लाभ उठाना सीखें।"
    },
    ogImage: "https://via.placeholder.com/1200x630",
    keywords: ["business growth", "websites", "digital presence", "online business"]
  },
  published: true,
  featured: true,
  readTime: 7,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

db.collection('posts').add(samplePost)
  .then(() => console.log('Sample post created'))
  .catch(err => console.error(err));
```

## Best Practices

1. **Always use timestamps**: Store as ISO 8601 strings
2. **Multi-language**: Always provide at least English (en) content
3. **Slugs**: Must be unique and URL-friendly
4. **Images**: Store in Firebase Storage, save URLs in Firestore
5. **Published status**: Use for draft/published workflow
6. **Featured**: Use to highlight important posts
7. **Read time**: Auto-calculate based on content length
8. **SEO fields**: Always fill for better search visibility

## Querying Examples

### Get Published Posts

```typescript
const q = query(
  collection(db, 'posts'),
  where('published', '==', true),
  orderBy('createdAt', 'desc'),
  limit(10)
);
```

### Get Featured Posts

```typescript
const q = query(
  collection(db, 'posts'),
  where('published', '==', true),
  where('featured', '==', true),
  orderBy('createdAt', 'desc')
);
```

### Get Post by Slug

```typescript
const q = query(
  collection(db, 'posts'),
  where('slug', '==', 'your-slug'),
  where('published', '==', true)
);
```

### Get Posts by Category

```typescript
const q = query(
  collection(db, 'posts'),
  where('published', '==', true),
  where('category', '==', 'Website Development'),
  orderBy('createdAt', 'desc')
);
```

## Maintenance

### Regular Tasks

1. **Backup**: Export Firestore data weekly
2. **Cleanup**: Remove unpublished drafts older than 90 days
3. **Optimize**: Review and optimize indexes
4. **Monitor**: Check Firestore usage and costs

### Cost Optimization

1. Use indexes efficiently
2. Limit query results
3. Cache frequently accessed data
4. Use ISR to reduce reads
5. Monitor read/write operations

## Support

For schema questions or issues, refer to:
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Data Modeling Best Practices](https://firebase.google.com/docs/firestore/data-model)
