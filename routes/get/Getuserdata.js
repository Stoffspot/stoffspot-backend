const express = require('express');
const User = require('../../models/user');
const route=express.Router();
var fetchuser = require('../../middleware/fetchuser')

route.post('/',fetchuser,async(req, res) => {
    try {
      const userid=req.user.id
      const user=await User.findById(userid).select("-password").populate({path:"Orderlist",populate:{path : 'Product'}}).populate({path:"Orderlist",populate:{path : 'Store'}})
      res.status(200).json({user})
    } catch (err) {
      res.json({ errors:err, message: err.message})
    }
  })
  module.exports=route