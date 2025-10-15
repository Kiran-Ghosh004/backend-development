const express = require('express');
const app=express();
const userModel=require('./userModel');

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('/create', async(req,res)=>{
    let createUser= await userModel.create({
        name:"mili Ghosh",
        username:"milighosh123",
        email:"mili@gmail.com"
    })
    res.send(createUser);
    console.log('User created');
});

app.get('/update', async(req,res)=>{
    let updateUser= await userModel.findOneAndUpdate({
        username:"kiranghosh123"
    },{
        email:"kiranghosh520@gmail.com"
    },{
        new:true
    })
    res.send(updateUser);
    console.log('User created');
});

app.get('/read', async (req, res) => {
  try {
    let users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

app.get('/delete', async(req,res)=>{
    let deleteuser= await userModel.findOneAndDelete({
        username:"milighosh123"
    })
    res.send(deleteuser);
    console.log('User deleted');
});




app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

