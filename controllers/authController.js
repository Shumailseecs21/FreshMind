const { validationResult } = require("express-validator");
const { MongoClient,ObjectId } = require('mongodb');
const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login',{
        errorMessage:message
    });
};

exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup',{
        errorMessage:message
    });
};

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const role=req.body.role;
    const filename=req.body.filenameinput;
    if(req.file){
        console.log(req.file);
    }
    if (!req.file) {
        return res.status(422).render('auth/signup', {
            errorMessage: 'Please upload a certification file.',
            validationErrors: []
        });
    }
    const doc = req.file;
    const path = doc.path.replace("\\" ,"/");

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                username: username,
                role:role,
                certifications: {
                    name: filename,
                    path:path
                }
            });
            return user.save();
        })
        .then(user => {
            res.status(201).redirect("/auth/login");
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const role=req.body.role;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    try {
    const user=await User.findOne({ email: email });
        if (!user) {
            return res.status(422).render('auth/login',{
                errorMessage: 'Invalid email or password.',
                validationErrors: []
            });
        }else if(user && user.role!==role){
            return res.status(422).render('auth/login',{
                errorMessage: 'Invalid credentials',
                validationErrors: []
            });
        }
        try{
            const doMatch=await bcrypt.compare(password, user.password);
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                await req.session.save();
                return res.redirect("/"+role.toLowerCase()+'/dashboard');
            }
            return res.status(422).render('auth/login', {
                errorMessage: 'Invalid email or password.',
                validationErrors: []
            });
        }catch(err){
                console.log(err);
                res.redirect('/login');
            }
    }
    catch(err){
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.logout = async (req, res, next) => {

        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/');
        });
};