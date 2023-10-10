const express = require('express');
const bcrypt = require('bcryptjs');
const Customermodel = require('../../models/user');
const route = express.Router();
const fetchuser = require('../../middleware/fetchuser');

route.delete('/', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

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

    // Proceed with deleting the customer
    const deletedCustomer = await Customermodel.findByIdAndDelete(userId);

    res.status(200).json({ success: 'Your account is deleted', customer: deletedCustomer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: err, message: err.message });
  }
});

module.exports = route;
