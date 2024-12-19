const { User, Profile, Follow } = require("../../models");

async function followNewUser(req, res) {
  const { userId } = req.user;
  const { followedId } = req.params;
  try {
    if (userId === followedId) {
      return res.status(400).send({
        success: false,
        message: "Cannot follow yourself",
      });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId: userId, followedId },
    });

    if (existingFollow) {
      return res.status(400).send({
        success: false,
        message: "You are already following this user",
      });
    }

    await Follow.create({
      followerId: userId,
      followedId: followedId,
    });

    res.status(201).send({
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
      return res.status(400).send({
        success: false,
        message: "Cannot unfollow yourself",
      });
    }

    const followRecord = await Follow.findOne({
      where: { followerId: userId, followedId },
    });

    if (!followRecord) {
      return res.status(400).send({
        success: false,
        message: "You are not following this user",
      });
    }
    await followRecord.destroy();

    res.status(200).send({
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

    if (followerData.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User has no followers",
      });
    }

    // Mengembalikan data followers
    res.status(200).send({
      success: true,
      data: followerData,
    });
  } catch (error) {
    errorHandler(error, "Failed to get user followers");
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

    if (followingData.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User is not following anyone",
      });
    }

    res.status(200).send({
      success: true,
      data: followingData,
    });
  } catch (error) {
    errorHandler(error, "Failed to get user followings");
  }
}

module.exports = {
  followNewUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowings,
};
