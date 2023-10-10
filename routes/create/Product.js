const express = require('express');
const Product = require('../../models/product');
const Storemodel = require('../../models/store');
const route = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');

route.post('/', fetchuser, [body('Description', 'Enter a valid name').isLength({ min: 3 })], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productData = {
      store: req.user.id,
      Quantity: req.body.Quantity,
      Price: req.body.Price,
      Name: req.body.Name,
      Brand: req.body.Brand,
      Category: req.body.Category,
      Gender: req.body.Gender,
      Description: req.body.Description,
      Highlight: req.body.Highlight,
      color: req.body.color,
      Images: req.body.Images
    };

    // Create a new product
    const product = await Product.create(productData);

    const userid = req.user.id;
    const filter = { _id: userid };

    // Find and update the store
    const store = await Storemodel.findById(userid);

    if (!store) {
      // Handle case where the store is not found
      throw new Error('Store not found');
    }

    // Push the product's _id to the Productlist
    store.Productlist.push(product._id);

    // Check if the product's _id is in the Productlist
    const isProductInList = store.Productlist.includes(product._id);

    if (!isProductInList) {
      // If not, delete the created product and return an error
      await Product.findByIdAndDelete(product._id);
      return res.status(400).json({ message: 'Product not associated with the store' });
    }

    // If the product is associated with the store, update the store
    const updatedStore = await store.save();
    res.status(200).json({ product, store: updatedStore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: err, message: err.message });
  }
});

module.exports = route;
