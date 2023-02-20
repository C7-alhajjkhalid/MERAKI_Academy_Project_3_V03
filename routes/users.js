const express = require("express");
const { register, login } = require("../controllers/users");
// const authentication = require("../controllers/authentication");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
