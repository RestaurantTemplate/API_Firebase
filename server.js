const express = require('express')

const bodyParser = require('body-parser')

const Firebase = require('./firebase/config.js')
const firebase = new Firebase();
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.post('/AddUser', async function(req, res, next) {
  try{
    const email = req.body.email;
    const password = req.body.password;
    const branchId = req.body.branchId;
    const alluser = await firebase.AddUser(email,password,branchId);
    console.log(alluser)
    res.status(200).json(alluser);  
  }
  catch(e){
    res.status(200).json(e);  
  }
});
app.post('/DeleteUser', async function(req, res, next) {
  try{
    const uid = req.body.uid;
    const alluser = await firebase.DeleteUser(uid);
    res.status(200).json(alluser);  
  }
  catch(e){
    res.status(200).json(e);  
  }
});
app.post('/AllUser', async function(req, res, next) {
  try{
    const branchid = req.body.branchid;
    const alluser = await firebase.getAlluser(branchid);
    res.status(200).json(alluser);  
  }
  catch(e){
    res.status(200).json(e);  
  }
});
app.post('/token', async function(req, res, next) {
  try{
    const uid = req.body.uid;
    const token = await firebase.generateToken(uid);
    res.status(200).json(token);  
  }
  catch(e){
    res.status(200).json(e);  
  }
});

app.listen(9000, () => {
  console.log('Start server at port 9000.')
})