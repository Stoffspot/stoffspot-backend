const express = require('express');
const Product = require('../../models/product');
const Storemodel = require('../../models/store');
const route = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');

route.post('/', fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    for (var i = 0; i < req.body.productarray.length; i++) {
      const productData = req.body.productarray[i];

      // Create a new product
      const product = await Product.create({
        store: req.user.id,
        Quantity: "4", // Set the initial quantity as needed
        Price: productData.Price,
        Name: productData.Name,
        Brand: productData.Brand,
        Category: productData.Category,
        Gender: productData.Gender,
        Description: productData.Description,
        Highlight: productData.Highlight,
        color: productData.Color, // Correct the casing of 'color'
        Price: productData.Price // Remove duplicate 'Price'
      });

      const userid = req.user.id;
      const filter = { _id: userid };

      // Update the store's product list
      const store = await Storemodel.findById(userid);

      if (!store) {
        // Handle case where the store is not found
        throw new Error('Store not found');
      }

      store.Productlist.push(product._id);
      await store.save();
    }

    res.status(200).json("Done");
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: err, message: err.message });
  }
});

module.exports = route;
