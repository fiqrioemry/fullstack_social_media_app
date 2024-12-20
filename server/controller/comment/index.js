const { Post, Comment } = require("../../models");

async function createCommentOrReply(req, res) {
  const { userId } = req.user;
  const { postId } = req.params;
  const { commentId, content } = req.body;
  try {
    const post = await Post.findByPk(postId);

    if (!post)
      return res.status(404).send({
        success: false,
        message: "Post is not found",
      });

    if (commentId) {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).send({
          success: false,
          message: "Comment is not found",
        });
      }
    }

    await Comment.create({
      userId,
      postId,
      parentId: commentId || null,
      content,
    });
    return res.status(201).send({
      success: true,
      message: commentId ? "Reply is created" : "Comment is created",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: commentId
        ? "Failed to reply a post"
        : "Failed to comment a post",
      error: error.message,
    });
  }
}

module.exports = {
  createCommentOrReply,
};
