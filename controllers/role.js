const roleModel = require("../models/roleSchema");

const createNewRole = (req, res) => {
  const { role, permissions } = req.body;

  const newRole = new roleModel({ role, permissions });

  newRole
    .save()
    .then((result) => {
      const message = {
        success: true,
        message: "Successfully createded a role",
        role: req.body,
      };
      res.status(201).json(message);
    })
    .catch((err) => {
      const message = {
        success: false,
        message: "Server error",
      };
      res.status(500).json(message);
    });
};

module.exports = createNewRole;
