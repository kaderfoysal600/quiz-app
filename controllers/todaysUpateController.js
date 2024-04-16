const TodaysUpdate = require("../models/TodaysUpdate");

// @desc    Create TodaysUpdate
// @route   POST /api/todaysupdate
// @access  Public
const createTodaysUpdate = async (req, res) => {
  try {
    const {
      totalPlayingQuiz,
      totalTime,
      totalQuiz,
      totalCorrectAnswers,
      userEmail,
      date,
      points,
    } = req.body;

    const todaysUpdate = new TodaysUpdate({
      totalPlayingQuiz,
      totalTime,
      totalQuiz,
      totalCorrectAnswers,
      userEmail,
      date,
      points,
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
      const { userEmail } = req.body; // Extract userEmail from req.body
      const {
        totalPlayingQuiz,
        totalTime,
        totalQuiz,
        totalCorrectAnswers,
        date,
        points,
      } = req.body;
  
      const todaysUpdate = await TodaysUpdate.findOneAndUpdate(
        { userEmail }, // Finding document by userEmail
        {
          totalPlayingQuiz,
          totalTime,
          totalQuiz,
          totalCorrectAnswers,
          date,
          points,
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
