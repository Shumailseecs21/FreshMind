const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

const User = require("../models/userModel");

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        oldInput: {
            email: '',
            password: ''
        },
        validationErrors: []
    });
};



exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(
            "Validation failed, entered data is incorrect."
        );
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name,
            });
            return user.save();
        })
        .then(user => {
            res.status(201).json({ message: "user created", userId: user._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error("email does not exist");
                error.statusCode = 401;
                throw error;
            }
            loadedUser=user;
            return bcrypt.compare(password,user.password)
        })
        .then(isEqual=>{
            if(!isEqual){
                const error = new Error("wrong password");
                error.statusCode = 401;
                throw error;
            }
            const token= jwt.sign({
                    email:loadedUser.email,
                    userId:loadedUser._id.toString(),
                },
                "somesupersecret",
                {expiresIn:"1h"}
            );
            res.status(200).json({
                token:token,
                userId:loadedUser._id.toString(),
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
