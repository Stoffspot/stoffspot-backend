const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
var fetchuser = require('../../middleware/fetchuser')

router.post('/', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id
        let filter = { _id: req.body.id };
        let update = {
            Store: userid,
            Quantity: req.body.Quantity,
            Price: req.body.Price,
            Name: req.body.Name,
            Gender: req.body.Gender,
            Description: req.body.Description,
            Highlight: req.body.Highlight,
            color: req.body.color,
            Price: req.body.Price,
            Brand: req.body.Brand,
            Category: req.body.Category,
            Images: req.body.Images
        };
        let product = await Product.findOneAndUpdate(filter, update, { new: true });
        return res.status(200).json({ product });
    }
    catch (error) {
        return res.status(500).json({ err: error.message });
    }

})

module.exports = router;