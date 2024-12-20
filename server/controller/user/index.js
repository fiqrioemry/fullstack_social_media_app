const { User, Profile, Follow, Post, PostGallery } = require("../../models");
const { uploadMediaToCloudinary } = require("../../utils/cloudinary");
const errorHandler = require("../../utils/errorHandler");
const { fn, col } = require("sequelize");

const getUserHomeDetails = async (req, res) => {
  const { username } = req.params;

  // Validasi username
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  try {
    // Cek apakah user ada menggunakan query hanya untuk data yang diperlukan
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "username"],
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Menghitung jumlah postingan tanpa memuat data postingan
    const postsCount = await user.countPosts();
    const followingsCount = await user.countFollowings();
    const followersCount = await user.countFollowers();

    // Respons dengan data user
    return res.status(200).send({
      success: true,
      data: {
        username: user.username,
        posts: postsCount,
        followers: followersCount,
        followings: followingsCount,
      },
    });
  } catch (error) {
    console.error("Error getting user home details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// async function getUserHomeDetails(req, res) {
//   const { username } = req.params;

//   try {
//     const user = await User.findOne({
//       where: { username },
//       attributes: [
//         "id",
//         "username",
//         // Menghitung jumlah followers menggunakan Follow model
//         [fn("COUNT", col("Followers.followerId")), "followersCount"],
//         // Menghitung jumlah following menggunakan Follow model
//         [fn("COUNT", col("Followings.followedId")), "followingCount"],
//       ],
//       include: [
//         {
//           model: User,
//           as: "Followers", // Relasi Followers
//           attributes: [], // Tidak mengambil data, hanya menghitung
//           through: { attributes: [] }, // Tidak perlu ambil data dari junction table (Follow)
//         },
//         {
//           model: User,
//           as: "Followings", // Relasi Followings
//           attributes: [], // Tidak mengambil data, hanya menghitung
//           through: { attributes: [] }, // Tidak perlu ambil data dari junction table (Follow)
//         },
//         {
//           model: Post,
//           attributes: ["id", "content"], // Menampilkan post user
//           include: [
//             {
//               model: PostGallery,
//               attributes: ["image"],
//             },
//           ],
//         },
//       ],
//       group: ["User.id"], // Group by User.id untuk agregasi COUNT
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: "Failed to get user details",
//       error: error.message,
//     });
//   }
// }

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
