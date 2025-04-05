const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());


app.post("/signup", async (req, res) =>{
    const user = new User({
        firstName: "Punit",
        lastName: "Dhande",
        emailId: "punit@dhande.com",
        password: "punit@123",
    });

    //try{
        await user.save();
        res.send("User Added Successfully!");
    //}
    //catch(err){
        //res.status(400).send("Error saving the user:" + err.message);
    //}
});


connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(7777, () =>{
        console.log("Server running on port 7777");
    });
})
.catch((err) =>{
    console.error("Database cannot be connected!!");
});
