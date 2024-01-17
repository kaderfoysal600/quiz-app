const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    required: false,
  },

  referCode: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("user", userSchema);
