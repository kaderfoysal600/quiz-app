const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");

const createQuiz = asyncHandler(async (req, res) => {
  const { question, options, correctOption, subSubCategoryId } = req.body;

  if (
    !question ||
    !options ||
    options.length !== 4 ||
    !correctOption ||
    !subSubCategoryId
  ) {
    throw new Error(
      "Invalid quiz data. Please provide a valid question, 4 options, correct option, and sub-subcategory ID."
    );
  }

  const quiz = await Quiz.create({
    question,
    options,
    correctOption,
    subSubCategoryId,
  });

  res.status(201).json(quiz);
});

// Add more controllers as needed (e.g., getQuiz, updateQuiz, deleteQuiz, etc.)

module.exports = {
  createQuiz,
  // Add other controllers here
};
