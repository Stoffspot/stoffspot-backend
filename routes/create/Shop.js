const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Storemodel = require('../../models/store');

router.post('/',async(req,res)=>{
    ("Processing a request to Register");

    try{
        const{Name, Address, Zipcode,Phonenumber,Password} = req.body;
        // check for empty fields
        if(!Name || !Address ||!Zipcode || !Phonenumber || !Password) {
            return res.status(400).json({ msg: "Not all fields have been entered" });
        }
        // check the length of Password
        if(Password.length <6){
            return res.status(400).json({msg: "Password is too Short."});
        }
        // checking the availability of Number
        const NumberTaken = await Storemodel.findOne({Phonenumber});
        if(NumberTaken){
            res.status(409).json({msg: "This PhoneNumber is Already Taken."});
            return;
        }
        // generate the hashing for password 
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(Password,salt);
        const Store = new Storemodel({
            Name :Name,
            Address :Address,
            Zipcode:Zipcode,
            Phonenumber :Phonenumber ,
            Password: passwordHash,
        });
        const savedStore = await Store.save();
        return res.status(201).json({savedStore});
    }
    catch(error){
       return res.status(500).json({err:error.message});
    }
})

module.exports = router;

