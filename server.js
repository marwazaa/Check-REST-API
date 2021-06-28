const mongoose = require("mongoose");

// lunch server
const express = require('express');

const app = express();

const port ='5000';

app.listen(port, function() {
    console.log('server run' )        
});

//
require('dotenv').config ({path:'./Config/.env'})

//Connect to Database
const mongoString = "mongodb+srv://marwaza:marwago@cluster0.j4zmy.mongodb.net/datamarwa?retryWrites=true&w=majority"

mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})


app.use(express.json());
const User = require('./models/User');




 //User.create([{name:"marwa",age:"29",adress:"Medenine Sud"},{name:"wafa",age:"30",adress:"Gabes"},{name:"nermine",age:"27",adress:"Gabes"}]) 
 
 //GET
 app.get('/users',(req,res)=>
 User.find().then(el=>res.json(el))
 .catch((err)=>console.log(err))
 )
 
 //ADD
 app.post('/addnewuser', (req, res)=>{
  let newUser = new User(req.body)
  newUser.save().then(() => res.json({msg: "User add" }))
  .catch((err) => console.log(err));
 })

// PUT
 app.put('/edituser/:id',(req,res)=>{
  User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
  .then((el)=>res.json(el))
  .catch((err)=>console.log(err))
})

//DELETE
app.delete('/deleteuser/:id',(req,res)=>{
  User.deleteOne({_id:req.params.id})
  .then((el)=>res.json(el))
  .catch((err)=>console.log(err))
})
