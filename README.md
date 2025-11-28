# Premium Blog - Production-Ready Blogging Platform

A complete, ultra-premium blogging platform built with Next.js 14, TypeScript, Firebase, and TailwindCSS.

## Features

- ✅ Next.js 14 App Router with TypeScript
- ✅ Firebase Firestore, Auth, and Storage
- ✅ 20+ Multi-language support
- ✅ SSG + ISR for perfect SEO
- ✅ Complete Admin Panel with CRUD operations
- ✅ Rich text editor with image uploads
- ✅ Responsive premium design
- ✅ Dark/Light mode ready
- ✅ Google AdSense ready
- ✅ Dynamic sitemap & robots.txt
- ✅ Schema.org JSON-LD
- ✅ Open Graph & Twitter Cards
- ✅ On-demand revalidation

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Shadcn UI
- Playfair Display & Inter fonts

**Backend:**
- Firebase Firestore
- Firebase Auth
- Firebase Storage
- Firebase Admin SDK

**Deployment:**
- Vercel (recommended)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your project is already configured with ID: `raosuplode`
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Enable Storage
6. Deploy security rules:

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage
```

### 3. Set Up Firebase Admin SDK

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate New Private Key"
3. Copy the credentials to `.env.local`:

```env
FIREBASE_ADMIN_PROJECT_ID=raosuplode
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account@raosuplode.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### 4. Create Admin User

1. Go to Firebase Console > Authentication
2. Add a new user with email/password
3. Note the UID
4. In Firestore, create a custom claim:

```javascript
// Run this in Firebase Functions or Admin SDK
admin.auth().setCustomUserClaims(uid, { admin: true });
```

### 5. Set Revalidation Secret

In `.env.local`, set a secure secret:

```env
REVALIDATION_SECRET=your-secure-random-string-here
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

## Project Structure

```
premium-blog/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx      # Blog post detail (SSG)
│   │   │   │   └── page.tsx          # Blog listing
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── admin/
│   │   │   │   └── page.tsx          # Admin dashboard
│   │   │   ├── layout.tsx            # Language layout
│   │   │   └── page.tsx              # Home page (SSG)
│   │   ├── api/
│   │   │   └── revalidate/
│   │   │       └── route.ts          # Revalidation API
│   │   ├── layout.tsx                # Root layout
│   │   ├── sitemap.ts                # Dynamic sitemap
│   │   └── robots.ts                 # Robots.txt
│   ├── components/
│   │   ├── ui/                       # Shadcn components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── BlogCard.tsx
│   │   └── AdminDashboard.tsx        # Complete admin panel
│   ├── lib/
│   │   ├── firebase.ts               # Firebase client
│   │   ├── firebase-admin.ts         # Firebase admin
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts                  # TypeScript types
│   └── styles/
│       └── globals.css
├── public/
├── firestore.rules                   # Firestore security rules
├── storage.rules                     # Storage security rules
└── package.json
```

## Firestore Schema

### Posts Collection

```typescript
{
  id: string;
  slug: string;
  title: { en: string, hi: string, ... };
  excerpt: { en: string, hi: string, ... };
  content: { en: string, hi: string, ... };
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  seo: {
    metaTitle: { en: string, ... };
    metaDescription: { en: string, ... };
    ogImage: string;
    keywords: string[];
  };
  published: boolean;
  featured: boolean;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}
```

## Admin Panel Features

Access at: `/en/admin`

- ✅ Create, edit, delete blog posts
- ✅ Multi-language content editor
- ✅ Rich text editor (ReactQuill)
- ✅ Image upload to Firebase Storage
- ✅ SEO meta fields
- ✅ Publish/unpublish control
- ✅ Featured posts
- ✅ Auto-slug generation
- ✅ Auto-read time calculation
- ✅ On-demand revalidation

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local`
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## SEO Features

- ✅ Pre-rendered HTML (SSG)
- ✅ ISR with 60s revalidation
- ✅ Dynamic sitemap
- ✅ robots.txt
- ✅ Schema.org Article JSON-LD
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Multi-language URLs
- ✅ Semantic HTML
- ✅ Image optimization

## Performance

- ✅ Lighthouse Score: 95+
- ✅ Minimal JavaScript
- ✅ Image optimization (next/image)
- ✅ Font optimization
- ✅ No layout shift
- ✅ Fast page loads

## Multi-Language Support

Supported languages (20+):
- English, Hindi, Tamil, Telugu, Bengali
- Kannada, Malayalam, Marathi, Gujarati, Punjabi
- Spanish, French, German, Arabic, Portuguese
- Russian, Japanese, Korean, Chinese, Italian

URL structure: `/{lang}/blog/{slug}`

## Google AdSense Integration

Ad placements are ready in:
- Blog post detail page (after content)
- Home page (optional)
- Blog listing page (optional)

Replace placeholder with your AdSense code.

## Revalidation

Trigger revalidation after publishing:

```bash
curl -X POST "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "blog-slug", "type": "blog"}'
```

## Security

- ✅ Firestore security rules
- ✅ Storage security rules
- ✅ Admin-only write access
- ✅ Environment variables
- ✅ API route protection

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT License - feel free to use for commercial projects.
