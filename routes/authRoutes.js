const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/authController");
const User = require("../models/userModel");

const router = express.Router();

router.get("/login",authController.getLogin);

router.get("/signup",authController.getSignUp);

router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            // .withMessage("Please enter a valid email")
            // .custom(async (value, { req }) => {
            //     const userDoc= User.findOne({ email: value });
            //     console.log(userDoc);
            //     if (userDoc) {
            //         return Promise.reject("Email already exists");
            //     }
            // })
            .normalizeEmail(),
        body("password").trim().isLength({ min: 8 }),
        body("username").trim().not().isEmpty(),
    ],
    authController.signup
);

router.post("/login",[
    body("email")
        .isEmail()
        .normalizeEmail(),
    body("password").trim().isLength({ min: 8 })
    ], authController.login);

module.exports = router;

router.post('/logout', authController.logout);