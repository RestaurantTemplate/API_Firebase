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
    async getAlluser(branchid) {
        try{
            var users = ''
            await admin.firestore().collection('Users').get().then(async(querySnapshot) => {
                await querySnapshot.forEach((doc) => {
                    if(doc.data().branchstore === branchid){
                        users = doc.id
                    }
                });
            });
            const userList = []
            await admin.auth().listUsers(1000).then(async(user)=>{
                await user.users.forEach((doc) => {
                    if(doc.uid === users){
                        userList.push(doc)
                    }
                });
            })
            return userList
        }
        catch(e){
            console.log(e)
            return []
        }
    }
    generateToken(uid) {
        const token = admin.auth().createCustomToken(uid)
        return token
    }
}
module.exports = Firebase;
