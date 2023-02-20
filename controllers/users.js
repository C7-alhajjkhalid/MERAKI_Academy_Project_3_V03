const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/users");

const register = (req, res) => {
  const { firstName, lastName, age, country, email, password, role } = req.body;

  const newUser = new userModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
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
    .findOne({ email: email.toLowerCase() })
    .then(async (result) => {
      if (!result) {
        const message = {
          success: false,
          message:
            "The email doesn’t exist or the password you’ve entered is incorrect",
        };
        res.status(403).json(message);
        return;
      } else {
        const isCorrect = await bcrypt.compare(password, result.password);
        if (!isCorrect) {
          const message = {
            success: false,
            message:
              "The email doesn’t exist or the password you’ve entered is incorrect",
          };
          res.status(403).json(message);
          return;
        } else {
          const payload = {
            userId: result._id,
            country: result.country,
          };

          const options = { expiresIn: process.env.TOKEN_EXP_Time };

          const token = jwt.sign(payload, process.env.SECRET, options);

          console.log(token);

          const message = {
            success: true,
            message: "Valid login credentials",
            token,
          };
          res.status(200).json(message);
        }
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { register, login };
