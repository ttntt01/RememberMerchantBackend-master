const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("../../permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://remember-app-ece6b.firebaseio.com/"
});


const db = admin.firestore();
module.exports = db;