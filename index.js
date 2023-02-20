const express = require("express");
const app = express();
require("dotenv").config();

// import database connection
const db = require("./models/db");
// import articles Router
const articlesRouter = require("./routes/articles");
const commentsRouter = require("./routes/comments");
const usersRouter = require("./routes/users");
const roleRouter = require("./routes/role");

app.use(express.json());

// articles Router
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);
app.use("/roles", roleRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
