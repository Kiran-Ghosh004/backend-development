const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie("name","kiran");
  res.send("done");
});
app.get('/read', (req, res) => {
//   console.log(req.cookies);
  res.send("read page");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
