const express = require('express');
const router = express.Router();
const Storemodel = require('../../models/store');
var fetchuser = require('../../middleware/fetchuser')

router.post('/',fetchuser, async (req, res) => {
    try {    
        const userid = req.user.id
        let filter = { _id: userid };
        let update = {
            Name :Name,
            Address :Address,
            Zipcode:Zipcode,
            Phonenumber :Phonenumber ,
            Password: password,
        };
        let store = await Storemodel.findOneAndUpdate(filter, update, { new: true });
        return res.status(200).json({ store });
    }
    catch (error) {
        return res.status(500).json({ err: error.message });
    }

})

module.exports = router;