const { User, Post, Comment } = require("../../models");

async function commentUserPost(req, res) {
  const { userId } = req.user;
  const { postId } = req.params;
  const { content } = req.body;
  try {
    const post = await Post.findByPk(postId);

    if (!post)
      return res.status(404).send({
        success: false,
        message: "Post is not found",
      });

    await Comment.create({
      userId,
      postId: post.id,
      content,
    });

    return res.status(201).send({
      success: true,
      message: "Comment is created",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to comment a post",
      error: error.message,
    });
  }
}

async function replyUserPost(req, res) {
  const { userId } = req.user;
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findByPk(postId);

    if (!post)
      return res.status(404).send({
        success: false,
        message: "Post is not found",
      });

    await Comment.create({
      userId,
      postId: post.id,
      content,
    });

    return res.status(201).send({
      success: true,
      message: "Comment is created",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to reply a comment",
      error: error.message,
    });
  }
}

module.exports = {
  commentUserPost,
  replyUserComment,
  updateMyComment,
  updateMyReply,
  deleteMyComment,
  deleteMyReply,
};
