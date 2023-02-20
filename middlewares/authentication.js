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
      req.token = result;
      next();
      return;
    }
  });
};

module.exports = authentication;


