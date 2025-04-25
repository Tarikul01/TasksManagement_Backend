const TasksModel=require("../models/TasksModel");
const IotModel=require("../models/IotModel")


// Store or update current water level
exports.setWaterLevel = async (req, res) => {
    try {
      const { waterLevel } = req.body;
  
      const updatedData = await IotModel.findOneAndUpdate(
        {}, // match the single existing doc
        { waterLevel, updatedDate: new Date() },
        { upsert: true, new: true } // create if not exists
      );
  
      res.status(200).json({ message: "Water level updated", data: updatedData });
    } catch (err) {
      res.status(500).json({ message: "Error updating data", error: err.message });
    }
  };
  
  // Get current water level
  exports.getWaterLevel = async (req, res) => {
    try {
      const data = await IotModel.findOne();
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ message: "Error fetching data", error: err.message });
    }
  };



exports.createTask=(req,res)=>{
    let reqBody=req.body;
    reqBody.email=req.headers['email'];
    console.log(req.headers['email'])
    TasksModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({"status":"fail",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

// DeleteTask 
exports.deleteTasks=(req,res)=>{
    let id=req.params.id;
    let Query={_id:id};
    TasksModel.remove(Query,(err,data)=>{
        if(err){
            res.status(400).json({status:'fail',data:err})
        }else{
            res.status(200).json({status:'success',data:data})
        }
    })

}


exports.updateTaskStatus=(req,res)=>{
    let id=req.params.id;
    let status=req.params.status;
    let Query={_id:id};
    let reqBody={status:status};
    console.log("update")
    TasksModel.updateOne(Query,reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:'fail',data:err})
        }else{
            res.status(200).json({status:'success',data:data})
        }
    })
}

// List Task by Status 
exports.listTaskByStatus=(req,res)=>{
    let status=req.params.status;
    let email=req.headers['email'];

    TasksModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{
            _id:1,title:1,description:1,status:1,
            createDate:{
                $dateToString:{
                    date:"$createdDate",
                    format:"%d-%m-%Y"
                }
            }
        }}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}


exports.taskStatusCount=(req,res)=>{
    let email=req.headers['email'];
    TasksModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",sum:{$count:{}}}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:'fail',data:err})
        }else{
            res.status(200).json({status:'success',data:data})
        }
    })
}