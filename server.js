const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

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
