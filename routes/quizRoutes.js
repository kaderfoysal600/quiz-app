const express = require("express");
const router = express.Router();

const { createQuiz } = require("../controllers/quizController");

const validateToken = require("../middleware/errorhandler");

// router.use(validateToken);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "It works!",
  });
});

//@ For Read & Write Category
router.route("/quiz").post(createQuiz);

module.exports = router;
