const express = require('express');
const Product = require('../../models/product');
const Storemodel = require('../../models/store');
const route = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../../middleware/fetchuser')

route.post('/',fetchuser, [body('Description', 'Enter a valid name').isLength({ min: 3 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = await Product.create({
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
        Price: req.body.Price,
        Images: req.body.Images
    })
    const userid = req.user.id
    let filter = { _id: userid };
    const store = await Storemodel.find({_id: userid})
    let Products = store[0].Productlist
    Products.push(product._id)
    let update = {Productlist: Products};
    let stores = await Storemodel.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json({ product, stores})
  } catch (err) {
    res.json({ errors: err, message: err.message })
  }
})
module.exports = route