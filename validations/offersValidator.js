const { check } = require('express-validator');

const validateOffer = [
    check("firstName")
        .not()
        .isEmpty()
        .bail()
        .withMessage("First Name is required!")
        .isLength({ min: 3 })
        .bail()
        .withMessage("Minimum 3 characters required!"),
    check("lastName")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Last Name is required!")
        .isLength({ min: 3 })
        .bail()
        .withMessage("Minimum 3 characters required!"),
    check("email")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Email Address is required!")
        .isEmail()
        .normalizeEmail()
        .bail()
        .withMessage("Invalid Email Address!"),
    check("phone")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Phone is required!")
        .isMobilePhone()
        .bail()
        .withMessage("Invalid phone number!"),
    check("messageText")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Message Text is required!")
        .isLength({ min: 10 })
        .bail()
        .withMessage("Minimum 10 characters required!"),
];

module.exports = { validateOffer };