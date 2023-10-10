const express = require('express');
const router = express.Router();
const Customermodel = require('../../models/user');
var fetchuser = require('../../middleware/fetchuser')

router.post('/',fetchuser, async (req, res) => {
    try {    
        const userid = req.user.id
        let filter = { _id: userid };
        let update = {
            Firstname: Firstname,
            Lastname: Lastname,
            Phonenumber: Phonenumber,
            Password: password,
        };
        let customer = await Customermodel.findOneAndUpdate(filter, update, { new: true });
        return res.status(200).json({ customer });
    }
    catch (error) {
        return res.status(500).json({ err: error.message });
    }

})

module.exports = router;