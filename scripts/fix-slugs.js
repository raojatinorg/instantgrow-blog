const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fixSlugs() {
  try {
    console.log('🔧 Fixing slugs for all posts...\n');
    
    const snapshot = await db.collection('posts').get();
    
    if (snapshot.empty) {
      console.log('❌ No posts found in database!');
      return;
    }
    
    console.log(`📊 Total posts: ${snapshot.size}\n`);
    
    let fixed = 0;
    let skipped = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const title = data.title?.en;
      const currentSlug = data.slug;
      
      if (!title) {
        console.log(`⚠️ Skipping post ${doc.id} - No title found`);
        skipped++;
        continue;
      }
      
      if (!currentSlug || currentSlug.trim() === '') {
        const newSlug = generateSlug(title);
        
        await doc.ref.update({
          slug: newSlug,
          updatedAt: new Date().toISOString()
        });
        
        console.log(`✅ Fixed: "${title}"`);
        console.log(`   New slug: ${newSlug}`);
        console.log(`   URL: /blog/${newSlug}\n`);
        fixed++;
      } else {
        console.log(`✓ OK: "${title}" (slug: ${currentSlug})`);
        skipped++;
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   Fixed: ${fixed}`);
    console.log(`   Already OK: ${skipped}`);
    console.log(`\n✅ Done!`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit();
  }
}

fixSlugs();
