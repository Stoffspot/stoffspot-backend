const express = require('express');
const bcrypt = require('bcryptjs');
const Storemodel = require('../../models/store');
const route = express.Router();
const fetchuser = require('../../middleware/fetchuser');

route.delete('/', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    // Find the store by user ID
    const store = await Storemodel.findById(userId);

    if (!store) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    // Verify the provided password
    const isPasswordValid = await bcrypt.compare(password, store.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Unauthorized: Incorrect password' });
    }

    // Proceed with deleting the store
    const deletedStore = await Storemodel.findByIdAndDelete(userId);

    res.status(200).json({ success: 'Your account is deleted', store: deletedStore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: err, message: err.message });
  }
});

module.exports = route;
