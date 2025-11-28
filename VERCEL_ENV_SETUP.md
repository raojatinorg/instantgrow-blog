# 🔥 Vercel Environment Variables - Complete Setup

## Copy-Paste Ready Environment Variables

### For Vercel Dashboard:
Go to: https://vercel.com/raojatinorg/instantgrow-blog/settings/environment-variables

Add these one by one (Key = Value format):

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyDKAu9JvYmpQNvH1ES_Ax3q6qUFZX061Rw

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = raosuplode.firebaseapp.com

NEXT_PUBLIC_FIREBASE_DATABASE_URL = https://raosuplode-default-rtdb.firebaseio.com

NEXT_PUBLIC_FIREBASE_PROJECT_ID = raosuplode

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = raosuplode.firebasestorage.app

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 275156697009

NEXT_PUBLIC_FIREBASE_APP_ID = 1:275156697009:web:988cc8dc82f59e0535c790

NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = G-LCFP6Z0VZR

NEXT_PUBLIC_GEMINI_API_KEY = AIzaSyDo9-SzMHN9pxyN4XlJde1e4ng3ga2hppQ
```

---

## Step-by-Step Instructions:

### 1. Add Each Variable:
- Click "Add New" button
- **Key field** mein variable name (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
- **Value field** mein value (e.g., `AIzaSyDKAu9JvYmpQNvH1ES_Ax3q6qUFZX061Rw`)
- Select all environments: Production, Preview, Development
- Click "Save"

### 2. Repeat for All 9 Variables Above

### 3. Redeploy:
- Go to "Deployments" tab
- Click 3 dots on latest deployment
- Click "Redeploy"
- Wait 2-3 minutes

---

## ✅ Verification:

After redeployment, test:
1. Admin login: `instantgrow-blog-pdx8.vercel.app/en/admin`
2. Create new post
3. Upload image
4. Publish
5. Check homepage for new post

---

## 🚨 Important Notes:

- **DATABASE_URL** is the most important missing variable
- All variables must start with `NEXT_PUBLIC_` to work in browser
- After adding variables, MUST redeploy
- Clear browser cache if issues persist (Ctrl + Shift + R)
