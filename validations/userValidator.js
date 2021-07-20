import { check } from "express-validator";

export const validateUserLogin = [
    check("email")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Email Address is required!")
        .isEmail()
        .normalizeEmail()
        .bail()
        .withMessage("Invalid Email Address!"),
    check("password")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Password is required!")
        .isLength({ min: 3 })
        .bail()
        .withMessage("Minimum 3 characters required!"),
];

export const validateUserRegister = [
    check("full_name")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Full Name is required!")
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
    check("password")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Password is required!")
        .isLength({ min: 3 })
        .bail()
        .withMessage("Minimum 3 characters required!"),
    check("roles")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Role is required!")
        .isLength({ min: 1 })
        .bail()
        .withMessage("Minimum 1 character required!"),
];
