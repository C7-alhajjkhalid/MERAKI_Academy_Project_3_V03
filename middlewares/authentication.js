const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");

const authentication = (req, res, next) => {
  console.log("hiiiii");
  next();
};

module.exports = authentication;
