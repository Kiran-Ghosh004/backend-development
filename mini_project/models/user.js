const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postapp', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name: String,   
    age: Number,
    email: String,
    password: String
}); 


module.exports=mongoose.model('suer', userSchema);
