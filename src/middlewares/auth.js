const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        const decodeObj = await jwt.verify(token, "DEV@Connect$7907");

        const { _id } = decodeObj;

        const user = await User.findById( _id);
        if(!user) {
            throw new Error("User not found");
        }
        next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
};


module.exports = {
    userAuth,
}