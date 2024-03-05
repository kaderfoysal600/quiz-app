const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddle");
const { createQuiz, getAllQuizzes } = require("../controllers/quizController");
const { createPayment, getAllPayments } = require("../controllers/paymentController");

const validateToken = require("../middleware/errorhandler");

// router.use(validateToken);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "It works!",
  });
});

//@ For Read & Write Category
router.use("/quiz", auth);
// router.route("/quiz").get(getAllQuizzes).post(createQuiz);

// router.use("/quiz");
router.route("/quiz").post(createQuiz);
router.route("/quiz/:subCatId").get(getAllQuizzes)

router.use("/payment", auth);

router.route("/payment").post(createPayment);
router.route("/getAllPayments").get(getAllPayments)


module.exports = router;
