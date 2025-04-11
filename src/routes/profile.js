const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
        res.json({message: `${loggedInUser.firstName}, your profile is updated successfully`, data: loggedInUser});

    }catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
});

/*profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
    try{

    }catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
});*/

module.exports = profileRouter;