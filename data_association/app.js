const express= require('express');
const app=express();
const userModel=require('./models/user');
const postModel=require('./models/post');
const post = require('./models/post');

app.get('/',(req,res)=>{
    res.send('Hello World!');
}  );   
app.get('/create',async (req,res)=>{
    let user= await userModel.create({
        username:"kiran",
        email:"kiranghosh@gmail.com",
        age:22,
    })
    res.send(user);
});   
app.get('/post/create',async (req,res)=>{
    let post= await postModel.create({
        postData:"This is my first post",
        user:"691b427372c9d2b972fa141b"

    })
    let user= await userModel.findOne({_id:"691b427372c9d2b972fa141b"})
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
});   

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});