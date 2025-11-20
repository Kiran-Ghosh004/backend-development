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


app.post('/post', isLoggedIn, async (req, res) => {
    try {
        const { title, content } = req.body;

        // Validation
        if (!title || !content || title.trim() === "" || content.trim() === "") {
            return res.status(400).send("Title and content cannot be empty");
        }

        const user = await userModel.findOne({ email: req.user.email });

        const post = await postModel.create({
            user: user._id,
            title: title.trim(),
            content: content.trim(),
        });

        user.posts.push(post._id);
        await user.save();

        res.redirect('/profile');

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});



app.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel
            .findOne({ email: req.user.email })
            .populate('posts');  // <-- important

        res.render('profile', { user });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
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

        res.status(201).send('User registered successfully login now');

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

        res.redirect("profile");

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