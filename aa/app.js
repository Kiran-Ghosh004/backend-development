const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cookieParser());

// app.get('/', (req, res) => {
//   res.cookie("name","kiran");
//   res.send("done");
// });  setting cookies

// app.get('/', async (req, res) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash("kiran", salt);
//     console.log(salt);
//     console.log(hash);
//     res.send("done");
// }); password encryption

app.get('/', (req, res) => {
    let token=jwt.sign({email:"kiran@gmai.com"},"secret");
    // console.log(token);
    res.cookie("jwt",token);
    res.send("done");
})


app.get('/compare', async (req, res) => {   
    const isMatch = await bcrypt.compare("kiran", "$2b$10$VIj7cAVd4XSC1r51VU1Fs.PHE3w.fACmqJ9zgWtGyGxeJmbebS0vq");
    console.log(isMatch);
    res.send("done");
});

app.get('/read', (req, res) => {
    let data =jwt.verify(req.cookies.jwt,"secret");
    console.log(data);
    res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
