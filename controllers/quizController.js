const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");
const mongoose = require("mongoose");

const createQuiz = asyncHandler(async (req, res) => {
  console.log("req.query.sub_category_id", req.query.subCatId);
  console.log("req.body", req.body);
  const quizzesData = req.body;
  const subCategoryId = req.query.subCatId;
  console.log("subCategoryId", subCategoryId);
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
      !subCategoryId
    ) {
      throw new Error(
        "Invalid quiz data. Each quiz should have a valid question, 4 options, correct option, and sub-category ID."
      );
    }

    const quiz = await Quiz.create({
      question,
      options: quizData.options.map((option) => option.value),
      correctOption,
      subCategoryId: subCategoryId,
      questionStartDate: questionStartDate,
    });

    quizzes.push(quiz);
  }

  res.status(201).json(quizzes);
});

// Get all quizzes
const getAllQuizzes = asyncHandler(async (req, res) => {
  console.log('req.params', req.params);
  const subCategoryId = req.params.subCatId; // Assuming your route has a parameter named 'subSubCategoryId'

  if (!subCategoryId) {
    return res
      .status(400)
      .json({ error: "subCategoryId not provided in the parameters" });
  }

  const quizzes = await Quiz.find({ subCategoryId }); // Filter quizzes by subSubCategoryId

  if (!quizzes || quizzes.length === 0) {
    return res
      .status(404)
      .json({ error: "No quizzes found for the provided subSubCategoryId" });
  }

  const result = {
    subCategoryId,
    allQuestion: quizzes.map((quiz) => ({
      _id: quiz._id,
      question: quiz.question,
      options: quiz.options,
      correctOption: quiz.correctOption,
      questionStartDate: quiz.questionStartDate,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      __v: quiz.__v,
    })),
  };

  res.status(200).json(result);
});


// Add more controllers as needed (e.g., getQuiz, updateQuiz, deleteQuiz, etc.)

module.exports = {
  createQuiz,
  getAllQuizzes,
  // Add other controllers here
};
