var jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token = req.headers["token"];
  // console.log(token);
  jwt.verify(token, "SecretKey123456789", (err, decoded) => {
    // console.log("authdecode", decoded, "AuthErr", err);
    if (err) {
      // console.log(token);
      res.status(401).json({ status: "unauthorized" });
    } else {
      // console.log("decode/n/n/n",decoded.data);
      let email = decoded.data;
      req.headers.email = email;
      next();
    }
  });
  // const data=await jwt.verify(token,"SecretKey123456789");
  // if(data){
  //     console.log(data.data)
  //     let email = data.data[0].email
  //       req.headers.email = email;
  //       next();

  // }else{
  //     console.log("err")
  //     res.status(401).json({ status: "unauthorized" });

  // }
};
