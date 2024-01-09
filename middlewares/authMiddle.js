const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth, isSTudent, isAdmin

exports.auth = (req, res, next) => {
  try {
    // Extract JWT token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(req.user);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token ⚠️",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error Occurred in Authentication ⚠️",
    });
  }
};
// exports.isStudent = (req,res,next)=>{
//     try {
//         console.log(req.user)
//         if(req.user.role !=="Student"){
//             return res.status(401).json({
//                 success:false,
//                 message: "You are not authorized Student⚠️"
//             })
//         }

//         next()
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message: "Something error occured⚠️: "+error
//         })
//     }
// }

// exports.isAdmin = (req,res,next)=>{
//     try {
//         if(req.user.role !=="Admin"){
//             return res.status(401).json({
//                 success:false,
//                 message: "You are not authorized Admin⚠️"
//             })
//         }

//         next()
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message: "Something error occured⚠️: "+error
//         })
//     }
// }
