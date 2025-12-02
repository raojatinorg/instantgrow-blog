const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkSlugs() {
  try {
    console.log('🔍 Checking all posts for slug field...\n');
    
    const snapshot = await db.collection('posts').get();
    
    if (snapshot.empty) {
      console.log('❌ No posts found in database!');
      return;
    }
    
    console.log(`📊 Total posts: ${snapshot.size}\n`);
    
    let hasIssues = false;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const title = data.title?.en || 'No title';
      const slug = data.slug;
      const published = data.published;
      
      console.log(`📝 Post: ${title}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   Slug: ${slug || '❌ MISSING'}`);
      console.log(`   Published: ${published ? '✅ Yes' : '❌ No'}`);
      console.log(`   URL: /blog/${slug || 'MISSING'}`);
      console.log('');
      
      if (!slug || slug.trim() === '') {
        hasIssues = true;
        console.log('   ⚠️ WARNING: This post has no slug!\n');
      }
    });
    
    if (hasIssues) {
      console.log('\n❌ Some posts are missing slugs. Run fix-slugs.js to fix them.');
    } else {
      console.log('\n✅ All posts have valid slugs!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit();
  }
}

checkSlugs();
