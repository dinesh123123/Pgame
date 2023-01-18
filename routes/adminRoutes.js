// import module here
const express =require("express");
const router=express();
const multer=require("multer");

// import admin controllers file
const adminControllers =require("../controllers/admin_controllers");


// file storage
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



// setup admin controllers url file
 router.post('/create/questions',upload.single('image'),adminControllers.Question);  
 router.get('/get/questions',adminControllers.AllQuestion); 
 router.post('/update/questions/:question_id',upload.single('image'),adminControllers.QuestionUpdate);   
 router.get('/delete/questions/:question_id',adminControllers. QuestionDelete);
 router.post('/create/banner',upload.single('image'),adminControllers.Banner);  
 router.get('/get/bannerList',adminControllers.BannerList);
 router.post('/update/banner/:id',upload.single('image'),adminControllers.BannerUpdate);
 router.get('/delete/banner/:id',adminControllers.BannerDelete);   
 router.post('/create/trade',adminControllers.HowToTrade);  
 router.get('/get/tradeList',adminControllers.HowToTradeList);
 router.post('/update/trade/:id',adminControllers.HowToTradeUpdate);
 router.get('/delete/trade/:id',adminControllers.HowToTradeDelete);
 router.post('/create/privacy',adminControllers.Privacy);  
 router.get('/get/privacyList',adminControllers.PrivacyList);
 router.post('/update/privacy/:id',adminControllers.PrivacyUpdate);
 router.get('/delete/privacy/:id',adminControllers.PrivacyDelete);   
 router.post('/create/term',adminControllers.TermsAndCondition);  
 router.get('/get/term',adminControllers.TermsAndConditionList);
 router.post('/update/term/:id',adminControllers.TermsAndConditionUpdate);
 router.get('/delete/term/:id',adminControllers.TermsAndConditionDelete);   
   

module.exports=router;

