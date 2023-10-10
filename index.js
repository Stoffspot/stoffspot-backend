const express = require('express')
var cors = require('cors')
const app = express()
app.use(express.json())

// Connect the database
const db = require('./db.js')
db();

// Port number is assigned
const port = 3001
app.use(cors())


// route for test
app.use('/',require('./routes/test'))

// routes for the user 
app.use('/app/login',require('./routes/get/Login'))
app.use('/app/signup',require('./routes/create/Signup'))
app.use('/app/deleteuser',require('./routes/delete/deleteaccount'))
app.use('/app/updateuser',require('./routes/update/updateuser'))

// routes for the adding a shop
app.use('/app/shoplogin',require('./routes/get/Getshop'))
app.use('/app/shopsignup',require('./routes/create/Shop'))
app.use('/app/deleteshop',require('./routes/delete/deleteshop'))
app.use('/app/updateshop',require('./routes/update/updateshop'))

// routes for the adding a shop
app.use('/app/getproducts',require('./routes/get/Getproducts'))
app.use('/app/addproducts',require('./routes/create/Product'))
app.use('/app/deleteproducts',require('./routes/delete/deleteproduct'))
app.use('/app/updateproducts',require('./routes/update/updateproduct'))

// routes for the getting details regarding an order by a store owner and a user
app.use('/app/getuserdata',require('./routes/get/Getuserdata.js'))
app.use('/app/getstoredata',require('./routes/get/Getstoredata.js'))

// routes for the adding a order
app.use('/app/addorder',require('./routes/create/order.js'))
app.use('/app/deleteorder',require('./routes/delete/deleteorder.js'))

// routes for the searched product  
app.use('/app/getsearchedproducts',require('./routes/get/Search'))

// routes for the testing and updating products  
app.use('/app/addmultipleproducts',require('./routes/create/multipleproduct'))
app.use('/app/updateproductscolor',require('./routes/update/updatecolor'))

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})