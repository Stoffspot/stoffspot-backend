const express = require('express');
const Storemodel = require('../../models/store');
const Ordermodel = require('../../models/order');
const Usermodel = require('../../models/user');
const Productmodel = require('../../models/product');
const route = express.Router();
const fetchuser = require('../../middleware/fetchuser');

route.post('/', fetchuser, async (req, res) => {
  try {
    // Create a new order
    const Order = await Ordermodel.create({
      Customer: req.user.id,
      Store: req.body.Store,
      Product: req.body.Product,
      Quantity: req.body.Quantity,
      Address: req.body.Address,
      Zipcode: req.body.Zipcode,
      Paymenttype: req.body.Paymenttype,
      Paymentstatus: req.body.Paymentstatus
    });

    // Use aggregation pipeline to check and update user and store
    const userId = req.user.id;
    const storeId = req.body.Store;
    const productId = req.body.Product;

    const [user, store, product] = await Promise.all([
      Usermodel.findById(userId),
      Storemodel.findById(storeId),
      Productmodel.findById(productId)
    ]);

    if (!user || !store || !product) {
      return res.status(404).json({ message: 'User, Store, or Product not found' });
    }

    try {
      user.Orderlist.push(Order._id);
      store.Orderlist.push(Order._id);
      const newQuantity = Number(product.Quantity) - Number(req.body.Quantity);

      if (newQuantity < 0) {
        throw new Error('Insufficient product quantity');
      }

      product.Quantity = newQuantity;

      await Promise.all([user.save(), store.save(), product.save()]);
    } catch (error) {
      // Rollback: Delete the created order if push or update fails
      await Ordermodel.findByIdAndDelete(Order._id);
      throw error; // Re-throw the error for handling in the outer catch block
    }

    res.status(200).json({ Order });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = route;
