const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    type: Number,
    required: false,
  },

  referCode: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("user", userSchema);
