const { check} = require("express-validator");
const UserController = require('../controllers/UserController');

//Register middleware
exports.registerValidation = [
    check("name").isLength({ min: 5, max: 25 })
        .withMessage('name must be at least 5 chars long'),

    check("phoneNumber")
        .matches(/^[6789]\d{9}$/)
        .isLength({ min: 10 })
        .withMessage("Enter the valid Contact number"),

    check("email")
        .isEmail()
        .matches(/[\w\.-]+@[\w\.-]+\.\w+/)
        .withMessage("It's Not Email format"),

    check("password")
        .isLength({ min: 6 })
        .withMessage("must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number"),
    UserController.register
];
