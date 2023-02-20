const express = require("express");

const authorization = (text) => {
  return (req, res, next) => {
    if (req.token.permissions.includes(text)) {
      next();
    } else {
      res.status(403).json({ success: false, message: "unauthorized bro" });
    }
  };
};

module.exports = authorization;
