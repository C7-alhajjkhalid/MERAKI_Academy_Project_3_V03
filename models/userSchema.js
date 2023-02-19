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
  this.password = this.password.toLowerCase();

  this.password = await bcrypt.hash(this.password, 3);
  console.log(process.env.SALT);
  console.log(this.password);
});

module.exports = mongoose.model("User", userSchema);
