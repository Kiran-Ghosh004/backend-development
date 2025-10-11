const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
});

module.exports= mongoose.model('User', userSchema);
