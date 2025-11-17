const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postapp', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name: String, 
    username: String,  
    age: Number,
    email: String,
    password: String,
    posts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]
}); 


module.exports=mongoose.model('user', userSchema);
