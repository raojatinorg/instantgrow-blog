# Quick Start Guide - Get Running in 10 Minutes

## Prerequisites
- Node.js 18+ installed
- Firebase project (already configured: `raosuplode`)
- Code editor (VS Code recommended)

## Step 1: Install Dependencies (2 minutes)

```bash
cd premium-blog
npm install
```

## Step 2: Configure Firebase (3 minutes)

### Enable Firebase Services

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **raosuplode**
3. Enable:
   - **Firestore Database** (Start in production mode)
   - **Authentication** → Enable Email/Password
   - **Storage** → Start in production mode

### Deploy Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (select Firestore and Storage)
firebase init

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## Step 3: Create Admin User (2 minutes)

1. Go to Firebase Console → Authentication → Users
2. Click "Add User"
3. Email: `admin@yourdomain.com`
4. Password: `YourSecurePassword123`
5. Copy the User UID

### Set Admin Claim

Create a file `set-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = 'PASTE_USER_UID_HERE';

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Admin claim set successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
```

Download service account key from Firebase Console → Project Settings → Service Accounts → Generate New Private Key

Run:
```bash
node set-admin.js
```

## Step 4: Configure Environment (1 minute)

The `.env.local` file is already created with your Firebase config. Just add the admin credentials:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Open the downloaded JSON file
4. Update `.env.local`:

```env
FIREBASE_ADMIN_PROJECT_ID=raosuplode
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@raosuplode.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
REVALIDATION_SECRET=my-secret-key-123
```

## Step 5: Run Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

## Step 6: Create Your First Post (1 minute)

1. Go to [http://localhost:3000/en/admin](http://localhost:3000/en/admin)
2. Login with admin credentials
3. Click "Create New Post"
4. Fill in:
   - Title (English): "Welcome to My Blog"
   - Excerpt: "This is my first blog post"
   - Content: "Hello world! This is my first post."
   - Category: "General"
   - Tags: "welcome, first post"
   - Upload a cover image
   - Check "Published"
5. Click "Save Post"

## Step 7: View Your Blog

Go to [http://localhost:3000/en](http://localhost:3000/en) - Your post is live!

## Next Steps

### Deploy to Vercel (5 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Add More Content

1. Create more blog posts in admin panel
2. Add different categories
3. Upload better images
4. Add content in multiple languages

### Customize Design

Edit these files:
- `src/styles/globals.css` - Colors and styles
- `tailwind.config.ts` - Theme configuration
- `src/components/Navbar.tsx` - Navigation
- `src/components/Footer.tsx` - Footer

### Configure SEO

1. Update sitemap URL in `src/app/sitemap.ts`
2. Update robots.txt URL in `src/app/robots.ts`
3. Add your domain in both files
4. Redeploy

### Add Google AdSense

1. Apply for AdSense
2. Get ad code
3. Replace placeholder in `src/app/[lang]/blog/[slug]/page.tsx`
4. Redeploy

## Troubleshooting

### Build Error: Firebase not initialized
- Check all environment variables are set
- Restart dev server

### Admin Login Fails
- Verify user exists in Firebase Auth
- Check admin claim is set
- Try logging out and back in

### Images Not Loading
- Verify Storage is enabled
- Check storage rules are deployed
- Use correct image URLs

### Posts Not Showing
- Check post is marked as "Published"
- Verify Firestore rules are deployed
- Check browser console for errors

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Deploy Firebase rules
firebase deploy --only firestore:rules
firebase deploy --only storage

# Deploy to Vercel
vercel --prod
```

## File Structure Quick Reference

```
src/
├── app/
│   ├── [lang]/
│   │   ├── page.tsx          # Home page
│   │   ├── blog/
│   │   │   ├── page.tsx      # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Blog post
│   │   └── admin/
│   │       └── page.tsx      # Admin panel
│   └── api/
│       └── revalidate/
│           └── route.ts      # Revalidation API
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── Footer.tsx            # Footer
│   ├── BlogCard.tsx          # Blog card
│   └── AdminDashboard.tsx    # Admin panel
├── lib/
│   ├── firebase.ts           # Firebase client
│   └── firebase-admin.ts     # Firebase admin
└── styles/
    └── globals.css           # Global styles
```

## Support

- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for deployment guide
- Check `FIRESTORE_SCHEMA.md` for database schema
- Check `FEATURES.md` for complete feature list

## You're Ready! 🚀

Your premium blog is now running locally. Start creating content and deploy to production when ready!

**Time to first post: ~10 minutes**
**Time to production: ~15 minutes**

Happy blogging! 📝
