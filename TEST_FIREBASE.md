# 🔍 Firebase Debug Checklist

## Step 1: Check Firebase Console
1. Go to: https://console.firebase.google.com/project/raosuplode/firestore
2. Check if `posts` collection exists
3. Check if there are any documents in `posts` collection
4. Check if documents have `published: true` field

## Step 2: Check Firestore Rules
1. Go to: https://console.firebase.google.com/project/raosuplode/firestore/rules
2. Rules should be:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Step 3: Test Admin Panel Locally
1. Open terminal in project folder
2. Run: `npm run dev`
3. Go to: http://localhost:3000/en/admin
4. Login with: raojatin@admin.com
5. Try creating a test post
6. Check browser console for errors (F12)

## Step 4: Check if Post Saved
After creating post:
1. Go to Firebase Console
2. Check `posts` collection
3. Look for your new post
4. Check all fields are present

## Step 5: Test Homepage
1. Go to: http://localhost:3000
2. Open browser console (F12)
3. Check for any errors
4. Check if posts are being fetched

## Common Issues:

### Issue 1: Firebase Not Initialized
**Error:** "Firebase app not initialized"
**Fix:** Restart dev server after changing .env.local

### Issue 2: Permission Denied
**Error:** "permission-denied"
**Fix:** Deploy open Firestore rules (see Step 2)

### Issue 3: Posts Not Showing
**Reason:** `published: false` or no posts in database
**Fix:** Create post with "Publish Immediately" checked

### Issue 4: Blog Page 404
**Reason:** Slug mismatch or post not in database
**Fix:** Check slug in Firebase matches URL

## Quick Test Commands:

```bash
# Restart dev server
npm run dev

# Check build
npm run build

# Clear Next.js cache
rmdir /s /q .next
npm run dev
```
