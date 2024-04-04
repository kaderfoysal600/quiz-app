const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    default: "",
    unique: true
  },
  userName: {
    type: String,
    default: "",
  },
  uiId: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  // userId: {
  //   type: String,
  //   unique: true, // Ensure userId is unique
  //   required: true
  // }
});

module.exports = mongoose.model("Profile", profileSchema);