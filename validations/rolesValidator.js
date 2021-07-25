const { check } = require('express-validator');

const validateRole = [
    check("name")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Role Name is required!")
        .isLength({ min: 2 })
        .bail()
        .withMessage("Minimum 2 characters required!"),
]

module.exports = { validateRole };