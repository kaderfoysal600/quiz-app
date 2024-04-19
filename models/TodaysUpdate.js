const mongoose = require("mongoose");

const TodaysUpdateSchema = new mongoose.Schema(
  {
    totalPlayingQuiz: {
      type: Number,
      required: false,
      default: 0,
    },
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
    points: {
        type: Number,
        default: 0,
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
