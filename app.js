const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const tourRoutes = require("./routes/tour.routes");

app.get("/", (req, res) => {
  res.send("Welcome to Tour Management.");
});
app.use("api/v1/tours", tourRoutes);
module.exports = app;
