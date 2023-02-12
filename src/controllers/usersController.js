const UserModel=require("../models/UserModel");
const jwt=require("jsonwebtoken");

// Registration 
exports.registration=(req,res)=>{
    let reqBody=req.body;
    UserModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err});

        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.profileUpdate=(req,res)=>{
    let reqBody=req.body;
    let email=req.headers['email'];
    console.log("Eamil controller",email)
    UserModel.updateOne({email:email},reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err});

        }else{
            res.status(200).json({status:"success",data:data})
        }

    })


}

// Login 
exports.login=(req,res)=>{
    let reqBody=req.body;
    UserModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }else{
            if(data.length>0){
                let Payload={exp:Math.floor(Date.now()/1000)*(24*60*60),data:data};
                let token=jwt.sign(Payload,"SecretKey123456789");
                res.status(200).json({status:"success",token:token,data:data[0]['email']})
            }else{
                res.status(400).json({status:"unauthorized"});
            }
        }
    })
}