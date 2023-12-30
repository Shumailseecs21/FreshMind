const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const flash=require("connect-flash");
const csrf=require("csurf");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path=require("path");
const multer=require("multer");

const {DB_URI}=require("./db");
const authRoutes=require("./routes/authRoutes");
const indexRoutes=require("./routes/indexRoutes");
const adminRoutes=require("./routes/adminRoutes");
const memberRoutes=require("./routes/memberRoutes");
const doctorRoutes=require("./routes/doctorRoutes");
const errorController=require("./controllers/errorController");
const User=require("./models/userModel");

const app=express();

//session management and storing session data

const store = new MongoDBStore({
    uri: DB_URI,
    collection: "sessions",
});

const csrfProtection=csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "certificates");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-')+ "_" +file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf' ||                    // PDF files
        file.mimetype === 'application/msword' ||                 // DOC files
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX files
    ) {
        cb(null, true);
    } else {
        cb(null,false);
    }
};

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
    multer({storage:fileStorage,fileFilter:fileFilter}).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname, "images")));



app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(async (req, res, next) =>{
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
        return next();
    }
    try {
        const sessionUser = await User.findById(req.session.user._id);
        if (!sessionUser) {
            return next();
        }
        req.user = sessionUser;
        next();

    }
    catch(err){
        res.render("404");
    }
});

app.use("/auth",authRoutes);
app.use("/admin",adminRoutes);
app.use("/member",memberRoutes);
app.use("/doctor",doctorRoutes);
app.use(indexRoutes);

// app.use((error, req, res, next) => {
//     res.redirect("/auth/signup");
//
// });

app.use("/errors/404",errorController.get404);
app.get("/errors/500",errorController.get500);

mongoose
    .connect(DB_URI)
    .then((result) => {
        console.log("Connected successfully");
        app.listen(8080);
    })
    .catch((err) => {
    console.log(err);
});
