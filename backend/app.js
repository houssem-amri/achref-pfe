const express = require("express"); // import express
const bodyParser = require("body-parser"); // import body-parser
const mongoose = require("mongoose"); // import mongoose
const path = require("path");

mongoose.connect("mongodb://localhost:27017/Scrumboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var UserRouter = require("./routes/user");
var BoardsRouter = require("./routes/Boards");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

app.use("/api", UserRouter);
app.use("/api", BoardsRouter);

module.exports = app;
