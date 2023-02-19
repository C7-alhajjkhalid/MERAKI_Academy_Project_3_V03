// DB connection goes here
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI).then(() => {
  console.log("DB connected");
});
