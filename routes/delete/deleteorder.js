const express = require('express');
const Product = require('../../models/product');
const Storemodel = require('../../models/store');
const Usermodel = require('../../models/user');
const Ordermodel = require('../../models/order');
const route = express.Router();
var fetchuser = require('../../middleware/fetchuser')

route.delete('/',fetchuser, async (req, res) => {
    ("Processing a request to Delete a User");
    try {
        const { orderid } = req.body;
        const order = await Ordermodel.findByIdAndDelete(orderid);
        if (!order) {
            return res.status(401).json({ msg: "No request was found!" });
        }
        else {

            let filter = { _id: req.user.id };
            const user = await Usermodel.find({ _id: req.user.id })
            let userorders = user[0].Orderlist
            const index = userorders.indexOf(order._id);
            let data = userorders.splice(index, 1);
            let update = { Orderlist: userorders };
            let saveduser = await Usermodel.findOneAndUpdate(filter, update, { new: true });


            const storeid = req.body.Store
            let filterstore = { _id: storeid };
            const store = await Storemodel.find({_id: storeid})
            let storeorders = store[0].Orderlist
            const indexstore = userorders.indexOf(order._id);
            data = userorders.splice(indexstore, 1);
            let updatesore = {Orderlist: storeorders};
            let stores = await Storemodel.findOneAndUpdate(filterstore, updatesore, { new: true });
        
        
            
            const productid = req.body.Product
            let filterproduct = { _id: productid };
            const product = await Productmodel.find({_id: productid})
            let quantity = product[0].Quantity
            value = Number(quantity)
            subvalue=Number(order[0].Quantity)
            value = value + subvalue
            let updateproduct = {Quantity: value};
            let products = await Productmodel.findOneAndUpdate(filterproduct, updateproduct, { new: true });

            return res.status(200).json({ msg: "Successfully Deleted product 💀", order,saveduser });
        }
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
});

module.exports = route;