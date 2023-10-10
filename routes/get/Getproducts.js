const express = require('express');
const Product = require('../../models/product');
const recommendation = require('../../recommendation/recommendation.js')
const sqe = require('../../recommendation/searchQueryInfoExt.js')
const ProductAnalyzer = require('./trial.js');
const route = express.Router();
route.post('/', async (req, res) => {
  try {
    const product = await Product.find().populate("store");
    const productName = "Women's Hat"; 
    // Assuming you receive the selected product name in the request body
    // console.log(product)
    // ProductAnalyzer.getSimilarAndAssociatedProducts(productName,product)
    ProductAnalyzer.getSimilarAndAssociatedProducts(productName, product)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } catch (err) {
    res.json({ errors: err, message: err.message });
  }
})
module.exports = route