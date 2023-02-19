const commentModel = require("../models/commentSchema");
const articleModel = require("../models/articleSchema");
const mongoose = require("mongoose");

const createNewComment = (req, res) => {
  const { comment, commenter } = req.body;

  const articleID = req.params.articleId;
  const newComment = new commentModel({ comment, commenter });

  newComment
    .save()
    .then((result) => {
      temp = result._id.toString();
      articleModel
        .findByIdAndUpdate(articleID, {
          $push: { comments: temp },
        })

        .then((data) => {})
        .catch((err) => {
          res.json(err);
        });

      res
        .status(201)
        .json({ success: true, message: "the new comment was added", result });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: "Server Error", err });
      return;
    });
};

module.exports = createNewComment;
