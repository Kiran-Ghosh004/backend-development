const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/userDB')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ Connection Error:', err));


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, min: 0 }
});

const user = mongoose.model('user', userSchema);
module.exports = user;


