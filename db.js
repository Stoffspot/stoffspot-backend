const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://manishsingh:seeta11102007@cluster0.q6nzvjz.mongodb.net/stoffspot";
const connecttodatabase = async () => {
    await mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err));
}
module.exports = connecttodatabase