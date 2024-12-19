const { User, Profile, Follow } = require("../../models");

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
      message: "Follow is success",
    });
  } catch (error) {
    errorHandler(error, "Failed to following user");
  }
}

async function unfollowUser(req, res) {
  const { userId } = req.user;
  const { followedId } = req.params;

  try {
    if (userId === followedId) {
      return res.status(400).json({
        success: false,
        message: "Cannot unfollow yourself",
      });
    }

    const followRecord = await Follow.findOne({
      where: { followerId: userId, followedId },
    });

    if (!followRecord) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }
    await followRecord.destroy();

    res.status(200).json({
      success: true,
      message: "Unfollow is success",
    });
  } catch (error) {
    errorHandler(error, "Failed to unfollow user");
  }
}

async function getUserFollowers(req, res) {
  const { userId } = req.params;
  try {
    const followerData = await Follow.findAll({
      where: { followedId: userId },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
          include: [{ model: Profile, attributes: ["firstname", "lastname"] }],
          order: [["username", "DESC"]],
        },
      ],
    });

    if (!followerData)
      return res
        .status(404)
        .send({ success: false, message: "User has no follower" });
  } catch (error) {
    errorHandler(error, "Failed to get user follower");
  }
}

async function getUserFollowings(req, res) {
  const { userId } = req.params;
  try {
    const followingData = await Follow.findAll({
      where: { followerId: userId },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
          include: [{ model: Profile, attributes: ["firstname", "lastname"] }],
          order: [["username", "DESC"]],
        },
      ],
    });

    if (!followingData)
      return res
        .status(404)
        .send({ success: false, message: "User is not following someone" });
  } catch (error) {
    errorHandler(error, "Failed to get user following");
  }
}

module.exports = {
  followNewUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowings,
};
