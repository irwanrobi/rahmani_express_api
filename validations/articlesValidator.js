const { check, body } = require('express-validator');

const validateArticle = [
    check("title")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Title is required!")
        .isLength({ min: 5 })
        .bail()
        .withMessage("Minimum 5 characters required!"),
    check("content")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Content is required!")
        .isLength({ min: 100 })
        .bail()
        .withMessage("Minimum 100 characters required!"),
    check("summary")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Summary is required!")
        .isLength({ min: 10 })
        .bail()
        .withMessage("Minimum 10 characters required!"),
    check("author")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Author is required!")
        .isLength({ min: 5 })
        .bail()
        .withMessage("Minimum 5 characters required!"),
    check("tags")
        .not()
        .isEmpty()
        .bail()
        .withMessage("Tags is required!"),
    // check("featuredImage")
    //     .not()
    //     .isEmpty()
    //     .bail()
    //     .withMessage("Featured Image is required!"),
]

module.exports = { validateArticle };