@echo off
echo ========================================
echo   BLOG FIX DEPLOYMENT SCRIPT
echo ========================================
echo.

echo Step 1: Checking Firebase CLI...
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Firebase CLI not found!
    echo Please install: npm install -g firebase-tools
    pause
    exit /b 1
)
echo ✅ Firebase CLI found
echo.

echo Step 2: Deploying Firestore Indexes...
echo This will fix the blog post display issue.
echo.
firebase deploy --only firestore:indexes

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✅ DEPLOYMENT SUCCESSFUL!
    echo ========================================
    echo.
    echo ⏰ IMPORTANT: Wait 5-10 minutes for indexes to build
    echo.
    echo 📋 Next Steps:
    echo 1. Go to Firebase Console
    echo 2. Check Firestore Database ^> Indexes
    echo 3. Wait until status changes from "Building" to "Enabled"
    echo 4. Test your blog posts
    echo.
    echo 🔗 Firebase Console: https://console.firebase.google.com
    echo.
) else (
    echo.
    echo ========================================
    echo   ❌ DEPLOYMENT FAILED!
    echo ========================================
    echo.
    echo Please check:
    echo 1. Are you logged in? Run: firebase login
    echo 2. Is this the correct project? Run: firebase use
    echo 3. Do you have permissions?
    echo.
)

pause
