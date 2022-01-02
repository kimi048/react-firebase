const functions = require("firebase-functions");
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//HTTP Functions
exports.contacts = functions.region('asia-northeast1').https.onRequest(async(req,res) => {
  const name = req.query.name;
  const phone = req.query.phone;

  const addContact = await admin.firestore().collection('contacts').add({
    name: name,
    phone: phone
  });
  res.json({result:`${addContact.id}`});
})

//TRIGGERS
exports.addDate = functions.region('asia-northeast1').firestore.document("contacts/{contactId}")
  .onCreate((snapshot, context) => { 
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    return admin.firestore()
      .doc(`contacts/${context.params.contactId}`)
      .update({
        dateAdded: timestamp
      });
  })


exports.addLog = functions.region('asia-northeast1').https.onCall((data, context) => {
  return "log added";
})
