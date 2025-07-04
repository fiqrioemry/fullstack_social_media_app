const {
  User,
  Post,
  Like,
  Profile,
  Comment,
  sequelize,
  Notification,
} = require('../../models');

function extractMentions(content) {
  const mentionRegex = /@(\w+)/g;
  const matches = [...content.matchAll(mentionRegex)];
  return matches.map((match) => match[1]);
}

async function createComment(req, res) {
  const userId = req.user.userId;
  const content = req.body.content;
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = await Comment.create({
      userId,
      postId,
      parentId: null,
      content,
    });

    if (post.userId !== userId) {
      await Notification.create({
        receiverId: post.userId,
        senderId: userId,
        postId,
        commentId: newComment.id,
        type: 'comment',
      });
    }

    const mentionedUsernames = extractMentions(content);
    if (mentionedUsernames.length > 0) {
      const mentionedUsers = await User.findAll({
        where: { username: mentionedUsernames },
        attributes: ['id', 'username'],
      });

      await Promise.all(
        mentionedUsers.map((mentionedUser) =>
          Notification.create({
            postId,
            type: 'mention',
            senderId: userId,
            commentId: newComment.id,
            receiverId: mentionedUser.id,
          }),
        ),
      );
    }
    return res.status(201).json({ message: 'Comment created' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createReply(req, res) {
  const userId = req.user.userId;
  const content = req.body.content;
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const parentComment = await Comment.findByPk(commentId);
    if (!parentComment)
      return res.status(404).json({ message: 'Parent comment not found' });

    const newReply = await Comment.create({
      userId,
      postId,
      parentId: commentId,
      content,
    });

    if (parentComment.userId !== userId) {
      await Notification.create({
        receiverId: parentComment.userId,
        senderId: userId,
        postId,
        commentId: newReply.id,
        type: 'reply',
      });
    }

    const mentionedUsernames = extractMentions(content);
    if (mentionedUsernames.length > 0) {
      const mentionedUsers = await User.findAll({
        where: { username: mentionedUsernames },
        attributes: ['id', 'username'],
      });

      await Promise.all(
        mentionedUsers.map((mentionedUser) =>
          Notification.create({
            postId,
            type: 'mention',
            senderId: userId,
            receiverId: mentionedUser.id,
            commentId: newReply.id,
          }),
        ),
      );
    }

    return res.status(201).json({ message: 'Reply Created' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getComments(req, res) {
  const userId = req.user.userId;
  const postId = req.params.postId;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const commentsData = await Comment.findAndCountAll({
      where: { postId, parentId: null },
      limit,
      distinct: true,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment,
          as: 'replies',
          attributes: ['id'],
        },
        { model: Like, as: 'likes', attributes: ['id', 'userId'] },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
      ],
    });

    if (commentsData.count === 0) {
      return res
        .status(200)
        .json({ comments: [], message: 'Post has no comment' });
    }

    const totalComments = commentsData.count;
    const comments = commentsData.rows.map((comment) => {
      return {
        postId: comment.postId,
        commentId: comment.id,
        userId: comment.userId,
        username: comment.user.username,
        avatar: comment.user.profile.avatar,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        likes: comment.likes.length,
        isLiked: comment.likes.some((like) => like.userId === userId),
        replies: comment.replies.length,
      };
    });
    return res.status(200).json({ comments, totalComments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getReplies(req, res) {
  const userId = req.user.userId;
  const { postId, commentId } = req.params;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const repliesData = await Comment.findAndCountAll({
      where: { postId, parentId: commentId },
      limit,
      include: [
        { model: Like, as: 'likes', attributes: ['id', 'userId'] },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
      ],
      distinct: true,
      order: [['createdAt', 'DESC']],
    });

    if (repliesData.count === 0) {
      return res
        .status(200)
        .json({ replies: [], message: 'Comments has no replies' });
    }

    const replies = repliesData.rows.map((reply) => {
      return {
        postId: reply.postId,
        parentId: reply.parentId,
        commentId: reply.id,
        userId: reply.userId,
        username: reply.user.username,
        avatar: reply.user.profile.avatar,
        content: reply.content,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,
        likes: reply.likes.length,
        isLiked: reply.likes.some((like) => like.userId === userId),
      };
    });
    return res.status(200).json({ replies });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function toggleLikeComment(req, res) {
  const userId = req.user.userId;
  const commentId = req.params.commentId;
  const transaction = await sequelize.transaction();

  try {
    const comment = await Comment.findByPk(commentId, { transaction });

    if (!comment) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Comment not found' });
    }

    const like = await Like.findOne({
      where: { userId, entityId: commentId, entityType: 'comment' },
      transaction,
    });

    if (like) {
      await like.destroy({ transaction });

      await Notification.destroy({
        where: {
          senderId: userId,
          receiverId: comment.userId,
          commentId: commentId,
          type: 'like',
        },
        transaction,
      });

      await transaction.commit();
      return res.status(200).json({ message: 'You unliked the comment' });
    }

    await Like.create(
      { userId, entityId: commentId, entityType: 'comment' },
      { transaction },
    );

    if (comment.userId !== userId) {
      await Notification.create(
        {
          receiverId: comment.userId,
          senderId: userId,
          commentId: commentId,
          type: 'like',
        },
        { transaction },
      );
    }
    await transaction.commit();
    return res.status(200).json({ message: 'You Liked the comment' });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
}

async function deleteComment(req, res) {
  const userId = req.user.userId;
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this comment' });
    }

    await comment.destroy();

    return res.status(200).json({ message: 'Comment is deleted' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getReplies,
  getComments,
  createReply,
  createComment,
  deleteComment,
  toggleLikeComment,
};
