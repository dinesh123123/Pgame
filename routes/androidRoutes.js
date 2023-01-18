// import module here
const express =require("express");
const router=express();
const multer=require("multer");

// import android controllers file
const androidControllers =require("../controllers/androidControllers");

// create file storage
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },

});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    }

   },
   limits:{

    filesize:10000000000 //1000000 bytes=1MB
   }
});



// setup android controllers url file
 router.get('/questions',androidControllers.AllQuestion);  
 router.get('/tradeList',androidControllers.Trade); 
 router.get('/privacyList',androidControllers.PrivacyList); 
 router.get('/termList',androidControllers.TermList); 
 router.get('/bannerList',androidControllers.BannerList);
 router.post('/signup',androidControllers.UserSignup); 
 router.post('/verifyotp',androidControllers.Verifyotp);
 router.post('/logout',androidControllers.Logout);
 router.post('/resendotp',androidControllers.ResendOtp);
 router.post('/profile',upload.single('image'),androidControllers.userProfile);
 router.post('/details',androidControllers.UserDetails);

 module.exports=router;

