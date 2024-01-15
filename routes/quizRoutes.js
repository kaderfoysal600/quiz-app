const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddle");
const { createQuiz, getAllQuizzes } = require("../controllers/quizController");

const validateToken = require("../middleware/errorhandler");

// router.use(validateToken);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "It works!",
  });
});

//@ For Read & Write Category
// router.use("/quiz", auth);
// router.route("/quiz").get(getAllQuizzes).post(createQuiz);

// router.use("/quiz", auth);
router.route("/quiz").post(createQuiz);
router.route("/quiz/:subCatId", auth).get(getAllQuizzes)

module.exports = router;
