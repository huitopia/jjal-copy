const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userID: {
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  } 
});

// UserSchema.virtual("userId").get(function () {
//   return this._id.toHexString();
// });

// UserSchema.set("toJSON", {
//   virtuals: true,
// });

const User = mongoose.model('User', UserSchema);

module.exports = User