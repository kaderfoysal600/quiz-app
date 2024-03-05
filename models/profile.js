const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    default: "",
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
});

module.exports = mongoose.model("Profile", profileSchema);
