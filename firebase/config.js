const firebase = require('firebase');
const admin = require('firebase-admin')
const config = require('./firebaseConfig.json')

var serviceAccount = require('../ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ez-restaurant-default-rtdb.firebaseio.com"
})
class Firebase {
    constructor() {
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.storage = firebase.storage()
    }
    getAlluser() {
        return admin.auth().listUsers(1000)
    }
    generateToken(uid) {
        const token = admin.auth().createCustomToken(uid)
        return token
    }
}
module.exports = Firebase;
