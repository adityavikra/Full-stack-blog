const Post = require("../models/Post");

exports.addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  //find Post
  const post = await Post.findById(postId);
  //validation
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post Not Found",
      success: "",
    });
  }
  if (!content) {
    res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Comment cannot be empty",
      success: "",
    });
  }
  //save Comment
  const comment = new Comment({
    content,
    post: postId,
    author: req.user._id,
  });
  await comment.save();
  //push comment
  post.comments.push(comment._id);
  await post.save();
  //redirect
  res.redirect(`/posts/${postId}`);
});

//get comment form
exports.getCommentForm = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "comment",
      comment,
      user: req.user,
      error: "",
      success: "",
    });
  }
  res.render("editComment", {
    title: "comment",
    comment,
    user: req.user,
    error: "",
    success: "",
  });
});

//Update Comment
