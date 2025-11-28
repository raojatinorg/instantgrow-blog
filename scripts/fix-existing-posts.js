// Fix Existing Posts - Add/Update Slug Field
// Run: node scripts/fix-existing-posts.js

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // You'll need to download this

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function fixPosts() {
  try {
    console.log('🔧 Starting to fix posts...');
    
    const postsRef = db.collection('posts');
    const snapshot = await postsRef.get();
    
    console.log(`📄 Found ${snapshot.size} posts`);
    
    let fixed = 0;
    let skipped = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const updates = {};
      
      // Fix slug
      if (!data.slug || data.slug.trim() === '') {
        const title = data.title?.en || data.title || 'untitled';
        updates.slug = generateSlug(title);
        console.log(`✅ Adding slug to "${title}": ${updates.slug}`);
      }
      
      // Ensure published field exists
      if (data.published === undefined) {
        updates.published = false;
        console.log(`✅ Adding published field to ${doc.id}`);
      }
      
      // Update if needed
      if (Object.keys(updates).length > 0) {
        await doc.ref.update(updates);
        fixed++;
        console.log(`✅ Fixed post: ${doc.id}`);
      } else {
        skipped++;
      }
    }
    
    console.log('\n🎉 Done!');
    console.log(`✅ Fixed: ${fixed} posts`);
    console.log(`⏭️  Skipped: ${skipped} posts (already OK)`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit();
  }
}

fixPosts();
