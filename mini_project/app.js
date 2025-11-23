// -----------------------
// 1. IMPORTS
// -----------------------
const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user'); 
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');


// -----------------------
// 2. BASIC APP SETUP
// -----------------------
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// -----------------------
// 3. MIDDLEWARE (Written before routes)
// -----------------------
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

function redirectIfLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (token) {
        try {
            jwt.verify(token, 'kiransecretkey');
            return res.redirect('/profile');
        } catch (err) {
            res.clearCookie("token");
        }
    }
    next();
}



// -----------------------
// 4. BASIC VIEW ROUTES (Written first)
// -----------------------
app.get('/',redirectIfLoggedIn, (req, res) => {
  res.render('index');
});

app.get('/login',redirectIfLoggedIn, (req, res) => {
  res.render('login');
});


// -----------------------
// 5. AUTH ROUTES (Register & Login)
// -----------------------
app.post('/register',redirectIfLoggedIn, async (req, res) => {
    try {
        const { name, username, age, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            username,
            age,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        let token = jwt.sign(
            { email: newUser.email, userid: newUser._id },
            'kiransecretkey'
        );

        res.cookie('token', token, { httpOnly: true });

        res.status(201).send('User registered successfully login now');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


app.post('/login',redirectIfLoggedIn, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        }

        const token = jwt.sign(
            { email: user.email, userid: user._id },
            "kiransecretkey"
        );

        res.cookie("token", token, { httpOnly: true });

        res.redirect("profile");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


// -----------------------
// 6. PROFILE & POSTS ROUTES
// -----------------------
app.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel
            .findOne({ email: req.user.email })
            .populate('posts');

        res.render('profile', { user });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});


app.post('/post', isLoggedIn, async (req, res) => {
    try {
        const { title, content } = req.body;

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


app.get('/allposts', isLoggedIn, async (req, res) => {
    try {
        const posts = await postModel
            .find()
            .populate("user", "name username email")
            .sort({ createdAt: -1 });

        res.render("allposts", { posts });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});


app.get("/like/:id", isLoggedIn, async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) return res.status(404).send("Post not found");

        const userId = req.user.userid;

        // Toggle like/unlike
        if (post.likes.includes(userId)) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        // Safe redirect
        res.redirect(req.get("referer"));

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) return res.status(404).send("Post not found");

        if (post.user.toString() !== req.user.userid) {
            return res.status(403).send("Unauthorized");
        }

        res.render("edit", { post });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.post("/edit/:id", isLoggedIn, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title.trim() || !content.trim()) {
            return res.status(400).send("Title and content required");
        }

        const post = await postModel.findById(req.params.id);

        if (!post) return res.status(404).send("Post not found");

        if (post.user.toString() !== req.user.userid) {
            return res.status(403).send("Unauthorized");
        }

        post.title = title.trim();
        post.content = content.trim();
        await post.save();

        res.redirect("/profile");

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.get("/delete/:id", isLoggedIn, async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) return res.status(404).send("Post not found");

        // Prevent deleting others’ posts
        if (post.user.toString() !== req.user.userid) {
            return res.status(403).send("You can delete only your own posts");
        }

        await postModel.findByIdAndDelete(req.params.id);

        // Remove post from user.posts array
        await userModel.updateOne(
            { _id: req.user.userid },
            { $pull: { posts: req.params.id } }
        );

        res.redirect("/profile");

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});





// -----------------------
// 7. LOGOUT ROUTE
// -----------------------
app.get('/logout', (req, res) => {
    res.cookie('token',"");
    res.redirect('login');
});


// -----------------------
// 8. SERVER LISTENER (Always last)
// -----------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
