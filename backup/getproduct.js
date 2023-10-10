const express = require('express');
const Product = require('../../models/product');
const recommendation = require('../../recommendation/recommendation.js')
const sqe = require('../../recommendation/searchQueryInfoExt.js')
const route = express.Router();
route.post('/', async (req, res) => {
  try {
    const user_pref = {
      'brand': ['hrx', 'fastrack', 'Blossom', 'Denim Diva'],
      'gender': 'female',
      'age': 34,
      'type': ['shirt', 'kurti'],
      'colors': ['black', 'white'],
    }
    const prev = {
      "product": [
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "Nokia",
          "Category": "kurta",
          "color": "red",
          "Price": "320",
          "Gender": "female",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "Nokia",
          "Category": "skirt",
          "color": "blue",
          "Price": "340",
          "Gender": "female",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "Nokia",
          "Category": "skirt",
          "color": "red",
          "Price": "350",
          "Gender": "female",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "fastrack",
          "Category": "lehnga",
          "color": "white",
          "Price": "370",
          "Gender": "male",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "fastrack",
          "Category": "shirt",
          "color": "red",
          "Price": "650",
          "Gender": "male",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "hrx",
          "Category": "pants",
          "color": "black",
          "Price": "650",
          "Gender": "male",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "Nokia",
          "Category": "pants",
          "color": "white",
          "Price": "670",
          "Gender": "female",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        }
      ]
    };

    const cart = {
      "product": [
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "hrx",
          "Category": "lehnga",
          "color": "white",
          "Price": "300",
          "Gender": "female",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "fastrack",
          "Category": "shirt",
          "color": "white",
          "Price": "610",
          "Gender": "male",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "gullu",
          "Category": "skirt",
          "color": "red",
          "Price": "310",
          "Gender": "female",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
        {
          "_id": "648709e26ab3aae93d8fb632",
          "Store": "6487045d8f0066341964dbd6",
          "Brand": "fastrack",
          "Category": "pant",
          "color": "black",
          "Price": "630",
          "Gender": "male",
          "Quantity": "4",
          "Name": "Nokia 105 Dual SIM (Black, 4 MB)",
          "Description": "Buy the Nokia 105 Dual SIM (Black, 4 MB) that gives you superb user experience and keeps you in touch with your friends and family. The feature phone comes with an alpha numeric keypad that is easy to use. The phone comes with 1.4 Inches display which is bigger and better. Moreover, the display has a resolution of 128 x 128 Pixels for a clear view and your eyes do not strain even if you use it for a very long time.Besides, multimedia features on the Nokia 105 Dual SIM (Black, 4 MB) include FM Radio, and more.You will never run of the battery of your Nokia 105 Dual SIM (Black, 4 MB) as it features a 800 mAh Li-ion battery.The Nokia 105 Dual SIM (Black, 4 MB) can be bought at Rs.2099 in Black color.",
          "Highlight": "Display: 1.4 Inches display with a resolution of 128 x 128 Pixels Battery: 800 mAh Li-ion Network: 2G Warranty: 1 Year Manufacturer Warranty from the date of purchase",
          "Images": [
            "https://img3.gadgetsnow.com/gd/images/products/additional/large/G10603_View_1/mobiles/feature-phones/nokia-105-dual-sim-black-4-mb-.jpg",
          ],
          "createdAt": "2023-06-12T12:04:50.784Z",
          "updatedAt": "2023-06-12T12:04:50.784Z",
          "__v": 0
        },
      ]
    };
    const product = await Product.find().populate("store")
    var prev_purchase, prev_brands, prev_cat, prev_colors, prev_prices, prev_gen, cart_brands, cart_cat, cart_colors, cart_prices, cart_gen, cart_purchase

    //previous purchase
    prev_brands = prev.product.map(item => item.Brand);
    prev_colors = prev.product.map(item => item.color);
    prev_cat = prev.product.map(item => item.Category);
    prev_prices = prev.product.map(item => item.Price);
    prev_gen = prev.product.map(item => item.Gender)
    prev_purchase = [prev_brands, prev_cat, prev_colors, prev_gen, prev_prices]

    //carts
    try {
      cart_brands = cart.product.map(item => item.Brand);
      cart_colors = cart.product.map(item => item.color);
      cart_cat = cart.product.map(item => item.Category);
      cart_prices = cart.product.map(item => item.Price);
      cart_gen = cart.product.map(item => item.Gender)
      cart_purchase = [cart_brands, cart_cat, cart_colors, cart_gen, cart_prices]
    } catch (e) {
      cart_purchase = [[], [], [], [], []]
    }

    //products
    var pro_brand = []
    var pro_color = []
    var pro_category = []
    var pro_price = []
    var pro_gender = []
    var pro_id = []
    try{
    product.map((item) =>(pro_brand.push(item.Brand)))
    product.map((item) =>(pro_color.push(item.color)))
    product.map((item) =>(pro_category.push(item.Category)))
    product.map((item) =>(pro_price.push(item.Price)))
    product.map((item) =>(pro_gender.push(item.Gender)))
    product.map((item) =>(pro_id.push(item._id)))
    pro_purchase = [pro_brand,pro_color,pro_category,pro_price,pro_gender,pro_id]
    }catch (e){
      res.status(200).json("Add products")
    }
    // console.log(pro_id)
    // console.log(product)

    const r = new recommendation(user_pref, prev_purchase, cart_purchase, pro_purchase);
    const s = new sqe();
    // console.log(product)
    // console.log(r.recom())
    console.log(s.extractClothingInfo('I am looking for a blue adidas shirt'))
    res.status(200).json({ product })
  } catch (err) {
    res.json({ errors: err, message: err.message })
  }
})
module.exports = route