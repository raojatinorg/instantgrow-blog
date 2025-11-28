/**
 * Script to set admin custom claim for a user
 * 
 * Usage:
 * 1. Download service account key from Firebase Console
 * 2. Save as serviceAccountKey.json in project root
 * 3. Replace USER_UID with actual user UID from Firebase Auth
 * 4. Run: node scripts/set-admin.js
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Replace with your user UID from Firebase Authentication
const USER_UID = 'PASTE_USER_UID_HERE';

async function setAdminClaim() {
  try {
    await admin.auth().setCustomUserClaims(USER_UID, { admin: true });
    console.log('✅ Admin claim set successfully!');
    console.log(`User ${USER_UID} is now an admin.`);
    
    // Verify the claim was set
    const user = await admin.auth().getUser(USER_UID);
    console.log('Custom claims:', user.customClaims);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting admin claim:', error);
    process.exit(1);
  }
}

setAdminClaim();
