// import dependancies in pgame.js fiel
const express=require("express");
const pgame=express();
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
// import routes
//const routeUser=require("./routes/userRoutes");
//const userProfiles=require("./routes/userProfile_Routes");
const adminFile=require("./routes/adminRoutes");
const android=require("./routes/androidRoutes");
// middlewere setup
pgame.set("view engine","ejs");
pgame.set("views", path.join(__dirname, "views"));
pgame.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
pgame.set(path.join(__dirname, '/uploads'));
pgame.engine('html', require('ejs').renderFile);
pgame.use(express.static(path.join(__dirname, 'public')));


//create middlewere
pgame.use(express.json());
pgame.use(cookieParser());
pgame.use(session({secret:'my fdgfghbshanky',saveUninitialized: true,resave: true}));
//body parser using
pgame.use(bodyParser.urlencoded({ extended:false }));
pgame.use(bodyParser.json());



// routes setup
//pgame.use("/api",routeUser);
//pgame.use("/api",userProfiles);
pgame.use("/",adminFile);
pgame.use("/api/user",android);



pgame.get("/",(req,res)=>{
        res.render('index.ejs')
})

// Handling Errors
pgame.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});



// connect to browser
const port = process.env.port ||3055;
pgame.listen(port, function(error){
        if(error){
                console.log(error)
        }else{
                console.log("The server is running at port 3055");
        }
});


module.exports =pgame;