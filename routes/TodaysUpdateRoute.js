const express = require('express');
const router = express.Router();
const { createTodaysUpdate, updateTodaysUpdate } = require('../controllers/todaysUpateController');
const { auth } = require("../middlewares/authMiddle");

// Middleware to protect routes
router.use("/todaysUpdate", auth);

// Routes for TodaysUpdate
router.route("/todaysUpdate")
  .post(createTodaysUpdate)
  .put(updateTodaysUpdate);

module.exports = router;
