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
}

module.exports = {
    isValidSignupData,
}