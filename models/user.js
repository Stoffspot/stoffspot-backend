const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
      Firstname: {type: String,required: true,},
      Lastname: {type: String,required: true,},
      Phonenumber: {type: String,required: true,unique: true},
      Password: {type: String,required: true,},
      Orderlist: [{type: mongoose.Schema.Types.ObjectId, required: false, ref: "order"}],
      Pic: { type: String,required: false,default:"https://img.freepik.com/free-icon/user_318-159711.jpg",},
    },
    {
      timestamps: true,
      collection: 'Users', 
    }
  );
const User  =  mongoose.model('user', userSchema);
module.exports = User;