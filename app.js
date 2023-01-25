const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Tour Management.");
});
app.use();
module.exports = app;
