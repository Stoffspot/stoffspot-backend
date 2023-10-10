const mongoose = require('mongoose')
const BookingSchema = mongoose.Schema(
    {
      Customer: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user"},
      Store: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "store"},
      Product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "product"},
      Quantity: {type: String,required: true,},
      Address: {type: String,required: true,},
      Zipcode: {type: String,required: true,},
      Paymenttype: {type: String,required: true,},
      Paymentstatus: {type: String, required: false, default: false,}
    },
    {
      timestamps: true,
      collection: 'orders', 
    }
  );

  const orders  =  mongoose.model('order', BookingSchema);
  module.exports = orders;