const { User, Profile } = require("../../models");
const { uploadMediaToCloudinary } = require("../../utils/cloudinary");

const getUserHomeDetails = async (req, res) => {
  const { username } = req.params;
  const { limit = 3 } = req.body;
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

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

    const [followingsCount, followersCount, posts] = await Promise.all([
      user.countFollowings(),
      user.countFollowers(),
      user.getPosts({
        limit,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "content", "createdAt"],
      }),
    ]);

    return res.status(200).send({
      success: true,
      data: {
        user: user,
        total: posts.length,
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

async function updateMyProfile(req, res) {
  try {
    const { userId } = req.user; // Assuming req.user is populated by middleware

    const { firstname, lastname, bio, birthday, gender, avatar } = req.body;

    // Find the profile by userId
    const profileData = await Profile.findOne({ where: { userId } });

    if (!profileData) {
      return res
        .status(404)
        .send({ success: false, message: "Profile not found" });
    }

    let updatedAvatar = avatar; // Initialize new variable for avatar

    if (req.file) {
      // If file is provided, upload it to Cloudinary
      const newAvatar = await uploadMediaToCloudinary(req.file.path);
      updatedAvatar = newAvatar.secure_url; // Update avatar with Cloudinary URL
    }

    // Check if the profile data has changed
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

    // Update profile fields
    profileData.firstname = firstname;
    profileData.lastname = lastname;
    profileData.bio = bio;
    profileData.birthday = birthday;
    profileData.gender = gender;
    profileData.avatar = updatedAvatar;

    // Save the updated profile data
    await profileData.save();

    return res.status(200).send({
      success: true,
      message: "Profile is updated.",
      data: profileData,
    });
  } catch (error) {
    // General error handling
    res.status(500).send({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
}

module.exports = { getMyProfile, updateMyProfile, getUserHomeDetails };
