const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { isValidSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) =>{
    
    try{
        isValidSignupData(req);

        const {firstName, lastName, emailId, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password : passwordHash,
        });

        await user.save();
        res.send("User Added Successfully!");
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});

app.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid Credentials!");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            //create jwt token
            const token = await user.getJWT();

            //Add token to cookie and send the response back to user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("Login Successful!!");
        }
        else{
            throw new Error("Invalid Credentials!");
        }
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});


app.get("/profile", userAuth, async (req, res) => {
    try{
        const cookies = req.cookies;

        const { token } = cookies;
        if(!token){
            throw new Error("Invalid Token!");
        }

        //validate my token
        const decodedMessage = await jwt.verify(token, "DEV@Connect$7907");
        const { _id } = decodedMessage;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User does not exist");
        }
        res.send(user);
    
    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})

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
