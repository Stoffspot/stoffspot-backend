const express = require('express');
const Product = require('../../models/product');
const Storemodel = require('../../models/store');
const route = express.Router();
const fetchuser = require('../../middleware/fetchuser');

route.delete('/', fetchuser, async (req, res) => {
  try {
    const { productid } = req.body;
    const product = await Product.findById(productid);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const store = await Storemodel.findById(req.user.id);

    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    let productList = store.Productlist;
    const index = productList.indexOf(productid);

    if (index === -1) {
      return res.status(400).json({ msg: 'Product is not associated with this store' });
    }

    productList.splice(index, 1);
    store.Productlist = productList;
    const savedStore = await store.save();

    // Check if the product still exists in the store's Productlist
    if (savedStore.Productlist.includes(productid)) {
      return res.status(500).json({ msg: 'Failed to update the store' });
    }

    // If the store's Productlist is updated, delete the product
    await product.remove();

    return res.status(200).json({ msg: 'Successfully deleted product 💀', product, savedStore });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message });
  }
});

module.exports = route;
