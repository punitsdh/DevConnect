const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { isObjectIdOrHexString } = require("mongoose");

app.use(express.json());


app.post("/signup", async (req, res) =>{
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User Added Successfully!");
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

//get user details by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        console.log(userEmail);
        const user = await User.findOne({emailId : userEmail});
        if(!user){
            res.status(404).send("User not found!!");
        }
        else{
            res.send(user);
        }
    }
    catch(err){
        res.status(404).send("Something went wrong!!");
    }
})

// get feed API- show all users
app.get("/feed", async (req, res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(404).send("Something went wrong!!");
    }
})

//delete user by id API
app.delete("/user", async(req, res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!!");
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

//update user by id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photo", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        const user = await User.findByIdAndUpdate(userId, data, { runValidators: true });
        res.send("User updated successfully!!");
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

//update user by email
/*app.patch("/user", async (req, res) =>{
    const email = req.body.emailId;
    const data = req.body;
    console.log(req.body);
    try{
        const user = await User.findOneAndUpdate({ emailId : email } , data, { runValidators: true });
        res.send("User updated successfully!!");
    }
    catch(err){
        res.status(404).send("Something went wrong!");
    }
})*/


connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(7777, () =>{
        console.log("Server running on port 7777");
    });
})
.catch((err) =>{
    console.error("Database cannot be connected!!");
});
