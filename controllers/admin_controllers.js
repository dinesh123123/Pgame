// import  database and modules
const conn =require("../dbConnection");


// create trade post api
const Question =async(req,res)=>{
  const category=req.body.category;
  const question=req.body.question;
   const optiona=req.body.optiona;
   const optionb=req.body.optionb;
    const optionc=req.body.optionc;
     const optiond=req.body.optiond;
      const correct_answer=req.body.correct_answer;
       const expire_date=req.body.expire_date;
         var sql = "INSERT INTO `question_table`(`category`,`question`,`optiona`,`optionb`,`optionc`,`optiond`,`correct_answer`,`expire_date`,`image`)  VALUES('" + category + "','" + question + "','" + optiona + "','" + optionb + "','" + optionc + "','" + optiond + "','" + correct_answer + "','" + expire_date + "','" + req.file.filename + "')";
          var query =await conn.query(sql, function(err, result) {
            if(err) throw err;
               res.status(200).json({
                 "result":true,
                  "message":"add secussfully",
                  data:{
                    id:result.insertId,
                    question,
                    optiona
                  }
                 
           });
       });
};


// create get all questions api
const AllQuestion=async(req,res)=>{
  let sql = "SELECT * FROM question_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).json({
                 "result":true,
                   "message":"all data",
                   "path": "http://103.104.74.215:3055/uploads/",
                      "data": results
                    });
                 })


};

// create update question api
const QuestionUpdate=async(req,res)=>{
  const category=req.body.category;
  const question=req.body.question;
   const optiona=req.body.optiona;
   const optionb=req.body.optionb;
    const optionc=req.body.optionc;
     const optiond=req.body.optiond;
      const correct_answer=req.body.correct_answer;
       const expire_date=req.body.expire_date;

    let sql = "UPDATE question_table SET category='"+category+"',question='"+question+"',image='"+req.file.filename+"',optiona='"+optiona+"',optionb='"+optionb+"',optionc='"+optionc+"',optiond='"+optiond+"',correct_answer='"+expire_date+"',expire_date='"+expire_date+"' WHERE question_id="+req.params.question_id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).json({
      "result":true,
       "message":"Update sucessfully",
      
      });
  });

  };



// create question delete api
   const QuestionDelete=(req, res) => {
  let sql = "DELETE FROM question_table WHERE question_id="+req.params.question_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).json({
      "result":true,
       "message":"deleted sucessfully",
      
      });
  });
};

// create banner post api 
   const Banner=(req,res)=>{       
   const file = req.file;
   const name=req.body.name;
   const title=req.body.title;
   const date=req.body.date;
   if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' });
   }else{
   if(!name || !title)
    return res.status(400).json({
      result:false,
      message:"required parameters are title,name,image"
    });
       else{
           var sql="SELECT name FROM banner_table WHERE name =?";
           let query = conn.query(sql,[name],(err, results) => {
              if (err) throw err;
                if(results[0])
                  return res.status(200).json({
                    "result":false,
                    message:"data allready exixt"
               });
                 else{
var sql = "INSERT INTO `banner_table`(`name`,`title`,`image`,`date`) VALUES('" + name + "','" + title + "','" + req.file.filename + "','" + date + "')";
var query = conn.query(sql, function(err, result) {
                    if(err) throw err;
                      res.status(200).json({
                        "result":true,
                         "message":"add secussfully", 
                
                       });
                    });
  
                 }
              })
            }
          }
            };



  // create get all banner list data api
  const BannerList=(req,res)=>{
    let sql = "SELECT * FROM banner_table";
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).json({
                 "result":true,
                   "message":"all data",
                   "path": "http://103.104.74.215:3055/uploads/",
                      "data": results
                    });
                 })

  };                    


// create update banner api
  const BannerUpdate=(req,res)=>{
    const name=req.body.name;
    let sql = "UPDATE banner_table SET name='"+name+"',title='"+req.body.title+"',image='"+req.file.filename+"',date='"+req.body.date+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).json({
      "result":true,
       "message":"Update sucessfully",
      
      });
  });

  };


// create delete banner api
 const BannerDelete=(req, res) => {
  let sql = "DELETE FROM banner_table WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).json({
      "result":true,
       "message":"deleted sucessfully",
      
      });
  });
};


// create how to trade api 
const HowToTrade=async(req,res)=>{
  const data = {title,text}=req.body;
   if(!title || !text)
    return res.status(400).json({
      result:false,
      message:"required parameters are title,text"
    });
       else{
           var sql="SELECT title FROM howto_trade_table WHERE title =?";
           let query = conn.query(sql,[title],(err, results) => {
              if (err) throw err;
                if(results[0])
                  return res.status(200).json({
                    "result":false,
                    message:"title allready exixt"
               });
                 else{
                    const sql = "INSERT INTO howto_trade_table SET ?";
                    const query = conn.query(sql, data,(err, results) => {
                    if(err) throw err;
                      res.status(200).json({
                        "result":true,
                         "message":"add secussfully", 
                         "data": {
                          id:results.insertId,
                          text,title 
                        }
                    });
                 });
  
             }
       })
    }
};

//create how to trade list api
const HowToTradeList=async(req,res)=>{
let sql = "SELECT * FROM howto_trade_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).json({
                 "result":true,
                   "message":"all data",
                      "data": results
                    });
           })

};


// create  update api
const HowToTradeUpdate=async(req,res)=>{

const title=req.body.name;
const text=req.body.text;
    let sql = "UPDATE howto_trade_table SET title='"+title+"',text='"+text+"'WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).json({
      "result":true,
       "message":"Update sucessfully",
      
      });
  });

};

// create delete api
const HowToTradeDelete=async(req,res)=>{

 let sql = "DELETE FROM howto_trade_table WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).json({
      "result":true,
       "message":"deleted sucessfully",
      
      });
  });

};



// create privacy policy api 
const Privacy=async (req,res)=>{
 const data = {title,text}=req.body;
   if(!title || !text)
    return res.status(400).json({
      result:false,
      message:"required parameters are title,text"
    });
       else{
           var sql="SELECT title FROM privacy_policy_table WHERE title =?";
           let query = conn.query(sql,[title],(err, results) => {
              if (err) throw err;
                if(results[0])
                  return res.status(200).json({
                    "result":false,
                    message:"title allready exixt"
               });
                 else{
                    const sql = "INSERT INTO privacy_policy_table SET ?";
                    const query = conn.query(sql, data,(err, results) => {
                    if(err) throw err;
                      res.status(200).json({
                        "result":true,
                         "message":"add secussfully", 
                         "data": {
                          id:results.insertId,
                          text,title 
                        }
                    });
                 });
  
             }
       })
    }
};



//create privacy policy list api
const PrivacyList=async(req,res)=>{
let sql = "SELECT * FROM privacy_policy_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).json({
                 "result":true,
                   "message":"all data",
                      "data": results
                    });
           })

};


// create  update privacy policy  api
const PrivacyUpdate=async(req,res)=>{
const title=req.body.title;
const text=req.body.text;
    let sql = "UPDATE privacy_policy_table  SET title='"+title+"',text='"+text+"'WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).json({
      "result":true,
       "message":"Update sucessfully",
      
      });
  });

};

// create delete privacy policy api
const PrivacyDelete=async(req,res)=>{

 let sql = "DELETE FROM privacy_policy_table  WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).json({
      "result":true,
       "message":"deleted sucessfully",
      
      });
  });

};




// create privacy policy api 
const TermsAndCondition=async (req,res)=>{
 const data = {title,text}=req.body;
   if(!title || !text)
    return res.status(400).json({
      result:false,
      message:"required parameters are title,text"
    });
       else{
           var sql="SELECT title FROM terms_and_condition_table WHERE title =?";
           let query = conn.query(sql,[title],(err, results) => {
              if (err) throw err;
                if(results[0])
                  return res.status(200).json({
                    "result":false,
                    message:"title allready exixt"
               });
                 else{
                    const sql = "INSERT INTO terms_and_condition_table SET ?";
                    const query = conn.query(sql, data,(err, results) => {
                    if(err) throw err;
                      res.status(200).json({
                        "result":true,
                         "message":"add secussfully", 
                         "data": {
                          id:results.insertId,
                          text,title 
                        }
                    });
                 });
  
             }
       })
    }
};



//create privacy policy list api
const TermsAndConditionList=async(req,res)=>{
let sql = "SELECT * FROM terms_and_condition_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).json({
                 "result":true,
                   "message":"all data",
                      "data": results
                    });
           })

};


// create  update privacy policy  api
const TermsAndConditionUpdate=async(req,res)=>{
const title=req.body.title;
const text=req.body.text;
    let sql = "UPDATE terms_and_condition_table  SET title='"+title+"',text='"+text+"'WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).json({
      "result":true,
       "message":"Update sucessfully",
      
      });
  });

};

// create delete privacy policy api
const TermsAndConditionDelete=async(req,res)=>{

 let sql = "DELETE FROM terms_and_condition_table WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).json({
      "result":true,
       "message":"deleted sucessfully",
      
      });
  });

};




module.exports={
 Question,
 AllQuestion,
 QuestionUpdate,
 QuestionDelete,
 Banner,
 BannerList,
 BannerUpdate,
 BannerDelete,
 HowToTrade,
 HowToTradeList,
 HowToTradeUpdate,
 HowToTradeDelete,
 Privacy,
 PrivacyList,
 PrivacyUpdate,
 PrivacyDelete,
 TermsAndCondition,
 TermsAndConditionList,
 TermsAndConditionUpdate,
 TermsAndConditionDelete
 
}