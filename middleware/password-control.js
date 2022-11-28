const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(15)                                   // Maximum length 15
.has().uppercase(2)                              // Must have 2 uppercase letter
.has().lowercase(3)                              // Must have 3 lowercase letters
.has().symbols(1)                                // Must have at least 1 symbol
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({error: 'Password is not strong enough ! It must contain between 8 and 15 characters, 2 uppercase letters, 3 lowercase letters, 2 digits, 1 symbol and no spaces.'});
    } else {
        next();
    }
};