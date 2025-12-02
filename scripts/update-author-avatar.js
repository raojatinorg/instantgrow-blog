/**
 * Script to update author avatar in all existing posts
 * 
 * Usage:
 * 1. Ensure serviceAccountKey.json exists in project root
 * 2. Run: node scripts/update-author-avatar.js
 */

const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const NEW_AUTHOR_DATA = {
  name: "Rao Jatin",
  avatar: "https://i.ibb.co/4wmNZcYP/RAO-JATIN.jpg",
  bio: "Professional Web Developer & Digital Marketing Expert"
};

async function updateAuthorAvatar() {
  try {
    console.log('🔄 Starting to update author avatars...');
    
    const postsSnapshot = await db.collection('posts').get();
    
    if (postsSnapshot.empty) {
      console.log('⚠️  No posts found in database');
      process.exit(0);
    }
    
    let updatedCount = 0;
    
    for (const doc of postsSnapshot.docs) {
      await doc.ref.update({
        author: NEW_AUTHOR_DATA,
        updatedAt: new Date().toISOString()
      });
      
      updatedCount++;
      console.log(`✅ Updated post: ${doc.data().title?.en || doc.id}`);
    }
    
    console.log(`\n🎉 Successfully updated ${updatedCount} posts!`);
    console.log(`📸 New avatar: ${NEW_AUTHOR_DATA.avatar}`);
    console.log(`👤 Author name: ${NEW_AUTHOR_DATA.name}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating author avatars:', error);
    process.exit(1);
  }
}

updateAuthorAvatar();
