const express = require("express");
const postRoute = express.Router();
const {
  getPostForm,
  createPost,
  getPosts,
  getPostById,
  getEditPostForm,
  deletePost,
} = require("/Users/adityavikram/Desktop/Projects WD/Fullstack-Blog-Project/controllers/postController.js");
const upload = require("../config/multer");
const { ensureAuthenticated } = require("../middlewares/auth");

//Get Post form
postRoute.get("/add", getPostForm);

//Post Logic
postRoute.post(
  "/add",
  ensureAuthenticated,
  upload.array("image", 5),
  createPost
);

//Get Post
postRoute.get("/", getPosts);

//Get Post by Id
postRoute.get("/:id", getPostById);
postRoute.get("/:id/edit", getEditPostForm);

//Delete post
postRoute.delete("/:id", deletePost);

module.exports = postRoute;
