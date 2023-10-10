const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Storemodel = require('../../models/store');
const fetchuser = require('../../middleware/fetchuser');

router.post('/', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { password, Name, Address, Zipcode, Phonenumber } = req.body;

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

    // Hash the new password
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(password, salt);

    // Update the store's information
    store.Name = Name;
    store.Address = Address;
    store.Zipcode = Zipcode;
    store.Phonenumber = Phonenumber;
    store.Password = newPasswordHash;

    // Save the updated store
    const updatedStore = await store.save();

    res.status(200).json({ store: updatedStore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;
