const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// const Firebase = require('./firebase/config.js')
// const firebase = new Firebase();
const cors = require('cors')
const app = express()
const PORT = process.env.POST || 9000
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send('Hello World 111')
})
app.get('/test', (req, res) => {
  res.send('Hello World 111')
})
// app.post('/AddUser', async function(req, res, next) {
//   try{
//     const email = req.body.email;
//     const password = req.body.password;
//     const branchId = req.body.branchId;
//     const alluser = await firebase.AddUser(email,password,branchId);
//     console.log(alluser)
//     res.status(200).json(alluser);  
//   }
//   catch(e){
//     res.status(200).json(e);  
//   }
// });
// app.post('/DeleteUser', async function(req, res, next) {
//   try{
//     const uid = req.body.uid;
//     const alluser = await firebase.DeleteUser(uid);
//     res.status(200).json(alluser);  
//   }
//   catch(e){
//     res.status(200).json(e);  
//   }
// });
// app.post('/AllUser', async function(req, res, next) {
//   try{
//     const branchid = req.body.branchid;
//     const alluser = await firebase.getAlluser(branchid);
//     res.status(200).json(alluser);  
//   }
//   catch(e){
//     res.status(200).json(e);  
//   }
// });
// app.post('/token', async function(req, res, next) {
//   try{
//     const uid = req.body.uid;
//     const token = await firebase.generateToken(uid);
//     res.status(200).json(token);  
//   }
//   catch(e){
//     res.status(200).json(e);  
//   }
// });

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Start server at port ${PORT}.`)
})