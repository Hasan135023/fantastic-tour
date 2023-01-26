const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const {
  tourRouter: tourRoutes,
  toursRouter: toursRoutes,
} = require("./routes/v1/tour.routes");

app.get("/", (req, res) => {
  res.send("Welcome to Tour Management.");
});
app.use("/api/v1/tour", tourRoutes);
app.use("/api/v1/tours", toursRoutes);
module.exports = app;
