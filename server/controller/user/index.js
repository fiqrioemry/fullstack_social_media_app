const { User, Profile } = require("../../models");
const { uploadMediaToCloudinary } = require("../../utils/cloudinary");

// get user home detail info
const getUserHomeDetails = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "username"],
      include: [
        { model: Profile, attributes: ["firstname", "lastname", "bio"] },
      ],
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const [followingsCount, followersCount, postsCount] = await Promise.all([
      user.countFollowings(),
      user.countFollowers(),
      user.countPosts(),
    ]);

    return res.status(200).send({
      success: true,
      data: {
        user: user,
        posts: postsCount,
        followers: followersCount,
        followings: followingsCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrive user home details",
      error: error.message,
    });
  }
};

// get user profile in setting
async function getMyProfile(req, res) {
  try {
    const { userId } = req.user;

    const profileData = await Profile.findOne({ where: { userId } });

    if (!profileData)
      return res
        .status(404)
        .send({ success: false, message: "Profile is not found" });

    return res.status(200).send({ success: true, data: profileData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrive user profile",
      error: error.message,
    });
  }
}

// update user profile in setting
async function updateMyProfile(req, res) {
  const { userId } = req.user;

  const { firstname, lastname, bio, birthday, gender, avatar } = req.body;

  try {
    const profileData = await Profile.findOne({ where: { userId } });

    if (!profileData) {
      return res
        .status(404)
        .send({ success: false, message: "Profile not found" });
    }

    let updatedAvatar = avatar;

    if (req.file) {
      const newAvatar = await uploadMediaToCloudinary(req.file.path);
      updatedAvatar = newAvatar.secure_url;
    }

    const isDataUpdated =
      profileData.firstname === firstname &&
      profileData.lastname === lastname &&
      profileData.bio === bio &&
      profileData.birthday === birthday &&
      profileData.gender === gender &&
      profileData.avatar === updatedAvatar;

    if (isDataUpdated) {
      return res.status(400).send({
        success: false,
        message: "No changes detected. Please modify the data before updating.",
      });
    }

    profileData.firstname = firstname;
    profileData.lastname = lastname;
    profileData.bio = bio;
    profileData.birthday = birthday;
    profileData.gender = gender;
    profileData.avatar = updatedAvatar;

    await profileData.save();

    return res.status(200).send({
      success: true,
      message: "Profile is updated.",
      data: profileData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
}

module.exports = { getMyProfile, updateMyProfile, getUserHomeDetails };
