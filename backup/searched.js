const express = require('express');
const Product = require('../../models/product');
const route = express.Router();
route.post('/', async (req, res) => {
    try {
        if (req.body.searchquery.length = !0) {
            const product = await Product.find(
                {
                    $or: [
                        { Name: { $regex: new RegExp(req.body.searchquery, 'i') }},
                        { Brand: { $regex: new RegExp(req.body.searchquery, 'i') } },
                        { Category: { $regex: new RegExp(req.body.searchquery, 'i') } },
                        { Highlight: { $regex: new RegExp(req.body.searchquery, 'i') } },
                    ]
                }
            ).populate("store");
            if(product.length > 0) {
                res.status(200).json(product);
            }
        }
        res.status(404).json({ message: "Your requested data is empty" });
    } catch (err) {
        res.json({ errors: err, message: err.message });
    }
})
module.exports = route