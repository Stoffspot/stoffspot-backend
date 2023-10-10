const express = require('express');
const route = express.Router();
route.get('/', async (req, res) => {
    // data = await Product.find({_id:{$in: prp}}).populate("store");
    res.send('hello world')
})
module.exports = route