@echo off
echo ╔════════════════════════════════════════════════════════════════╗
echo ║              🚀 DEPLOYMENT COMMANDS - RUN 1 BY 1              ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   STEP 1: STOP CURRENT SERVER
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Press Ctrl+C in the terminal where dev server is running
echo.
pause
echo.
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   STEP 2: DELETE .next FOLDER (CACHE)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
if exist .next (
    echo Deleting .next folder...
    rmdir /s /q .next
    echo ✅ .next folder deleted!
) else (
    echo ⚠️  .next folder not found (already clean)
)
echo.
pause
echo.
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   STEP 3: BUILD PROJECT (GENERATE STATIC HTML)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo This will:
echo - Generate static HTML for all blog posts
echo - Optimize images
echo - Create production build
echo.
echo Running: npm run build
echo.
npm run build
echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ BUILD SUCCESSFUL!
) else (
    echo ❌ BUILD FAILED!
    echo Check errors above
    pause
    exit /b 1
)
echo.
pause
echo.
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   STEP 4: TEST PRODUCTION BUILD LOCALLY
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo This will start production server on http://localhost:3000
echo.
echo Running: npm start
echo.
echo ⚠️  IMPORTANT: Test your blog posts before deploying!
echo.
echo Press Ctrl+C when done testing, then continue...
echo.
start cmd /k "npm start"
echo.
echo Server started in new window!
echo.
echo TEST CHECKLIST:
echo □ Open: http://localhost:3000/en
echo □ Check if posts show
echo □ Click a blog post
echo □ Verify it opens
echo □ Check view source (Ctrl+U) - should see HTML
echo.
pause
echo.
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   STEP 5: DEPLOY TO VERCEL
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ⚠️  Make sure you have Vercel CLI installed!
echo.
echo If not installed, run: npm i -g vercel
echo.
echo Deploying to production...
echo.
vercel --prod
echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ DEPLOYMENT SUCCESSFUL!
    echo.
    echo Your blog is now live!
    echo Check the URL provided above
) else (
    echo ❌ DEPLOYMENT FAILED!
    echo.
    echo Possible reasons:
    echo 1. Vercel CLI not installed (run: npm i -g vercel)
    echo 2. Not logged in (run: vercel login)
    echo 3. Project not linked (run: vercel link)
)
echo.
pause
echo.
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   STEP 6: SUBMIT TO GOOGLE SEARCH CONSOLE
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Manual steps:
echo.
echo 1. Go to: https://search.google.com/search-console
echo 2. Click "URL Inspection"
echo 3. Paste your blog post URL
echo 4. Click "Request Indexing"
echo 5. Wait 24-48 hours
echo.
echo Opening Google Search Console...
start https://search.google.com/search-console
echo.
pause
echo.
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    ✅ DEPLOYMENT COMPLETE!                     ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo NEXT STEPS:
echo.
echo 1. ✅ Test your live blog
echo 2. ✅ Submit to Google Search Console
echo 3. ✅ Share on social media
echo 4. ✅ Monitor performance
echo.
echo Your blog is now:
echo - ✅ Static HTML generated
echo - ✅ Lightning fast
echo - ✅ SEO optimized
echo - ✅ Google-ready
echo - ✅ Viral-ready
echo.
echo Happy Blogging! 🚀
echo.
pause
