const mongoose = require('mongoose');
const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://batol:batol123@cluster0.gsfza.mongodb.net/');
    console.log(`mongo connected: ${conn.connection.host}`);
  };
module.exports = connectDB;