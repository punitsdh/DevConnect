const express = require("express");
const connectDB = require("./config/database");
const app = express();


connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(7777, () =>{
        console.log("Server running on port 7777");
    });
})
.catch((err) =>{
    console.error("Database cannot be connected!!");
});
