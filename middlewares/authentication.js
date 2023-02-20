const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    const message = {
      success: false,
      message: "Forbidden",
    };
    res.status(403).json(message);
    return;
  }
  const token = req.headers.authorization.split(" ").pop();
  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (!result) {
      res.status(403).json("The token is invalid or expired");
      return;
    } else {
      req.token = token;
      next();
      return;
    }
  });
};

module.exports = authentication;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2YzMmJiZWIyNTkyODUzZTVkYjE5NjAiLCJjb3VudHJ5IjoiSm9yZGFuIiwiaWF0IjoxNjc2ODgyODIyLCJleHAiOjE2NzY5NjkyMjJ9.9CLBUCJiiMQL-Ndl_xXrX1qIrPc28JUZrh04MUAa3j0
