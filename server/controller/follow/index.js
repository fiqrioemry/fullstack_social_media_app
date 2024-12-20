const { User, Follow } = require("../../models");

async function followNewUser(req, res) {
  const { userId } = req.user;
  const { followingId } = req.params;
  try {
    if (userId === followingId) {
      return res.status(400).send({
        success: false,
        message: "Cannot follow yourself",
      });
    }

    const user = await User.findByPk(followingId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId: userId, followingId: followingId },
    });

    if (existingFollow) {
      return res.status(400).send({
        success: false,
        message: "You are already following this user",
      });
    }

    // Buat follow baru
    await Follow.create({
      followerId: userId,
      followingId: followingId,
    });

    res.status(201).send({
      success: true,
      message: "Follow is success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to follow new user",
      error: error.message,
    });
  }
}

async function unfollowUser(req, res) {
  const { userId } = req.user;
  const { followingId } = req.params;

  try {
    if (userId === followingId) {
      return res.status(400).send({
        success: false,
        message: "Cannot unfollow yourself",
      });
    }

    const followRecord = await Follow.findOne({
      where: { followerId: userId, followingId },
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
    return res.status(500).send({
      success: false,
      message: "Failed to create new post",
      error: error.message,
    });
  }
}

async function getUserFollowers(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followers = await user.getFollowers({
      attributes: ["username"],
    });

    res.status(200).send({
      success: true,
      data: followers,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to create new post",
      error: error.message,
    });
  }
}

async function getUserFollowings(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followings = await user.getFollowings({
      attributes: ["username"],
    });

    res.status(200).send({
      success: true,
      data: followings,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to create new post",
      error: error.message,
    });
  }
}

module.exports = {
  followNewUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowings,
};
