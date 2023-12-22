const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");
const mongoose = require("mongoose");

const createQuiz = asyncHandler(async (req, res) => {
  console.log("req.query.subSubCatId", req.query.subSubCatId);
  console.log("req.body", req.body);
  const quizzesData = req.body;
  const subSubCategoryId = req.query.subSubCatId;
  console.log("subSubCategoryId", subSubCategoryId);
  if (!Array.isArray(quizzesData)) {
    throw new Error("Invalid quiz data. Please provide an array of quizzes.");
  }

  const quizzes = [];

  for (const quizData of quizzesData) {
    const { question, options, correctOption, questionStartDate } = quizData;

    if (
      !question ||
      !options ||
      options.length !== 4 ||
      !correctOption ||
      !subSubCategoryId
    ) {
      throw new Error(
        "Invalid quiz data. Each quiz should have a valid question, 4 options, correct option, and sub-subcategory ID."
      );
    }

    const quiz = await Quiz.create({
      question,
      options: quizData.options.map((option) => option.value),
      correctOption,
      subSubCategoryId: subSubCategoryId,
      questionStartDate: questionStartDate,
    });

    quizzes.push(quiz);
  }

  res.status(201).json(quizzes);
});
// Get all quizzes
const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find(); // Assuming Quiz is your Mongoose model for quizzes
  res.status(200).json(quizzes);
});

// Add more controllers as needed (e.g., getQuiz, updateQuiz, deleteQuiz, etc.)

module.exports = {
  createQuiz,
  getAllQuizzes
  // Add other controllers here
};
