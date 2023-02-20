const express = require("express");
const {
  getAllArticles,
  createNewArticle,
  getArticlesByAuthor,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../controllers/articles");

const authentication = require("../middlewares/authentication");

const createNewComment = require("../controllers/comments");

// create articles router
const articlesRouter = express.Router();

// endpoint for the GET request
articlesRouter.get("/", getAllArticles);
articlesRouter.post("/", authentication, createNewArticle);
articlesRouter.get("/search_1", getArticlesByAuthor);
articlesRouter.get("/search_2/:id", getArticleById);
articlesRouter.put("/:id", updateArticleById);
articlesRouter.delete("/:id", deleteArticleById);
articlesRouter.delete("/:id/author", deleteArticlesByAuthor);
articlesRouter.post("/:articleId/comments", createNewComment);

module.exports = articlesRouter;
