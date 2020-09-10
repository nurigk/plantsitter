const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/plantsitter', {useNewUrlParser: true});


const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  plantsName: String,
  duration: Number,
  active: {type: Boolean, default: false},
  confirmed: {type:Boolean, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;