const express = require('express');
const Customermodel = require('../../models/user');
const route = express.Router();
var fetchuser = require('../../middleware/fetchuser')

route.delete('/',fetchuser, async (req, res) => {
  try {
    const userid = req.user.id
    let customer=Customermodel.findById(userid);
    if(!customer){
      return res.status(400).json({ errors: errors.array() });
    }
    customer= await customer.findByIdAndDelete(userid)
    res.status(200).json({"success":"your account is deleted",customer:customer})
  } catch (err) {
    res.json({ errors: err, message: err.message })
  }
})
module.exports = route