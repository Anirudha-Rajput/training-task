const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        let res =await  mongoose.connect(process.env.mongouri)
        if (res) console.log("connected to database")
    } catch (error) {
        console.log("error in connecting to database",error)
    }
}
module.exports = connectDB;