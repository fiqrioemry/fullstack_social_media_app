const { Follow } = require("../../models");

async function followNewUser(req, res) {
  const { userId } = req.user;
  const { followedId } = req.params;
  try {
    if (userId === followedId) {
      return res.status(400).json({
        success: false,
        message: "Cannot follow yourself",
      });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId: userId, followedId },
    });

    if (existingFollow) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    await Follow.create({
      followerId: userId,
      followedId: followedId,
    });

    res.status(201).json({
      success: true,
      message: "Follow user is success",
    });
  } catch (error) {
    errorHandler(error, "Failed to following user");
  }
}

async function unfollowUser(req, res) {
  const { userId } = req.user;
  const { followedId } = req.params;

  try {
  } catch (error) {
    errorHandler(error, "Failed to unfollow user");
  }
}

async function getFollowers(req, res) {}

async function getFollowings(req, res) {}
