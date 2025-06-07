const {
  User,
  Profile,
  Follow,
  sequelize,
  Notification,
} = require('../../models');

async function followUser(req, res) {
  const userId = req.user.userId;
  const t = await sequelize.transaction();
  const followingId = parseInt(req.params.followingId);

  try {
    if (userId === followingId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const user = await User.findByPk(followingId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const following = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    if (following) {
      await following.destroy({ transaction: t });

      await Notification.destroy({
        where: {
          senderId: userId,
          receiverId: followingId,
          type: 'follow',
        },
        transaction: t,
      });
      await t.commit();
      return res.status(200).json({ message: 'You unfollowing this user' });
    }

    await Follow.create(
      {
        followerId: userId,
        followingId,
      },
      { transaction: t },
    );

    await Notification.create(
      {
        senderId: userId,
        receiverId: followingId,
        type: 'follow',
      },
      { transaction: t },
    );

    await t.commit();
    return res.status(201).json({ message: 'You Following this user' });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
}

async function getFollowers(req, res) {
  const userId = req.user.userId;
  const username = req.params.username;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userFollowers = await Follow.findAll({
      where: { followingId: user.id },
      limit,
      include: [
        {
          model: User,
          as: 'follower',
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

    const totalFollowers = await Follow.count({
      where: { followingId: user.id },
    });

    if (!userFollowers.length) {
      return res.status(200).json({
        followers: [],
        totalFollowers,
      });
    }

    const myFollowings = await Follow.findAll({
      where: { followerId: userId },
      attributes: ['followingId'],
    });

    const myFollowingIds = myFollowings.map((f) => f.followingId);

    const followers = userFollowers.map(({ follower }) => ({
      userId: follower.id,
      username: follower.username,
      avatar: follower.profile?.avatar,
      fullname: follower.profile?.fullname,
      isFollow: myFollowingIds.includes(follower.id),
    }));

    return res.status(200).json({ followers, totalFollowers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getFollowings(req, res) {
  const userId = req.user.userId;
  const username = req.params.username;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json('User not found');
    }

    const userFollowings = await Follow.findAll({
      where: { followerId: user.id },
      limit,
      include: [
        {
          model: User,
          as: 'following',
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

    const totalFollowings = await Follow.count({
      where: { followerId: user.id },
    });

    if (!userFollowings.length) {
      return res.status(200).json({
        followings: [],
        totalFollowings,
      });
    }
    const myFollowings = await Follow.findAll({
      where: { followerId: userId },
      attributes: ['followingId'],
    });

    const myFollowingIds = myFollowings.map((f) => f.followingId);

    const followings = userFollowings.map(({ following }) => ({
      userId: following.id,
      username: following.username,
      avatar: following.profile?.avatar,
      fullname: following.profile?.fullname,
      isFollow: myFollowingIds.includes(following.id),
    }));

    return res.status(200).json({ followings, totalFollowings });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  followUser,
  getFollowers,
  getFollowings,
};
