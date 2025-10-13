const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cookieParser());

// app.get('/', (req, res) => {
//   res.cookie("name","kiran");
//   res.send("done");
// });

app.get('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("kiran", salt);
    console.log(salt);
    console.log(hash);
    res.send("done");
});
app.get('/compare', async (req, res) => {   
    const isMatch = await bcrypt.compare("kiran", "$2b$10$VIj7cAVd4XSC1r51VU1Fs.PHE3w.fACmqJ9zgWtGyGxeJmbebS0vq");
    console.log(isMatch);
    res.send("done");
});

app.get('/read', (req, res) => {
//   console.log(req.cookies);
  res.send("read page");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
