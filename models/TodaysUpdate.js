const mongoose = require("mongoose");

const TodaysUpdateSchema = new mongoose.Schema(
  {
    totalTime: {
      type: Number,
      required: false,
      default: 0,
    },
    totalQuiz: {
      type: Number,
      required: false,
      default: 0,
    },
    totalCorrectAnswers: {
      type: Number,
      required: false,
      default: 0,
    },
    totalWrongAnswers: {
      type: Number,
      required: false,
      default: 0,
    },
    userEmail: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TodaysUpdate", TodaysUpdateSchema);
