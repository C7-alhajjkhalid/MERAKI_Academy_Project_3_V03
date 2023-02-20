const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();

  this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT));
});

module.exports = mongoose.model("User", userSchema);
