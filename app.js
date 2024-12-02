const express = require("express");
const app = express();
const router = require("./src/routers/api");
const mongoose = require("mongoose");
const path = require("path")

//Security middleware import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

global.__basedir=__dirname;

//security middleware implement

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}))
app.use(express.static(path.join(__dirname, "uploads")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//Request rate-limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  // type: "SMTP",
  // host: "smtp.office365.com",
  // port: 587,
  // secure: false,            // SMTP port
  // service: "Outlook",
  // secure: false,             // Set to true if using port 465, false otherwise
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,           // SMTP password
  },
  tls: {
    ciphers: "SSLv3", // Adjust TLS options if needed
    rejectUnauthorized: false, // Allow connections from untrusted certificates (debug)
  },
});

// Verify the transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Error configuring transporter:", error);
  } else {
    console.log("Email transporter configured successfully");
  }
});
// Make transporter globally accessible
app.set("mailer", transporter);
// Database connections
const options = { user: "", pass: "", autoIndex: true };
const MONGO_URL = process.env.MONGO_URL||"mongodb://0.0.0.0:27017/task_management";
mongoose.connect(MONGO_URL, options, (err) => {
  if (!err) {
    console.log("DB connection success");
    console.log("--------------------------------------------------\n\n\n");
  } else {
    console.log("Db connection fails!",err);
  }
});




//Handling CORS
app.use((req, res, next) => {
  const devUrls = [
    'http://localhost:5000',
    'http://bholabarassociation.com'
  ]
  const prodUrls = [
    'http://localhost:5000',
    'http://bholabarassociation.com',
    'http://bholabarassociation.com:3000',
    'http://66.29.130.89',
    'http://66.29.130.89:3000'
  ]
  const allowedOrigins =
    process.env.NODE_ENV === 'DEV' ? devUrls
      : process.env.NODE_ENV === 'PROD' ? prodUrls
        : []
  
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
});



// Managing backend routing 
app.use("/api/v1", router); 

// Front End Taggin 
// app.use(express.static('client/build'));
// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  
// })

module.exports = app;
