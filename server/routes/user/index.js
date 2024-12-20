const {
  getMyProfile,
  updateMyProfile,
  getUserHomeDetails,
} = require("../../controller/user");
const {
  unfollowUser,
  followNewUser,
  getUserFollowers,
  getUserFollowings,
} = require("../../controller/follow");
const express = require("express");
const { upload } = require("../../middleware.js/media");
const isAuthenticate = require("../../middleware.js/isAuthenticate");

const router = express.Router();
// user profile setting
router.get("/profile", isAuthenticate, getMyProfile);
router.put(
  "/profile/update",
  upload("image").single("file"),
  isAuthenticate,
  updateMyProfile
);

// user home detail
router.get("/:username", isAuthenticate, getUserHomeDetails);

// followers and followings
router.get("/:username/followers", isAuthenticate, getUserFollowers);
router.get("/:username/followings", isAuthenticate, getUserFollowings);

// follow and unfollow
router.post("/:followingId/follow", isAuthenticate, followNewUser);
router.delete("/:followingId/unfollow", isAuthenticate, unfollowUser);

module.exports = router;
