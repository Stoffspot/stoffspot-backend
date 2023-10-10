const express = require('express');
const Store = require('../../models/store');
const route=express.Router();
var fetchuser = require('../../middleware/fetchuser')

route.post('/',fetchuser,async(req, res) => {
    try {
      const storeid=req.user.id
      const store=await Store.findById(storeid).select("-password").populate({path:"Orderlist",populate:{path : 'Product'}}).populate({path:"Orderlist",populate:{path : 'Store'}}).populate({path:"Productlist"})
      res.status(200).json({store})
    } catch (err) {
      res.json({ errors:err, message: err.message})
    }
  })
  module.exports=route