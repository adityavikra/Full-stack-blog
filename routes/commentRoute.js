const express = require("express");
const { ensureAuthenticated } = require("../middlewares/auth");
const {
  addComment,
  getCommentForm,
} = require("../controllers/commentController");
const commentRoute = express.Router();

//add comment
commentRoute.post("/posts/:id/comments", ensureAuthenticated, addComment);
//edit comment
commentRoute.get("/comments/:id/edit", getCommentForm);

model.exports = commentRoute;
