# Setup Checklist - Premium Blog

Use this checklist to ensure everything is configured correctly.

## ☐ Prerequisites

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Firebase account created
- [ ] Vercel account created (for deployment)

## ☐ Firebase Setup

### Enable Services
- [ ] Firestore Database enabled (Native mode)
- [ ] Authentication enabled (Email/Password provider)
- [ ] Storage enabled

### Deploy Security Rules
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Logged into Firebase (`firebase login`)
- [ ] Project initialized (`firebase init`)
- [ ] Firestore rules deployed (`firebase deploy --only firestore:rules`)
- [ ] Storage rules deployed (`firebase deploy --only storage`)

### Create Admin User
- [ ] User created in Firebase Authentication
- [ ] User UID copied
- [ ] Service account key downloaded
- [ ] Admin claim set using script (`node scripts/set-admin.js`)
- [ ] Admin claim verified

## ☐ Project Setup

### Installation
- [ ] Repository cloned/downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] No installation errors

### Environment Variables
- [ ] `.env.local` file exists
- [ ] All Firebase client variables set (8 variables)
- [ ] Firebase Admin variables set (3 variables)
- [ ] Revalidation secret set
- [ ] No syntax errors in `.env.local`

### Configuration Files
- [ ] `next.config.js` reviewed
- [ ] `tailwind.config.ts` reviewed
- [ ] `tsconfig.json` reviewed
- [ ] `firestore.rules` reviewed
- [ ] `storage.rules` reviewed

## ☐ Local Development

### Run Development Server
- [ ] Server starts without errors (`npm run dev`)
- [ ] Home page loads at `http://localhost:3000/en`
- [ ] No console errors
- [ ] Navigation works
- [ ] Language switcher works

### Test Admin Panel
- [ ] Admin page accessible at `/en/admin`
- [ ] Login form displays
- [ ] Can login with admin credentials
- [ ] Admin dashboard loads
- [ ] No authentication errors

### Create Test Post
- [ ] "Create New Post" button works
- [ ] Can enter title in English
- [ ] Can enter excerpt
- [ ] Can enter content in rich text editor
- [ ] Can upload cover image
- [ ] Can add category
- [ ] Can add tags
- [ ] Can set SEO fields
- [ ] Can toggle published status
- [ ] Can save post successfully
- [ ] Post appears in dashboard

### Verify Post Display
- [ ] Post appears on home page
- [ ] Post appears in blog listing
- [ ] Post detail page loads
- [ ] Images display correctly
- [ ] Content renders properly
- [ ] SEO meta tags present in HTML
- [ ] No layout issues

## ☐ Multi-Language Testing

- [ ] Language switcher displays all languages
- [ ] Can switch between languages
- [ ] URLs change correctly (e.g., `/en/` to `/hi/`)
- [ ] Can add content in multiple languages
- [ ] Fallback to English works for missing translations

## ☐ SEO Verification

### Meta Tags
- [ ] Page title displays correctly
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL present

### Structured Data
- [ ] JSON-LD schema present in blog posts
- [ ] Schema validates at schema.org validator

### Sitemap & Robots
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Sitemap contains all pages
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Robots.txt configured correctly

## ☐ Performance Testing

### Lighthouse Audit
- [ ] Performance score 90+
- [ ] Accessibility score 90+
- [ ] Best Practices score 90+
- [ ] SEO score 90+

### Load Times
- [ ] Home page loads in <2s
- [ ] Blog listing loads in <2s
- [ ] Blog post loads in <2s
- [ ] Images load properly
- [ ] No layout shift

## ☐ Security Verification

### Firestore Rules
- [ ] Can read published posts without auth
- [ ] Cannot read unpublished posts without auth
- [ ] Cannot write without admin auth
- [ ] Admin can write successfully

### Storage Rules
- [ ] Can read images without auth
- [ ] Cannot write without auth
- [ ] Admin can upload images

### API Routes
- [ ] Revalidation requires secret
- [ ] Invalid secret returns 401
- [ ] Valid secret works

## ☐ Build Testing

### Production Build
- [ ] Build completes without errors (`npm run build`)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Static pages generated
- [ ] Build output looks correct

### Production Server
- [ ] Production server starts (`npm start`)
- [ ] All pages load correctly
- [ ] No runtime errors
- [ ] Performance is good

## ☐ Deployment Preparation

### Code Repository
- [ ] Code pushed to GitHub/GitLab
- [ ] `.gitignore` configured correctly
- [ ] `.env.local` NOT committed
- [ ] README.md updated with your info

### Vercel Setup
- [ ] Vercel account created
- [ ] Project imported from Git
- [ ] Framework preset: Next.js
- [ ] Build settings correct
- [ ] Environment variables added to Vercel

### Domain Configuration
- [ ] Domain URLs updated in code:
  - [ ] `src/app/sitemap.ts`
  - [ ] `src/app/robots.ts`
  - [ ] Any hardcoded URLs
- [ ] Custom domain added (if applicable)
- [ ] DNS configured (if applicable)

## ☐ Post-Deployment

### Verify Production
- [ ] Production site loads
- [ ] All pages accessible
- [ ] Admin login works
- [ ] Can create posts in production
- [ ] Images upload successfully
- [ ] Revalidation works

### SEO Setup
- [ ] Google Search Console configured
- [ ] Sitemap submitted to Google
- [ ] Bing Webmaster Tools configured (optional)
- [ ] Analytics installed (optional)

### Monitoring
- [ ] Vercel analytics enabled (optional)
- [ ] Error tracking setup (optional)
- [ ] Performance monitoring active

## ☐ Content Creation

### Initial Content
- [ ] At least 3 blog posts created
- [ ] All posts have cover images
- [ ] All posts have SEO meta fields
- [ ] All posts are published
- [ ] Featured posts selected

### Categories & Tags
- [ ] Categories defined
- [ ] Tags added to posts
- [ ] Consistent naming convention

## ☐ Monetization Setup (Optional)

### Google AdSense
- [ ] AdSense account approved
- [ ] Ad code obtained
- [ ] Ad code added to blog post template
- [ ] Ads displaying correctly
- [ ] Ad placement optimized

### Affiliate Links
- [ ] Affiliate programs joined
- [ ] Affiliate links added to content
- [ ] Disclosure added (if required)

## ☐ Final Checks

### Functionality
- [ ] All links work
- [ ] All images load
- [ ] All forms work
- [ ] Navigation works
- [ ] Search works
- [ ] Language switcher works

### Design
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] No visual bugs
- [ ] Consistent styling

### Performance
- [ ] Fast page loads
- [ ] Images optimized
- [ ] No console errors
- [ ] No console warnings

### SEO
- [ ] All pages indexed
- [ ] Meta tags correct
- [ ] Sitemap working
- [ ] Robots.txt correct
- [ ] Schema markup valid

### Security
- [ ] Environment variables secure
- [ ] Admin access restricted
- [ ] API routes protected
- [ ] No sensitive data exposed

## ☐ Documentation

- [ ] README.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] DEPLOYMENT.md reviewed
- [ ] All documentation accurate
- [ ] Contact information updated

## ☐ Backup & Maintenance

### Backup Strategy
- [ ] Firestore backup scheduled
- [ ] Storage backup planned
- [ ] Code repository backed up

### Maintenance Plan
- [ ] Update schedule defined
- [ ] Monitoring plan in place
- [ ] Support process defined

## 🎉 Launch Checklist

Before going live:
- [ ] All above items checked
- [ ] Test content created
- [ ] SEO configured
- [ ] Analytics setup
- [ ] Monitoring active
- [ ] Backup strategy in place
- [ ] Team trained (if applicable)
- [ ] Documentation complete

## 📊 Success Metrics

Track these after launch:
- [ ] Page load times
- [ ] Lighthouse scores
- [ ] Search rankings
- [ ] Organic traffic
- [ ] User engagement
- [ ] Conversion rates (if applicable)
- [ ] Ad revenue (if applicable)

## 🚀 You're Ready!

Once all items are checked, your premium blog is ready for production!

**Estimated Setup Time:**
- Basic setup: 15 minutes
- Full setup with content: 1-2 hours
- Complete setup with monetization: 2-3 hours

**Need Help?**
- Check README.md for detailed instructions
- Review QUICKSTART.md for quick setup
- See DEPLOYMENT.md for deployment help
- Check FIRESTORE_SCHEMA.md for database info

---

**Last Updated:** 2024
**Version:** 1.0.0

Good luck with your premium blog! 🚀
