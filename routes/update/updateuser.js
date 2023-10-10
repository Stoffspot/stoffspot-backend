const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Customermodel = require('../../models/user');
const fetchuser = require('../../middleware/fetchuser');

router.post('/', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { password, Firstname, Lastname, Phonenumber } = req.body;

    // Find the customer by user ID
    const customer = await Customermodel.findById(userId);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Verify the provided password
    const isPasswordValid = await bcrypt.compare(password, customer.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Unauthorized: Incorrect password' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(password, salt);

    // Update the customer's information
    customer.Firstname = Firstname;
    customer.Lastname = Lastname;
    customer.Phonenumber = Phonenumber;
    customer.Password = newPasswordHash;

    // Save the updated customer
    const updatedCustomer = await customer.save();

    res.status(200).json({ customer: updatedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;
