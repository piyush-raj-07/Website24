const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  UserEmail: { type: String, required: true, unique: true },
  Name: { type: String , required: true },
  Img_URL : {type : String, default : "" },
  Grad_Year : {type: Number , required: true },
  Degree : {type:String},
  About : {type:String},
  
  Blogs : [{ B_Id : {type:String} }],
  is_Proj : {type:Boolean, default:false},
  Role : {type: String, default:"user"}

});

// this adds data to collection users

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
