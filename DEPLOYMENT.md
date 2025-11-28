# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Firebase project configured
- Vercel account
- Git repository

## Step-by-Step Deployment

### 1. Prepare Firebase

#### Enable Services

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `raosuplode`
3. Enable these services:
   - **Firestore Database** (Native mode)
   - **Authentication** (Email/Password provider)
   - **Storage**

#### Deploy Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Select:
# - Firestore
# - Storage
# - Use existing project: raosuplode

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage
```

#### Create Admin User

1. Go to Authentication > Users
2. Add user with email/password
3. Copy the User UID
4. Set custom claims using Firebase Functions or Admin SDK:

```javascript
// In Firebase Functions or Node.js script
const admin = require('firebase-admin');
admin.initializeApp();

admin.auth().setCustomUserClaims('USER_UID_HERE', { 
  admin: true 
}).then(() => {
  console.log('Admin claim set successfully');
});
```

#### Get Service Account Key

1. Go to Project Settings > Service Accounts
2. Click "Generate New Private Key"
3. Download JSON file
4. Extract these values for `.env.local`:
   - `project_id`
   - `client_email`
   - `private_key`

### 2. Configure Environment Variables

Create `.env.local` with:

```env
# Firebase Client (already configured)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDKAu9JvYmpQNvH1ES_Ax3q6qUFZX061Rw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=raosuplode.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://raosuplode-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=raosuplode
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=raosuplode.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=275156697009
NEXT_PUBLIC_FIREBASE_APP_ID=1:275156697009:web:988cc8dc82f59e0535c790
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LCFP6Z0VZR

# Firebase Admin (from service account JSON)
FIREBASE_ADMIN_PROJECT_ID=raosuplode
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@raosuplode.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Revalidation Secret (generate random string)
REVALIDATION_SECRET=your-secure-random-string-here
```

### 3. Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test at http://localhost:3000/en
```

### 4. Deploy to Vercel

#### Option A: Vercel Dashboard

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add Environment Variables (copy from `.env.local`)
7. Click "Deploy"

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? premium-blog
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add FIREBASE_ADMIN_PROJECT_ID
# ... add all env vars

# Deploy to production
vercel --prod
```

### 5. Post-Deployment Configuration

#### Update Domain in Code

1. Update `src/app/sitemap.ts`:
   ```typescript
   const baseUrl = 'https://your-domain.vercel.app';
   ```

2. Update `src/app/robots.ts`:
   ```typescript
   sitemap: 'https://your-domain.vercel.app/sitemap.xml',
   ```

3. Redeploy:
   ```bash
   vercel --prod
   ```

#### Configure Custom Domain (Optional)

1. Go to Vercel Dashboard > Project > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update URLs in code with your custom domain

### 6. Create First Blog Post

1. Go to `https://your-domain.vercel.app/en/admin`
2. Login with admin credentials
3. Click "Create New Post"
4. Fill in content for multiple languages
5. Upload cover image
6. Add SEO meta fields
7. Check "Published"
8. Click "Save Post"

### 7. Verify SEO

1. Check sitemap: `https://your-domain.vercel.app/sitemap.xml`
2. Check robots.txt: `https://your-domain.vercel.app/robots.txt`
3. View page source of blog post - verify:
   - Pre-rendered HTML content
   - Meta tags
   - JSON-LD schema
   - Open Graph tags

### 8. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property with your domain
3. Verify ownership
4. Submit sitemap: `https://your-domain.vercel.app/sitemap.xml`

### 9. Google AdSense (Optional)

1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Get ad code
3. Replace placeholders in:
   - `src/app/[lang]/blog/[slug]/page.tsx`
4. Redeploy

## Troubleshooting

### Build Fails

**Error: Firebase not initialized**
- Ensure all environment variables are set in Vercel
- Check that variable names match exactly

**Error: Module not found**
- Run `npm install` locally
- Commit `package-lock.json`

### Admin Login Fails

**Error: Invalid credentials**
- Verify user exists in Firebase Auth
- Check email/password

**Error: Permission denied**
- Verify custom admin claim is set
- Check Firestore rules are deployed

### Images Not Loading

**Error: Invalid src**
- Verify Firebase Storage is enabled
- Check storage rules are deployed
- Verify image URLs in Firestore

### Revalidation Not Working

**Error: Invalid secret**
- Check `REVALIDATION_SECRET` matches in:
  - Vercel environment variables
  - API request

## Performance Optimization

### Enable Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Enable Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

### Optimize Images

- Use WebP format
- Compress before upload
- Use appropriate dimensions

## Monitoring

### Vercel Dashboard

- Monitor deployments
- Check build logs
- View analytics
- Monitor performance

### Firebase Console

- Monitor Firestore usage
- Check Storage usage
- View Auth users
- Monitor costs

## Backup Strategy

### Firestore Backup

```bash
# Export Firestore data
gcloud firestore export gs://raosuplode.appspot.com/backups

# Import Firestore data
gcloud firestore import gs://raosuplode.appspot.com/backups/[BACKUP_ID]
```

### Storage Backup

Use Firebase Console or gsutil to backup Storage files.

## Scaling Considerations

- Firestore: Automatically scales
- Storage: Automatically scales
- Vercel: Automatically scales
- Consider Firestore indexes for complex queries
- Monitor costs in Firebase Console

## Support

For deployment issues:
1. Check Vercel build logs
2. Check Firebase Console logs
3. Review error messages
4. Check environment variables

## Next Steps

1. Add more blog posts
2. Configure Google Analytics
3. Set up Google AdSense
4. Customize design
5. Add more features
6. Monitor performance
7. Optimize SEO

Your premium blog is now live! 🚀
