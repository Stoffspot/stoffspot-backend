const express = require('express');
const Storemodel = require('../../models/store');
const route=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'stoffspottoken';

route.post('/',[body('Password','Enter a valid password').exists(),body('Phonenumber','Enter a valid Mobilenumber').isMobilePhone()], async(req, res) => {
  ("Processing a request to Login");
    const errors = validationResult(req);
    // check for empty fields
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors});
    }
    const {Phonenumber,Password}=req.body;
    try {
      const Store= await Storemodel.findOne({Phonenumber});
      // find the user 
      if (!Store) {
        return res.status(400).json({ errors: errors.array()});
      }
      // compare the password 
      const passwordcompare= await bcrypt.compare(Password,Store.Password)
      if (!passwordcompare) {
        return res.status(400).json({errors: errors.array()});
      }
      const data={
        user:{
         id:Store._id
        }
      }
      // create a token for the verification purpose
      const jwttoken=jwt.sign(data,JWT_SECRET)
      res.json({jwttoken})
    } catch (err) {
      res.json({ errors:err, message: err.message})
    }
  })
  module.exports=route