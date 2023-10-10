const express = require('express');
const Product = require('../../models/product');
const route = express.Router();
route.post('/', async (req, res) => {
  try {
    const singularInput = req.body.searchquery.replace(/s$/, '');
    const product = await Product.find(
      {
        $or: [
            { Name: { $regex: new RegExp(`${req.body.searchquery}|${singularInput}`, 'i') }},
            { Brand: { $regex: new RegExp(`${req.body.searchquery}|${singularInput}`, 'i') } },
            { Gender: { $regex: new RegExp(`${req.body.searchquery}|${singularInput}`, 'i') } },
            { Category: { $regex: new RegExp(`${req.body.searchquery}|${singularInput}`, 'i') } },
            { Highlight: { $regex: new RegExp(`${req.body.searchquery}|${singularInput}`, 'i') } },
        ]
    }
    )
    res.status(200).json(product);
    } catch (err) {
    res.json({ errors: err, message: err.message });
  }
})
module.exports = route