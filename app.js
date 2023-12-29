const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const flash=require("connect-flash");
const csrf=require("csurf");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const {DB_URI}=require("./db");
const authRoutes=require("./routes/authRoutes");

const app=express();

//session management and storing session data
const store = new MongoDBStore({
    uri: DB_URI,
    collection: "sessions",
});


// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");//any website * wildcard is used
//     res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, PATCH, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");//any website * wildcard is used
//     next();
// });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

const csrfProtection=csrf();
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

app.use("/auth",authRoutes);

mongoose
    .connect(DB_URI)
    .then((result) => {
        console.log("Connected successfully");
        app.listen(8080);
    })
    .catch((err) => {
    console.log(err);
});
