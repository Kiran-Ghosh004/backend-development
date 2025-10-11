const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    email: String
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
