const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user'); 
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/profile', isLoggedIn, async (req, res) => {
    console.log(req.user);
    res.send(req.user)
});
    

app.post('/register', async (req, res) => {
    try {
        const { name, username, age, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new userModel({
            name,
            username,
            age,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Create JWT token using newUser id
        let token = jwt.sign(
            { email: newUser.email, userid: newUser._id },
            'kiransecretkey'
        );

        // Store token in cookies
        res.cookie('token', token, { httpOnly: true });

        res.status(201).send('User registered successfully');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        }

        // 3. Create token
        const token = jwt.sign(
            { email: user.email, userid: user._id },
            "kiransecretkey"
        );

        // 4. Store token in cookie
        res.cookie("token", token, { httpOnly: true });

        res.send("Login successful");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.get('/logout', (req, res) => {
    res.cookie('token',"");
    res.redirect('login');
});

function isLoggedIn(req,res,next){
    if(req.cookies.token===""){
        res.redirect('/login');
    }
    else{
        let data=jwt.verify(req.cookies.token, 'kiransecretkey');
        req.user=data;
            
        next();
    }
}








app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});