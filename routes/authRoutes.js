const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/authController");
const User = require("../models/userModel");

const router = express.Router();

router.get("/login",authController.getLogin);

router.get("/signup",authController.getSignUp);
/*
router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject("email already exists");
                    }
                });
            })
            .normalizeEmail(),
        body("password").trim().isLength({ min: 5 }),
        body("name").trim().not().isEmpty(),
    ],
    authController.signup
);

router.post("/login", authController.login);
*/
module.exports = router;
