const validator = require('validator');

const isValidSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName) {
        throw new Error ("Name is not valid!");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error ("Email not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Enter a strong password!");
    }
};

const validateEditProfileData = (req) =>{
    const allowedEditFields = ["firstName", "lastName", "emailId", "ImageUrl", "gender", "age", "About", "Skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;
};

module.exports = {
    isValidSignupData,
    validateEditProfileData,
}