const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");
const SubCategory = require("../models/sub_cat_Models");
const mongoose = require("mongoose");


// const createQuiz = asyncHandler(async (req, res) => {
//   console.log("req.query.sub_category_id", req.query.subCatId);
//   console.log("req.body", req.body);
//   const quizzesData = req.body;
//   const subCategoryId = req.query.subCatId;
//   console.log("subCategoryId", subCategoryId);
//   if (!Array.isArray(quizzesData)) {
//     throw new Error("Invalid quiz data. Please provide an array of quizzes.");
//   }

//   const quizzes = [];

//   try {
//     for (let i = 0; i < quizzesData.length; i++) {
//       const { question, options, correctOption, questionStartDate } = quizzesData[i];

//       if (
//         !question ||
//         !options ||
//         options.length !== 4 ||
//         !correctOption ||
//         !subCategoryId
//       ) {
//         throw new Error(
//           "Invalid quiz data. Each quiz should have a valid question, 4 options, correct option, and sub-category ID."
//         );
//       }

//       let showAdd = false;
//       if ((i + 1) % 7 === 4) {
//         showAdd = true;
//       }

//       const quiz = await Quiz.create({
//         question,
//         options: options.map(option => option.value),
//         correctOption,
//         subCategoryId,
//         questionStartDate,
//         showAdd,
//       });

//       quizzes.push(quiz);
//     }

//     res.status(201).json(quizzes);
//   } catch (error) {
//     console.error("Error creating quiz:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


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

  try {
    for (let i = 0; i < quizzesData.length; i++) {
      const { question, options, correctOption, questionStartDate } = quizzesData[i];

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

      let showAdd = false;
      if ((i + 1) % 7 === 4) {
        // Generate random number between 3 and 6
        const randomNum = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        if (randomNum === 4) {
          showAdd = true;
        }
      }

      const quiz = await Quiz.create({
        question,
        options: options.map(option => option.value),
        correctOption,
        subCategoryId,
        questionStartDate,
        showAdd,
      });

      quizzes.push(quiz);
    }

    res.status(201).json(quizzes);
  } catch (error) {
    console.error("Error creating quiz:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
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
  const subCategory = await SubCategory.findById(subCategoryId);
  console.log('subCategory', subCategory);
  const result = {
    subCategoryId,
    subCategoryName: subCategory?.name,
    questionCount: quizzes.length, 
    allQuestion: [],
  };

  if (quizzes && quizzes.length > 0) {
    result.allQuestion = quizzes.map((quiz) => ({
      _id: quiz._id,
      question: quiz.question,
      options: quiz.options,
      correctOption: quiz.correctOption,
      questionStartDate: quiz.questionStartDate,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      __v: quiz.__v,
    }));
  }

  res.status(200).json(result);
});




// Add more controllers as needed (e.g., getQuiz, updateQuiz, deleteQuiz, etc.)

module.exports = {
  createQuiz,
  getAllQuizzes,
  // Add other controllers here
};
