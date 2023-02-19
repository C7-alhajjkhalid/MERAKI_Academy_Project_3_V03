const { where } = require("../models/articleSchema");
const articleModel = require("../models/articleSchema");

// 1. this function return all articles
const getAllArticles = (req, res) => {
  articleModel
    .find()
    .then((result) => {
      const message = {
        success: true,
        message: "All the articles",
        articles: result,
      };
      res.status(200).json(message);
    })
    .catch((err) => {
      const message = {
        success: false,
        message: "Server Error",
        err,
      };
      res.json(err);
    });
};

const createNewArticle = (req, res) => {
  const { title, description, author } = req.body;

  const newArticle = new articleModel({
    title,
    description,
    author,
  });
  newArticle
    .save()
    .then((result) => {
      const message = {
        success: true,
        message: "Article created",
        article: result,
      };
      res.status(201).json(message);
    })
    .catch((err) => {
      const message = {
        success: false,
        message: "Server Error",
        err,
      };
      res.status(500).json(message);
    });
};

const getArticlesByAuthor = (req, res) => {
  const { author } = req.query;

  articleModel
    .find({ author: author })
    .then((result) => {
      if (result.length === 0) {
        const message = {
          success: false,
          message: `The author => ${author} has no articles`,
        };
        res.status(404).json(message);
        return;
      } else {
        const message = {
          success: true,
          message: `${author} articles`,
          articles: result,
        };
        res.status(201).json(message);
      }
    })
    .catch((err) => {
      const message = {
        success: false,
        message: `Server Error`,
        err,
      };
      res.status(500).json(message);
    });
};

const getArticleById = (req, res) => {
  articleModel
    .findById(req.params.id)
    .then((result) => {
      if (result.length === 0) {
        const message = {
          success: false,
          message: `The article with id => ${req.params.id} is not found`,
        };
        res.status(404).json(message);
        return;
      } else {
        const message = {
          success: true,
          message: `${req.params.id} article`,
          result,
        };
        res.status(201).json(message);
      }
    })
    .catch((err) => {
      const message = {
        success: false,
        message: `Server Error`,
        err,
      };
      res.status(500).json(message);
    });
};

const updateArticleById = (req, res) => {
  if (Object.keys(req.body).length !== 3) {
    return;
  }
  const { title, description, author } = req.body;
  const id = req.params.id;
  articleModel
    .findByIdAndUpdate(
      { _id: id },
      { title, description, author },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        const message = {
          success: false,
          message: `The article with id => ${id} is not found`,
        };
        res.status(404).json(message);
        return;
      } else {
        const message = {
          success: true,
          message: `Article updated`,
          result,
        };
        res.status(201).json(message);
      }
    })
    .catch((err) => {
      const message = {
        success: false,
        message: `Server Error`,
        err,
      };
      res.status(500).json(message);
    });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  articleModel
    .findByIdAndDelete({ _id: id })
    .then((result) => {
      if (!result) {
        const message = {
          success: false,
          message: `The article with id => ${id} is not found`,
        };
        res.status(404).json(message);
        return;
      } else {
        const message = {
          success: true,
          message: `Article deleted`,
        };
        res.status(200).json(message);
      }
    })
    .catch((err) => {
      const message = {
        success: false,
        message: `Server Error`,
        err,
      };
      res.status(500).json(message);
    });
};

const deleteArticlesByAuthor = (req, res) => {
  const _id = req.params.id;
  articleModel
    .deleteMany({ author: _id })
    .then((result) => {
      if (result.deletedCount !== 0) {
        const message = {
          success: true,
          message: `Deleted articles for the author => ${_id} `,
        };
        res.status(200).json(message);
      } else {
        const message = {
          success: false,
          message: `No articles for this author`,
        };
        res.status(404).json(message);
        return;
      }
    })
    .catch((err) => {
      const message = {
        success: false,
        message: `Server Error`,
        err,
      };
      res.status(500).json(message);
    });
};

module.exports = {
  getAllArticles,
  createNewArticle,
  getArticlesByAuthor,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
