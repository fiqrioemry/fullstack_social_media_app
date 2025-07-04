const { Op } = require('sequelize');
const { User, Profile, sequelize } = require('../../models');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/deleteFromCloudinary');

async function updateProfile(req, res) {
  const file = req.file;
  const userId = req.user.userId;
  const transaction = await sequelize.transaction();
  let { fullname, bio, birthday, gender, avatar } = req.body;

  try {
    const profile = await Profile.findOne({ where: { userId }, transaction });

    if (!profile) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Profile not found' });
    }

    let uploadedImage;

    // Jika file ada, upload ke Cloudinary dan timpa avatar
    if (file?.buffer) {
      try {
        uploadedImage = await uploadToCloudinary(file.buffer, file.mimetype);

        // Hapus avatar lama jika ada
        if (profile.avatar) {
          await deleteFromCloudinary(profile.avatar);
        }

        avatar = uploadedImage.secure_url;
      } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: 'Failed to upload avatar' });
      }
    }

    // Cek apakah ada perubahan sebelum menyimpan
    const isUpdated =
      (bio !== undefined && bio !== profile.bio) ||
      (gender !== undefined && gender !== profile.gender) ||
      (birthday !== undefined && birthday !== profile.birthday) ||
      (fullname !== undefined && fullname !== profile.fullname) ||
      (avatar !== undefined && avatar !== profile.avatar);

    if (!isUpdated) {
      await transaction.rollback();
      return res.status(400).json({
        message: 'No changes detected',
      });
    }

    // Update profile (biarkan kosong jika memang kosong, tapi tidak undefined)
    if (avatar !== undefined) profile.avatar = avatar;
    if (bio !== undefined) profile.bio = bio;
    if (gender !== undefined) profile.gender = gender;
    if (birthday !== undefined) profile.birthday = birthday;
    if (fullname !== undefined) profile.fullname = fullname;

    await profile.save({ transaction });
    await transaction.commit();

    return res.status(200).json({
      message: 'Profile updated',
      profile,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function searchUser(req, res) {
  const { query } = req.query;
  try {
    const usersData = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${query}%` } },
          { '$profile.fullname$': { [Op.like]: `%${query}%` } },
        ],
      },
      attributes: ['id', 'username'],
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['fullname', 'avatar'],
        },
      ],
      limit: 5,
    });

    if (usersData.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    const users = usersData.map((user) => ({
      userId: user.id,
      username: user.username,
      avatar: user.profile?.avatar,
      fullname: user.profile?.fullname,
    }));

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getMyProfile(req, res) {
  const { userId } = req.user;
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Profile,
        as: 'profile',
      },
    });

    if (!user && user.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const profile = {
      userId: user.id,
      email: user.email,
      username: user.username,
      bio: user.profile.bio,
      avatar: user.profile.avatar,
      gender: user.profile.gender,
      fullname: user.profile.fullname,
      birthday: user.profile.birthday,
    };

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getUserProfile(req, res) {
  const { userId } = req.user;
  const { username } = req.params;

  try {
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Profile,
          as: 'profile',
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [followingsCount, followersCount, postsCount] = await Promise.all([
      user.countFollowings(),
      user.countFollowers(),
      user.countPosts(),
    ]);

    const isMyProfile = user.id === userId;

    const profile = {
      userId: user.id,
      username: user.username,
      fullname: user.profile.fullname,
      avatar: user.profile.avatar,
      bio: user.profile.bio,
      gender: user.profile.gender,
      posts: postsCount,
      followers: followersCount,
      followings: followingsCount,
      isMyProfile: isMyProfile,
      isFollowing: user.Followers.some((follow) => follow.id === userId),
    };

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  searchUser,
  getMyProfile,
  updateProfile,
  getUserProfile,
};
