const admin = require('firebase-admin');
const serviceAccount = require('./sistema-citas-1617f-firebase-adminsdk-7akec-e6280b0713.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

