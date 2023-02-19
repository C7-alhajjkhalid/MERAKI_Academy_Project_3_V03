const userModel = require("../models/userSchema");

const register = (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;

  const newUser = new userModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });

  newUser
    .save()
    .then((result) => {
      const message = {
        success: true,
        message: "Account Created Successfully",
        author: newUser,
      };
      res.status(201).json(message);
    })
    .catch((err) => {
      console.log(err);
      const message = {
        success: false,
        message: "The email already exists",
      };
      res.status(409).json(message);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .find({ $and: [{ email: email }, { password: password }] })
    .then((result) => {
      if (result.length === 0) {
        const message = {
          success: false,
          message: "Invalid login credentials",
        };
        res.status(401).json(message);
        return;
      }
      const message = {
        success: true,
        message: "Valid login credentials",
      };
      res.status(200).json(message);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { register, login };
