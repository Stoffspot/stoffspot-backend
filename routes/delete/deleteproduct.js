const express = require('express');
const Product = require('../../models/product');
const Storemodel = require('../../models/store');
const route = express.Router();
var fetchuser = require('../../middleware/fetchuser')

route.delete('/',fetchuser, async (req, res) => {
    ("Processing a request to Delete a User");
    try {
        const { productid } = req.body;
        const product = await Product.findByIdAndDelete(productid);
        if (!product) {
            return res.status(401).json({ msg: "No request was found!" });
        }
        else {
            let filter = { _id: req.user.id };
            const store = await Storemodel.find({ _id: req.user.id })
            let product = store[0].Productlist
            const index = product.indexOf(product._id);
            let data = product.splice(index, 1);
            let update = { Productlist: product };
            let savedstore = await Storemodel.findOneAndUpdate(filter, update, { new: true });
            return res.status(200).json({ msg: "Successfully Deleted product 💀", product,savedstore });
        }
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
});

module.exports = route;