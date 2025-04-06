const mongoose = require("mongoose");
const validator = require("validator");

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
        maxLength: 25,
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
        validate(value){
            if(!['male', 'female', 'others'].includes(value)){
                throw new Error('Gender data is not valid');
            }
        }
    },
    ImageUrl:{
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Image URL" + value);
            }
        }
    },
    About:{
        type: String,
        default: "This is the default description of user!",
    },
    Skills:{
        type: [String],
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);