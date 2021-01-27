const Validator = require("validator");
const isEmpty = require("is-empty");

const validateInput = (data) => {
    let errors = {};
    // Email check 
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password check
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be at least 8 characters";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateInput;