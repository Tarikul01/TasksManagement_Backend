var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const SendEmailUtility=async (EmailTo,EmailText,EmailSubject)=>{
   var transporter = await nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'tarikul.cse5.bu@gmail.com',
    pass: "zjkutuccnxwtirat"
  }
}));

var mailOptions = {
  from: 'tarikul.cse5.bu@gmail.com',
  to: EmailTo,
  subject: EmailSubject,
  text: EmailText,
};

return await transporter.sendMail(mailOptions);   
}
module.exports=SendEmailUtility;
