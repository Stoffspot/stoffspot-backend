const express = require('express');
const Productmodel = require('../../models/product');
const Storemodel = require('../../models/store');
const Usermodel = require('../../models/user');
const Ordermodel = require('../../models/order');
const route = express.Router();
const fetchuser = require('../../middleware/fetchuser');

route.delete('/', fetchuser, async (req, res) => {
  try {
    const { orderid } = req.body;
    const order = await Ordermodel.findById(orderid);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    const filter = { _id: req.user.id };
    const user = await Usermodel.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const userorders = user.Orderlist;
    const index = userorders.indexOf(order._id);

    if (index === -1) {
      return res.status(400).json({ msg: 'Order is not associated with this user' });
    }

    userorders.splice(index, 1);
    user.Orderlist = userorders;
    const saveduser = await user.save();

    const storeid = req.body.Store;
    const store = await Storemodel.findById(storeid);

    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    const storeorders = store.Orderlist;
    const indexstore = storeorders.indexOf(order._id);

    if (indexstore !== -1) {
      storeorders.splice(indexstore, 1);
      store.Orderlist = storeorders;
      await store.save();
    }

    const productid = req.body.Product;
    const product = await Productmodel.findById(productid);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const quantity = product.Quantity;
    const subvalue = order.Quantity;
    product.Quantity = quantity + subvalue;
    await product.save();
    await order.remove();
    return res.status(200).json({ msg: 'Successfully deleted order and updated related data', order, saveduser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message });
  }
});

module.exports = route;
