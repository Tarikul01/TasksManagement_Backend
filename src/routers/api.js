const express = require("express");
const router = express.Router();
const userController=require("../controllers/usersController");
const taskController=require("../controllers/tasksController")
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const { createContact } = require("../controllers/contact");

// User Actions Routes 

router.post('/water-level', taskController.setWaterLevel);  // ESP32 sends update
router.get('/water-level', taskController.getWaterLevel);   // Browser gets current level

router.post("/registration",userController.registration);
router.post("/login",userController.login)
router.post("/profileUpdate",AuthVerifyMiddleware,userController.profileUpdate)
router.get("/profileDetails",AuthVerifyMiddleware,userController.profileDetails)
router.get("/recoverVerifyEmail/:email",userController.recoverVerifyEmail)
router.get("/recoverVerifyOTP/:email/:otp",userController.recoverVerifyOTP)

router.post("/recoveryResetPassword",userController.RecoveryResetPassword)

// TaskAction Routes 
router.post("/createTask",AuthVerifyMiddleware,taskController.createTask)
router.get("/deleteTask/:id",AuthVerifyMiddleware,taskController.deleteTasks)


router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,taskController.updateTaskStatus)


router.get("/listTaskByStatus/:status",AuthVerifyMiddleware,taskController.listTaskByStatus)
router.get("/taskStatusCount",AuthVerifyMiddleware,taskController.taskStatusCount)

router.post("/contact",createContact)







module.exports = router;
