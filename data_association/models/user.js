const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts:Array
});

module.exports=mongoose.model('User', userSchema);


