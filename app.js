const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");//any website * wildcard is used
    res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");//any website * wildcard is used
    next();
});

app.use(function(req,res,next){
    res.send("<h1>hello project</h1>");
});

mongoose
    .connect(
    "mongodb+srv://shumail:milo2002@cluster0.n7mu9qa.mongodb.net/"
)
    .then((result) => {
        console.log("Connected successfully");
        app.listen(8080);
    })
    .catch((err) => {
    console.log(err);
});
