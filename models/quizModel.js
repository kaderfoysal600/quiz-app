const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (options) {
          return options.length === 4; // Ensure there are exactly 4 options
        },
        message: "There must be exactly 4 options.",
      },
    },
    correctOption: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 1 && value <= 4; // Ensure correctOption is in the range [0, 3]
        },
        message: "Correct option must be a value between 0 and 3.",
      },
    },
    subSubCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSubCategory",
      required: true,
    },
    questionStartDate: {
      type: Date, // Adjust the type according to your requirements
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", QuizSchema);
