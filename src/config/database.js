const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://punitsdh:3Y2hLdsSMvBUeKKu@devconnect.ur9lkm5.mongodb.net/devConnect");
};

module.exports = connectDB;
