const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const primaryCategory = require("../models/primaryCategory");
const Category = require("../models/catModels");
const Profile = require("../models/profile");
const multer = require("multer");
const TodaysUpdate = require("../models/TodaysUpdate");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();
//signup handle

exports.signup = async (req, res) => {
  try {
    //get input data
    const { name, email, password, phoneNo, referCode } = req.body;

    // Check if All Details are there or not
    if (!email || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    //check if use already exists?
    const existingUser = await user.findOne({ email });
    const existingOtp = await OTP.findOne({ email });
    if (existingUser && existingUser?.verified) {
      console.log("existingOtp", existingOtp);
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing pasword error for ${password}: ` + error.message,
      });
    } // Generate 6-digit UIID
    const uiId = generateUIID();

    const User = await user.create({
      name,
      email,
      phoneNo,
      referCode,
      password: hashedPassword,
      uiId, // Include generated UIID
    });

    // Create profile
    const newProfile = new Profile({
      userEmail: email,
      userName: name,
      uiId: uiId,
    });

    await newProfile.save();

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    return res.status(200).json({
      success: true,
      User,
      otp: otp,
      message: "user created successfully ✅",
      verified: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};

// Function to generate 6-digit UIID
function generateUIID() {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

// exports.login = async (req, res) => {
//   try {
//     //data fetch
//     const { email, password } = req.body;
//     //validation on email and password
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Plz fill all the details carefully",
//       });
//     }

//     //check for registered User
//     let User = await user.findOne({ email });
//     //if user not registered or not found in database
//     if (!User) {
//       return res.status(401).json({
//         success: false,
//         message: "You have to Signup First",
//       });
//     }

//     // Find the primary category associated with the user's email
//     let pCategory = await primaryCategory.findOne({ email });
//     let pId = pCategory?.primary_category_id
//     let primaryCategoryName1 = await Category.findById(pId);
//     const primaryCategoryName = primaryCategoryName1?.name;
//     const payload = {
//       email: User.email,
//       id: User._id,
//     };

//     //verify password and generate a JWt token 🔎
//     if (await bcrypt.compare(password, User.password)) {
//       //if password matched
//       //now lets create a JWT token
//       let token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "360h",
//       });
//       User = User.toObject();
//       User.token = token;

//       User.password = undefined;
//       const options = {
//         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//         httpOnly: true, //It will make cookie not accessible on clinet side -> good way to keep hackers away
//       };

//       res.cookie("token", token, options).status(200).json({
//         success: true,
//         token,
//         User,
//         primaryCategoryName,
//         message: "Logged in Successfully✅",
//       });
//     } else {
//       //password donot matched
//       return res.status(403).json({
//         success: false,
//         message: "Password incorrects⚠️",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Login failure⚠️ :" + error,
//     });
//   }
// };

// Send OTP For Email Verification

// exports.login = async (req, res) => {
//   try {
//     // data fetch
//     const { email, password } = req.body;

//     // validation on email and password
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill in all the details carefully",
//       });
//     }

//     // check for registered User
//     let User = await user.findOne({ email });

//     // if user not registered or not found in the database
//     if (!User) {
//       return res.status(401).json({
//         success: false,
//         message: "You have to signup first",
//       });
//     }

//     // Find the primary category associated with the user's email
//     let pCategory = await primaryCategory.findOne({ email });

//     const payload = {
//       email: user.email,
//       id: user._id,
//     };

//     // verify password and generate a JWT token
//     if (await bcrypt.compare(password, user.password)) {
//       // if password matched
//       // now let's create a JWT token
//       let token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "2h",
//       });

//       user = user.toObject();
//       user.token = token;
//       user.password = undefined;

//       const options = {
//         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//       };

//       res.cookie("token", token, options).status(200).json({
//         success: true,
//         token,
//         user,
//         primaryCategory, // Include the primaryCategory in the response
//         message: "Logged in successfully",
//       });
//     } else {
//       // password doesn't match
//       return res.status(403).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Login failure: " + error,
//     });
//   }
// };

exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    //check for registered User
    let User = await user.findOne({ email });
    //if user not registered or not found in database
    if (!User) {
      return res.status(401).json({
        success: false,
        message: "You have to Signup First",
      });
    }

    // Find the primary category associated with the user's email
    let pCategory = await primaryCategory.findOne({ email });

    let primaryCategoryName = ""; // Initialize as an empty string

    if (pCategory) {
      let pId = pCategory.primary_category_id;
      let primaryCategoryName1 = await Category.findById(pId);
      primaryCategoryName = primaryCategoryName1
        ? primaryCategoryName1.name
        : "";
    }

    const payload = {
      email: User.email,
      id: User._id,
    };

    //verify password and generate a JWt token 🔎
    if (await bcrypt.compare(password, User.password)) {
      //if password matched
      //now let's create a JWT token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "360h",
      });
      User = User.toObject();
      User.token = token;

      User.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true, //It will make cookie not accessible on client side -> a good way to keep hackers away
      };



      const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

      let existingUpdate = await TodaysUpdate.findOne({ userEmail: email, date: today });

      if (!existingUpdate) {
        const todaysUpdate = new TodaysUpdate({
          userEmail: email,
          date: today,
          totalPlayingQuiz: 0,
          totalTime: 0,
          totalQuiz: 0,
          totalCorrectAnswers: 0,
          totalWrongAnswers:0,
          points: 0,
        });

        await todaysUpdate.save();
      }

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        User,
        primaryCategoryName,
        message: "Logged in Successfully✅",
      });
    } else {
      //password don't match
      return res.status(403).json({
        success: false,
        message: "Password incorrect⚠️",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failure⚠️ :" + error,
    });
  }
};

// exports.createProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you have user information in the request after authentication
//     const { bio, profilePicture } = req.body; // Additional profile details

//     // Check if user exists
//     const existingUser = await user.findById(userId);
//     if (!existingUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     // Create profile
//     const profile = await Profile.create({
//       userId,
//       bio,
//       profilePicture,
//     });

//     return res.status(201).json({
//       success: true,
//       profile,
//       message: "Profile created successfully ✅",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Profile creation failed",
//     });
//   }
// };

exports.getProfileByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find profile by email
    const profile = await Profile.findOne({ userEmail: email });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
      message: "Profile found successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// exports.editProfile = async (req, res) => {
//   try {
//     const { email, name, profilePicture } = req.body;

//     // Check if email is provided
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     // Find the profile by email
//     let profile = await Profile.findOne({ userEmail: email });

//     // If profile not found, return 404
//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     // Update name if provided
//     if (name) {
//       profile.userName = name;
//     }

//     // Update profilePicture if provided
//     if (profilePicture) {
//       profile.profilePicture = profilePicture;
//     }

//     // Save the updated profile
//     await profile.save();

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       profile,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update profile",
//     });
//   }
// };

exports.saveProfileWithImage = async (req, res) => {
  try {
    console.log('req.body', req.body)
    console.log('req.file?', req.file?.buffer)
      const email = req.body.email;
      const name = req.body.name;

      // Check if email is provided
      if (!email) {
          return res.status(400).json({
              success: false,
              message: "Email is required",
          });
      }

      // Find profile by email
      let profile = await Profile.findOne({ userEmail: email });

      if (!profile) {
          // Create a new profile if not found
          profile = new Profile();
      }

      // Check if file is uploaded
      if (req.file) {
          // Save the path of the uploaded image in the profile
          profile.photo = req.file?.buffer.toString("base64") // Assuming you save the image path
      }

      // Save other profile fields if needed
      profile.userEmail = email;
      profile.userName = name; // Assuming "name" is another field in your profile model

      await profile.save();

      return res.status(200).json({
          success: true,
          profile,
          message: "Profile saved successfully",
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Failed to save profile",
      });
  }
};

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await user.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(403).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Check if OTP exists for the given email
    const existingOtp = await OTP.findOne({ email, otp });

    if (!existingOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Update OTP status as verified
    await OTP.findOneAndUpdate({ email, otp }, { $set: { verified: true } });
    await user.findOneAndUpdate({ email }, { $set: { verified: true } });

    return res.status(200).json({
      success: true,
      message: "OTP verification successful ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};


exports.countReferralCode = async (req, res) => {
  try {
    const userEmail = req.body.email; // Assuming email is passed in the query string
    // Find the user by email to get their referral code
    const User = await user.findOne({ email: userEmail });
    
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    const referralCode = User.referCode;
    
    if (!referralCode) {
      return res.status(400).json({ message: "User does not have a referral code" });
    }

    // Count the number of users who have used the same referral code
    const referralCount = await await user.find({ referCode: referralCode }).count();

    res.json({ referralCode , referralCount });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}