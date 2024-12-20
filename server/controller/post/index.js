const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../utils/cloudinary");
const {
  User,
  Post,
  PostGallery,
  Comment,
  Like,
  Reply,
} = require("../../models");
const { Op } = require("sequelize");

// create new post
async function createNewPost(req, res) {
  const files = req.files;
  const { userId } = req.user;
  const { content } = req.body;
  try {
    if (!content || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Content or images are missing" });
    }

    const newPost = await Post.create({ userId, content });

    const uploadPromises = files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );

    const results = await Promise.all(uploadPromises);

    const images = results.map((result) => {
      return {
        postId: newPost.id,
        image: result.secure_url,
      };
    });

    await PostGallery.bulkCreate(images);

    res.status(201).send({ success: true, message: "New post is created" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to create new post",
      error: error.message,
    });
  }
}

// update own post
async function updateMyPost(req, res) {
  const { postId } = req.params;
  const files = req.files; // Gambar atau file baru yang diupload
  const { userId } = req.user; // ID User yang sedang login
  const { content } = req.body; // Konten atau caption baru

  try {
    const post = await Post.findOne({
      where: { id: postId, userId },
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found or unauthorized" });
    }

    if (content) {
      post.content = content;
    }

    if (files && files.length > 0) {
      const oldImages = await PostGallery.findAll({
        where: { postId: post.id },
      });

      const updatedImages = files.map((fileItem) =>
        uploadMediaToCloudinary(fileItem.path)
      );

      const results = await Promise.all(updatedImages);

      const newImages = results.map((result) => ({
        postId: post.id,
        image: result.secure_url, // URL gambar yang baru
      }));

      const oldImagesUrls = oldImages.map((image) => image.image);
      oldImagesUrls.forEach((imageUrl) => {
        deleteMediaFromCloudinary(imageUrl);
      });

      await PostGallery.destroy({ where: { postId: post.id } });

      await PostGallery.bulkCreate(newImages);
    }

    await post.save();

    res.status(200).json({ success: true, message: "Post is updated" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get user details",
      error: error.message,
    });
  }
}

// delete own post
async function deleteMyPost(req, res) {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    const post = await Post.findOne({
      where: { id: postId, userId },
    });

    // Pastikan post ditemukan
    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: "Post not found or unauthorized" });
    }

    const images = await PostGallery.findAll({
      where: { postId: post.id },
    });

    images.forEach((image) => {
      deleteMediaFromCloudinary(image.image);
    });

    await PostGallery.destroy({
      where: { postId: post.id },
    });

    await post.destroy();

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get user details",
      error: error.message,
    });
  }
}

// get all public post
const getAllPublicPosts = async (req, res) => {
  const { limit } = req.query;
  try {
    const total = parseInt(limit) || 3;
    const posts = await Post.findAll({
      limit: total,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "content", "createdAt"],
      include: [
        {
          model: User,
          where: { isPrivate: false },
          attributes: ["id", "username"],
        },
        {
          model: PostGallery,
          attributes: ["image"],
        },
      ],
    });

    if (!posts.length) {
      return res
        .status(404)
        .send({ success: false, message: "No public posts found" });
    }

    const publicPosts = await Promise.all(
      posts.map(async (post) => {
        const [commentCount, likeCount] = await Promise.all([
          Comment.count({ where: { postId: post.id } }),
          Like.count({ where: { entityId: post.id, entityType: "post" } }),
        ]);

        return {
          ...post.toJSON(),
          commentCount,
          likeCount,
        };
      })
    );

    res.status(200).send({
      success: true,
      data: publicPosts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get public posts",
      error: error.message,
    });
  }
};

// get following user post
const getAllFollowingPosts = async (req, res) => {
  const { userId } = req.user;
  const { limit } = req.query;
  try {
    const total = parseInt(limit) || 3;

    const user = await User.findByPk(userId, {
      include: {
        model: User,
        as: "Followings",
        attributes: ["id"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const followingIds = user.Followings.map(
      (following) => following.Follow.followingId
    );

    if (followingIds.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No posts to show, you are not following anyone.",
        data: [],
      });
    }

    const posts = await Post.findAll({
      limit: total,
      where: { userId: { [Op.in]: followingIds } },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "content", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: PostGallery,
          attributes: ["image"],
        },
      ],
    });

    if (!posts.length) {
      return res
        .status(404)
        .send({ success: false, message: "No posts found" });
    }

    const followingPosts = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await post.countComments();
        const likeCount = await post.countLikes();

        return {
          ...post.toJSON(),
          commentCount,
          likeCount,
        };
      })
    );

    res.status(200).send({
      success: true,
      data: followingPosts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve following posts",
      error: error.message,
    });
  }
};

// get all user post in home
const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const { limit } = req.query;
  try {
    const total = parseInt(limit) || 3;
    const posts = await Post.findAll({
      where: { userId },
      limit: total,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "content", "createdAt"],
      include: [
        {
          model: User,
          where: { isPrivate: false },
          attributes: ["id", "username"],
        },
        {
          model: PostGallery,
          attributes: ["image"],
        },
      ],
    });

    if (!posts.length) {
      return res
        .status(200)
        .send({ success: true, message: "This user has no post" });
    }

    const userPosts = await Promise.all(
      posts.map(async (post) => {
        const [commentCount, likeCount] = await Promise.all([
          Comment.count({ where: { postId: post.id } }),
          Like.count({ where: { entityId: post.id, entityType: "post" } }),
        ]);

        return {
          ...post.toJSON(),
          commentCount,
          likeCount,
        };
      })
    );

    res.status(200).send({
      success: true,
      data: userPosts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get user posts",
      error: error.message,
    });
  }
};

// get the detail of post
async function getPostDetail(req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: PostGallery, attributes: ["image"] },
        {
          model: Comment,
          attributes: ["id", "content"],
          include: [
            { model: User, attributes: ["id", "username"] },
            {
              model: Like,
              attributes: ["id"],
              include: [{ model: User, attributes: ["id", "username"] }],
            },
            {
              model: Reply,
              attributes: ["id", "content"],
              include: [{ model: User, attributes: ["id", "username"] }],
            },
          ],
        },
        {
          model: Like,
          attributes: ["id"],
          include: [{ model: User, attributes: ["id", "username"] }],
        },
      ],
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get post details",
      error: error.message,
    });
  }
}

module.exports = {
  createNewPost,
  updateMyPost,
  deleteMyPost,
  getAllPublicPosts,
  getAllFollowingPosts,
  getUserPosts,
  getPostDetail,
};
