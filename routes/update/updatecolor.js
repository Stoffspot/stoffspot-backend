const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

router.post('/', async (req, res) => {
    try {
        for (var i = 0; i < req.body.arrayindex.length; i++) {
            let filter = { _id: req.body.arrayindex[i] };
            let update = {
                size:[  "XS",  "S",  "M",  "L",  "XL",  "XXL",  "XXXL",  "4XL",  "5XL",  "6XL",  "7XL",  "8XL"]
            };
            let product = await Product.findOneAndUpdate(filter, update, { new: true });
        }
        return res.status(200).json("Done");
    }
    catch (error) {
        return res.status(500).json({ err: error.message });
    }

})

module.exports = router;