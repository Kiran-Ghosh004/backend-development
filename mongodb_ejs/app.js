const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const user = require('./models/user');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/read', async(req, res) => {
  let allusers=await user.find({})
  res.render("read",{users:allusers});
});


app.post('/create', async (req, res) => {
  let createuser = await userModel.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  // res.send(createuser);
  res.redirect('/read');
  // res.redirect('/create');

});

app.post('/delete/:id', async (req, res) => {
  let users= await userModel.findOneAndDelete({_id:req.params.id});
  // res.send(users);
  res.redirect('/read');
});



app.listen(3000, () => {
  console.log('server started at port 3000');
});
