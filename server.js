const express = require("express");

const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS for a specific origin
app.use(cors(corsOptions));
// app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//calling Database function
require("./config/database").connect();
//route importing and mounting
const user = require("./routes/user");
// const categoryRouter = require("./routes/category");
const categoryRouter = require("./routes/catRoutes");
// const category = require("./routes/category");

const quizRouter = require("./routes/quizRoutes");
app.use("/api/v1", user);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", quizRouter);

app.listen(PORT, () => {
  console.log("Server Started");
});
