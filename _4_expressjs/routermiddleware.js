const express = require("express");
const app = express();
const router = express.Router();

// Router-level middleware (only works for /user routes)
router.use((req, res, next) => {
  console.log("This middleware runs only for /user routes");
  next();
});

// Routes inside /user
router.get("/profile", (req, res) => {
  res.send("User Profile Page");
});

router.get("/settings", (req, res) => {
  res.send("User Settings Page");
});

// Attach router to app
app.use("/", router);

// A route outside /user (middleware will NOT run here)
app.get("/about", (req, res) => {
  res.send("About Page - No middleware triggered");
});

app.listen(3000, () => console.log("Server running on port 3000"));
