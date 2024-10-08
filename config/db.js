const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log('connected to mongoDB');
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB