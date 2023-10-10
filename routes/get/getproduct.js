const express = require('express');
const router = express.Router();
const ProductModel = require('../../models/product');

// Define a route for getting random products for the homepage
router.get('/homepage', async (req, res) => {
  try {
    // Fetch a random set of 40 products for the homepage
    const homepageProducts = await ProductModel.aggregate([
      { $sample: { size: 40 } },
    ]);

    res.status(200).json({ homepageProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;
