const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        minLength: 3,
        maxLength: 25,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 25,
    },
    emailId: {
        type: String,
        required : true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 25,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address" + value);
            }
        }
    },
    password: {
        type: String,
        required : true,
        minLength: 3,
        maxLength: 100,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Give a strong password!" + value);
            }
        }
    },
    age: {
        type: Number,
        min : 18,
    },
    gender:{
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not a valid gender type`
        },
    },
    imageUrl:{
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Image URL" + value);
            }
        }
    },
    about:{
        type: String,
        default: "This is the default description of user!",
    },
    skills:{
        type: [String],
    }
},
{
    timestamps: true,
});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id: user._id }, "DEV@Connect$7907", {expiresIn: "7d"});

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
} 
module.exports = mongoose.model("User", userSchema);