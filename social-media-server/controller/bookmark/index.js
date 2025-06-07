const {
  User,
  Post,
  Like,
  Comment,
  PostGallery,
  Bookmark,
} = require('../../models');

async function getAllSavedPosts(req, res) {
  const userId = req.user.userId;

  try {
    const savedPosts = await Bookmark.findAll({
      where: { userId },
      include: [
        {
          model: Post,
          as: 'post',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username'],
            },
            { model: Like, as: 'likes', attributes: ['id'] },
            { model: Comment, as: 'comments', attributes: ['id'] },
            { model: PostGallery, as: 'gallery', attributes: ['image'] },
          ],
        },
      ],
    });

    if (savedPosts.length === 0) {
      return res.status(200).json({
        saved: [],
        message: 'No saved posts',
      });
    }

    const saved = savedPosts.map((saved) => ({
      postId: saved.post.id,
      userId: saved.post.user.id,
      likes: saved.post.likes.length,
      comments: saved.post.comments.length,
      images: saved.post.gallery?.map((g) => g.image) || [],
    }));

    return res.status(200).json({ saved });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function toggleSavedPost(req, res) {
  const userId = req.user.userId;
  const postId = req.params.postId;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingBookmark = await Bookmark.findOne({
      where: { userId, postId },
    });

    if (existingBookmark) {
      await existingBookmark.destroy();
      return res.status(200).json({
        message: 'Post removed from saved posts',
      });
    } else {
      await Bookmark.create({ userId, postId });
      return res.status(201).json({
        message: 'Post added to saved posts',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { toggleSavedPost, getAllSavedPosts };
