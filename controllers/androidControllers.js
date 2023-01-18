// import  database and modules
const conn =require("../dbConnection");


// create questions list  api  for android side
const AllQuestion=async(req,res)=>{
  let sql = "SELECT * FROM question_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                   "path": "http://103.104.74.215:3055/uploads/",
                      "data":results
                 });
                  }else{
                      res.status(400).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
     })
};



 // create  banner list  api for android side
  const BannerList=(req,res)=>{
    let sql = "SELECT * FROM banner_table";
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
               if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                   "path": "http://103.104.74.215:3055/uploads/",
                      "data":results
                 });
                  }else{
                      res.status(400).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
     })

  };                    



// create trade list api for andorid side
  const Trade =async(req,res)=>{
    let sql = "SELECT * FROM howto_trade_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
            if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                      "data": results
                    });
               }else{
                      res.status(400).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
      })

  };



//create privacy policy list api android list
const PrivacyList=async(req,res)=>{
let sql = "SELECT * FROM privacy_policy_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                      "data": results
                    });
               }else{
                      res.status(400).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
      })

  };



//create term and condiction list api android list
const TermList=async(req,res)=>{
let sql = "SELECT * FROM terms_and_condition_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                      "data": results
                    });
               }else{
                      res.status(400).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
      })

  };




// create user signup with mobile otp api
const UserSignup=async(req,res)=>{
const phone=req.body.phone;
const fcm_id=req.body.fcm_id;
       if(!phone || !fcm_id){
         res.status(400).json({
        "result":"false",
        "message":"required parameters are phone and fcm_id", 
    });
}
  else{
      var sql="SELECT * FROM user_table WHERE phone =?";
      let query = conn.query(sql,[phone],(err,results ) => {
     if (err) throw err; 

  var otp = Math.floor(1000 + Math.random() * 9000);
  let sql = "UPDATE user_table SET otp='"+otp+"' WHERE phone="+req.body.phone;
  let query = conn.query(sql, (err, result) => {
         if(err) throw err;
  var sql="SELECT * FROM user_table WHERE phone =?";
  let query = conn.query(sql,[phone],(err, data) => {
        if (err) throw err;
         if(data.length>0){
          res.status(200).json({
          "result":"true",
          "message":"User allready register sucessfully",
          data
      });
  
       }else{
          var otp = Math.floor(1000 + Math.random() * 9000);
          var sql = "INSERT INTO `user_table`(`phone`,`fcm_id`,`otp`) VALUES('" + phone+ "','" + fcm_id + "','" + otp + "')";
          const query = conn.query(sql,(err, data) => {
          if(err) throw err;
          res.status(200).json({
              "result":"true",
              "message":"user signup secussfully",
               "data":[{
                id:data.insertId,
                phone,fcm_id,otp
               }]
         });
       });
     }
   })
  })
})
  }
 };




// create otp verify api
 const Verifyotp=async(req,res)=>{
  const phone=req.body.phone;
  const otp=req.body.otp;
  if(otp & phone){   
  var sql="SELECT * FROM user_table WHERE phone='"+phone+"' AND otp='"+otp+"' ";
           let query = conn.query(sql,(err, data) => {
              if (err) throw err;
                if(data.length>0){
                res.status(200).json({
                  "result":"true",
                  "message":"user login secussfully",
                    data 
            }) 
              }else{
                return res.status(400).json({
                  "result":"false",
                  "message":"otp was worng",
                 
            });
       }          
 })
   }else{
    res.status(400).json({
        "result":"false",
        "message":"required parameters are phone and otp", 
      });
   }
};



// create user logout api
const Logout=async(req,res)=>{
  const {id,fcm_id}=req.body;
  if(id){ 
      var sql="SELECT * FROM user_table WHERE id =?";
      let query = conn.query(sql,[id],(err, results) =>{
       if (err) throw err;
         
          var sql = "UPDATE user_table SET fcm_id='"+fcm_id+"' WHERE id="+req.body.id;
          let query = conn.query(sql, (err, results) => {
             if(err) throw err;

      var sql="SELECT * FROM user_table WHERE id =?";
      let query = conn.query(sql,[id],(err, data) =>{
       if (err) throw err;
         if(data.length>0)
            res.status(200).json({
             "result":"true",
             "message":"user Logout sucessfully",
              data  
         });
      });
    });
  })
}else{
      res.status(400).json({
      "result":"false",
      "message":"required parameters are id and send fcm_id null", 
    });   
  }
};


// create resend otp api 
const ResendOtp=async(req,res)=>{
  const{phone,fcm_id}=req.body;
   if(fcm_id & phone){ 
  var sql="SELECT * FROM user_table WHERE phone =?";
  let query = conn.query(sql,[phone],(err, results) => {
              if (err) throw err;
                          
    var otp = Math.floor(1000 + Math.random() * 9000);
    let sql = "UPDATE user_table SET otp='"+otp+"' WHERE phone="+req.body.phone;
    let query = conn.query(sql, (err, result) => {
        if(err) throw err;
  var sql="SELECT * FROM user_table WHERE phone =?";
  let query = conn.query(sql,[phone],(err, data) => {
          if(data.length>0){
         return  res.status(200).json({
         "result":"true",
         "message":"otp sent sucessfully",
          data
       });
      }
    });
   })
 })
}
      else{
        res.status(400).json({
        "result":"false",
        "message":"required parameters are phone and fcm_id", 
      });
   }
};



// create user profile update api
const userProfile=async(req,res)=>{
  const{id}=req.body;
  const image=req.file.filename;
  var sql="SELECT * FROM user_table WHERE id =?";
  let query = conn.query(sql,[id],(err, results) => {
              if (err) throw err;
                        
    let sql = "UPDATE user_table SET image='"+req.file.filename+"' WHERE id="+req.body.id;
   let query = conn.query(sql, (err, results) =>{
      if(err) throw err;

  var sql="SELECT * FROM user_table WHERE id =?";
  let query = conn.query(sql,[id],(err, data) => {
              if (err) throw err;
              if(data.length>0){   
      return  res.status(200).json({
       "result":"true",
       "message":"image inserted sucessfully",
        data
         });
       }
     });
    })
  })
};



//create user detail update api
const UserDetails=async(req,res)=>{
  const{id,name,email,state,dob,phone}=req.body;
  var sql="SELECT * FROM user_table WHERE id =?";
  let query = conn.query(sql,[id],(err, results) => {
              if (err) throw err;

                         
    let sql = "UPDATE user_table SET name='"+name+"',email='"+email+"',state='"+state+"',dob='"+dob+"',phone='"+phone+"' WHERE id="+req.body.id;
   let query = conn.query(sql, (err, results) => {
      if(err) throw err;

  var sql="SELECT * FROM user_table WHERE id =?";
  let query = conn.query(sql,[id],(err, data) => {
              if (err) throw err;
                if(data){  
       return  res.status(200).json({
       "result":true,
       "message":"data inserted sucessfully",
       data
      });
     };
   });
  });
 });
};



module.exports={
 AllQuestion,
 BannerList,
 Trade,
 PrivacyList,
 TermList,
 UserSignup,
 Verifyotp,
 Logout,
 ResendOtp,
 userProfile,
 UserDetails
 
};