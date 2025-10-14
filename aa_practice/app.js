const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    
const user = require('./models/user');

const app = express();
const port = 3000;

// Set up EJS views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index');
});


app.post('/create',  (req, res) => {
    let { username, email, password, age } = req.body;
    bcrypt.genSalt(10, async function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) return next(err);
            // console.log(hash);
            let createdUser = await userModel.create({
                username, email,password: hash, age
            })
            const token=jwt.sign({email},"secreteKey");
            res.cookie('jwt',token);
            res.send(createdUser)


        })

    })



})

app.get('/login',async(req,res)=>{
    res.render('login');
});

app.post('/login',async(req,res)=>{
   let user= await userModel.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("user not found");
    }
    let isValid=await bcrypt.compare(req.body.password,user.password);
    if(!isValid){
        return res.status(400).send("invalid password");
    }
    const token=jwt.sign({email:user.email},"secreteKey");
    res.cookie('token',token);
    res.send("login successful");
});



app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect('/');
})




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
