const { User, Post, PostGallery } = require("../../models");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../utils/cloudinary");
const errorHandler = require("../../utils/errorHandler");

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
    errorHandler(error, "Failed to create new post");
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
    errorHandler(error, "Failed to update post");
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
        .json({ success: false, message: "Post not found or unauthorized" });
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
    errorHandler(error, "Failed to delete post");
  }
}

// get all public post
async function getAllPublicPosts(req, res) {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
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
        .json({ success: false, message: "No public posts found" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    errorHandler(error, "Failed to retrieve public posts");
  }
}

// get following user post
async function getFollowedPosts(req, res) {
  const { userId } = req.user;

  try {
    const followedIds = await Follower.findAll({
      where: { followerId: userId },
      attributes: ["followedId"],
      raw: true,
    }).then((follows) => follows.map((follow) => follow.followedId));

    if (!followedIds.length) {
      return res.status(404).json({
        success: false,
        message: "You are not following anyone yet",
      });
    }

    const posts = await Post.findAll({
      where: {
        userId: {
          [Sequelize.Op.in]: followedIds,
        },
      },
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
      order: [["createdAt", "DESC"]],
    });

    if (!posts.length) {
      return res.status(404).json({
        success: false,
        message: "No posts found from followed users",
      });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve followed posts",
    });
  }
}

// get all user post in home
async function getUserPosts(req, res) {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Post.findAndCountAll({
      where: { userId },
      include: [{ model: PostGallery, attributes: ["image"] }],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get user posts" });
  }
}

// get the detail of post
async function getPostDetail(req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ["id", "username"] },
        {
          model: Comment,
          as: "parentComment",
          attributes: ["id", "comment"],
          include: [
            { model: User, attributes: ["id", "username"] },
            {
              model: Like,
              attributes: ["id"],
              include: [{ model: User, attributes: ["id", "username"] }],
            },
            {
              model: Comment,
              as: "replies",
              attributes: ["id", "comment"],
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
    errorHandler(error, "Failed to retrieve public posts");
  }
}

module.exports = {
  createNewPost,
  updateMyPost,
  deleteMyPost,
  getAllPublicPosts,
  getFollowedPosts,
  getUserPosts,
  getPostDetail,
};
