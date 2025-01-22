// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json'); // Download this file from your Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
