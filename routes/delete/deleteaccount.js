const express = require('express');
const Storemodel = require('../../models/store');
const route = express.Router();
var fetchuser = require('../../middleware/fetchuser')
route.delete('/',fetchuser, async (req, res) => {
  try {
    const userid = req.user.id
    let store=Storemodel.findById(userid);
    if(!store){
      return res.status(400).json({ errors: errors.array() });
    }
    store= await Storemodel.findByIdAndDelete(userid)
    res.status(200).json({"success":"your account is deleted",store:store})
  } catch (err) {
    res.json({ errors: err, message: err.message })
  }
})
module.exports = route