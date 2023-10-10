const mongoose = require('mongoose')
const BookingSchema = mongoose.Schema(
    {
      store: {type: mongoose.Schema.Types.ObjectId, required: false, ref: "store"},
      Quantity: {type: String,required: true,},
      Name: {type: String,required: true,},
      Gender: {type: String,required: true,},
      Brand: {type: String,required: true,},
      Category: {type: String,required: true,},
      Description: {type: String,required: true},
      Highlight: {type: String,required: true},
      color: [{type: String,required: true,}],
      size: [{type: String,required: true,}],
      Images: [{type: String,default:"https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",}],
      Price: {type: String,required: true,},
    },
    {
      timestamps: true,
      collection: 'Products', 
    }
  );

  const Product  =  mongoose.model('product', BookingSchema);
  module.exports = Product;