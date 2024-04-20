const TodaysUpdate = require("../models/TodaysUpdate");

// @desc    Create TodaysUpdate
// @route   POST /api/todaysupdate
// @access  Public
const createTodaysUpdate = async (req, res) => {
  try {
    const {
      totalTime,
      totalQuiz,
      totalCorrectAnswers,
      totalWrongAnswers,
      userEmail,
      date,

    } = req.body;

    const todaysUpdate = new TodaysUpdate({
      totalTime,
      totalQuiz,
      totalCorrectAnswers,
      totalWrongAnswers,
      userEmail,
      date,
    });

    await todaysUpdate.save();

    res.status(201).json({ success: true, data: todaysUpdate });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all TodaysUpdate
// @route   GET /api/todaysupdate
// @access  Public
const getAllTodaysUpdate = async (req, res) => {
  try {
    const todaysUpdates = await TodaysUpdate.find();
    res.status(200).json({ success: true, data: todaysUpdates });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get individual user's todays update
// @route   GET /api/todaysupdate/:userEmail
// @access  Public
const getTodaysUpdateByUser = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    
    // Assuming TodaysUpdate is your mongoose model
    const todaysUpdate = await TodaysUpdate.findOne({ userEmail, date: { $gte: new Date().setHours(0, 0, 0, 0) } });
    
    if (!todaysUpdate) {
      return res.status(404).json({ success: false, error: 'No update found for the user today' });
    }
    
    res.status(200).json({ success: true, data: todaysUpdate });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// @desc    Update TodaysUpdate by ID
// @route   PUT /api/todaysupdate/:id
// @access  Public
const updateTodaysUpdate = async (req, res) => {
  try {
    const { userEmail, totalCorrectAnswers, totalQuiz, date } = req.body;

    const totalWrongAnswers = totalQuiz - totalCorrectAnswers;

    const todaysUpdate = await TodaysUpdate.findOneAndUpdate(
      { userEmail },
      {
        totalTime: req.body.totalTime,
        totalQuiz,
        totalCorrectAnswers,
        totalWrongAnswers,
        date,
      },
      { new: true }
    );

    if (!todaysUpdate) {
      return res.status(404).json({ success: false, error: "TodaysUpdate not found" });
    }

    res.status(200).json({ success: true, data: todaysUpdate });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

  

module.exports = { createTodaysUpdate, getAllTodaysUpdate, updateTodaysUpdate , getTodaysUpdateByUser };
