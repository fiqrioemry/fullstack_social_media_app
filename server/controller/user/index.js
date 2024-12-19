const { User, Profile } = require("../../models");
const { uploadMediaToCloudinary } = require("../../utils/cloudinary");
const errorHandler = require("../../utils/errorHandler");

async function getUserHomeDetails(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      attributes: [
        "id",
        "username",
        "bio",
        [fn("COUNT", col("Followers.id")), "followersCount"],
        [fn("COUNT", col("Following.id")), "followingCount"],
      ],
      include: [
        {
          model: User,
          as: "Followers",
          attributes: [],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "Following",
          attributes: [],
          through: { attributes: [] },
        },
      ],
      group: ["User.id"],
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    errorHandler(error, "Failed to get user details");
  }
}

async function getUserProfile(req, res) {
  try {
    const { userId } = req.user;

    const profileData = await Profile.findOne({ where: { userId } });

    if (!profileData)
      return res
        .status(404)
        .send({ success: false, message: "Profile is not found" });

    return res.status(200).send({ success: true, data: profileData });
  } catch (error) {
    errorHandler(error, "Internal server Error");
  }
}

async function updateUserProfile(req, res) {
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

module.exports = { getUserProfile, updateUserProfile, getUserHomeDetails };
