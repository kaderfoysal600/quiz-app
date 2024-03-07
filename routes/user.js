const express = require("express");
const router = express.Router();
const multer = require("multer");
//Handlers from controllers
const { login, signup, sendotp, verifyOtp, editProfile , getProfileByEmail, saveProfileWithImage , countReferralCode} = require("../controllers/auth");
const { auth } = require("../middlewares/authMiddle");

router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyOtp", verifyOtp);
router.post("/sendotp", sendotp);


var storage = multer.diskStorage({
  // @ts-ignore
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // @ts-ignore
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
//testing protected route
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "You are a valid Tester 👨‍💻",
  });
});
//protected routes
// router.get('/student', auth, isStudent, (req,res)=>{
//     res.json({
//         success: true,
//         message: "You are a valid Student 🧑‍🎓"
//     })
// })

// router.get('/admin', auth, isAdmin, (req,res)=>{
//     res.json({
//         success: true,
//         message: "You are a valid Admin 😎"
//     })
// })
router.get('/getProfileByEmail', getProfileByEmail)

// router.put('/profile/edit', auth, editProfile);
router.put('/profile/edit', upload.single("photo"), saveProfileWithImage);


router.get("/referral/count", countReferralCode);
module.exports = router;
