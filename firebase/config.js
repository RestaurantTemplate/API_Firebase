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
        this.resolveAfter2Seconds = this.resolveAfter2Seconds.bind(this)
    }
    async AddUser(email,password,branchId){
        try{
            const user = await admin.auth().createUser({
                email: email,
                password: password,
            })
            .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            // userRecord
            // console.log('Successfully updated user', userRecord.toJSON());
                return admin.firestore().collection('Users').doc(userRecord.uid).set({
                    branchstore:branchId,
                    type:"staff"
                })
                .then(() => {
                    return {'success':true,message:'success'}
                })
                .catch((error)=>{
                    console.log('Error updating user 1:', error);
                    return {'success':false,message:error.toJSON().message}
                });
            })
            .catch((error) => {
                console.log('Error updating user 2:', error.toJSON().message);
                return {'success':false,message:error.toJSON().message}
            });
            console.log('success:',user)
            return user
        }
        catch(e){
            console.log(e)
            return {'success':false}
        }
    }
    async DeleteUser(Uid){
        try{
            console.log('uid:',Uid)
            const user = await admin.auth().deleteUser(Uid)
            .then(() => {
                return admin.firestore().collection('Users').doc(Uid).delete()
                .then(() => {
                    return {'success':true,message:'success'}
                })
                .catch((error)=>{
                    console.log('Error updating user 1:', error);
                    return {'success':false,message:error.toJSON().message}
                });
            })
            .catch((error) => {
                console.log('Error updating user 2:', error.toJSON().message);
                return {'success':false,message:error.toJSON().message}
            });
            return user
        }
        catch(e){
            return {'success':false}
        }
    }
    resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 1000);
        });
    }
    async getAlluser(branchid) {
        try{
            
            var userList = []
            await admin.firestore().collection('Users').get().then(async(querySnapshot) => {
                await querySnapshot.docs.map((doc) => {
                    if(doc.data().branchstore === branchid){
                        admin.auth().listUsers(1000).then((user)=>{
                            user.users.map((data) => {
                                if(data.uid === doc.id){
                                    userList.push(data)
                                }
                            })
                        })
                    }
                });
            });
            await this.resolveAfter2Seconds();
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
