const express = require('express');
const Storemodel = require('../../models/store');
const Ordermodel = require('../../models/order');
const Usermodel = require('../../models/user');
const Productmodel = require('../../models/product');
const route = express.Router();
var fetchuser = require('../../middleware/fetchuser')

route.post('/',fetchuser, async (req, res) => {
  try {

    const Order = await Ordermodel.create({
        Customer: req.user.id,
        Store: req.body.Store,
        Product: req.body.Product,
        Quantity: req.body.Quantity,
        Address: req.body.Address,
        Zipcode: req.body.Zipcode,
        Paymenttype: req.body.Paymenttype,
        Paymentstatus: req.body.Paymentstatus
    })

    const userid = req.user.id
    let filter = { _id: userid };
    const user = await Usermodel.find({_id: userid})
    let Orders = user[0].Orderlist
    Orders.push(Order._id)
    let update = {Orderlist: Orders};
    let User = await Usermodel.findOneAndUpdate(filter, update, { new: true });

    const storeid = req.body.Store
    let filterstore = { _id: storeid };
    const store = await Storemodel.find({_id: storeid})
    let storeorders = store[0].Orderlist
    storeorders.push(Order._id)
    let updatesore = {Orderlist: storeorders};
    let stores = await Storemodel.findOneAndUpdate(filterstore, updatesore, { new: true });

    const productid = req.body.Product
    let filterproduct = { _id: productid };
    const product = await Productmodel.find({_id: productid})
    let quantity = product[0].Quantity
    value = Number(quantity)
    subvalue=Number(req.body.Quantity)
    value = value - subvalue
    let updateproduct = {Quantity: value};
    let products = await Productmodel.findOneAndUpdate(filterproduct, updateproduct, { new: true });


    res.status(200).json({ Order})
  } catch (err) {
    res.json({ errors: err, message: err.message })
  }
})
module.exports = route