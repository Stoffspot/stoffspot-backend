const mongoose = require('mongoose')
const storeSchema = mongoose.Schema(
    {
      Name: {type: String,required: true,},
      Address: {type: String,required: true,},
      Zipcode: {type: String,required: true,},
      Phonenumber: {type: String,required: true,unique: true},
      Password: {type: String,required: true,},
      Orderlist: [{type: mongoose.Schema.Types.ObjectId, required: false, ref: "order"}],
      Productlist: [{type: mongoose.Schema.Types.ObjectId, required: false, ref: "product"}],
      Pic: { type: String,required: false,default:"https://www.shareicon.net/data/2017/06/05/886722_store_512x512.png",},
    },
    {
      timestamps: true,
      collection: 'Stores', 
    }
  );
const Store  =  mongoose.model('store', storeSchema);
module.exports = Store;