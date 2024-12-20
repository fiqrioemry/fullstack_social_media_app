const express = require("express");
const {
  updateUserProfile,
  getUserHomeDetails,
} = require("../../controller/user");
const isAuthenticate = require("../../middleware.js/isAuthenticate");
const { upload } = require("../../middleware.js/media");
const {
  followNewUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowings,
} = require("../../controller/follow");
const router = express.Router();

router.get("/profile/:username", isAuthenticate, getUserHomeDetails);
router.put(
  "/profile/update",
  upload("image", 1000000).single("file"),
  isAuthenticate,
  updateUserProfile
);

// follow
router.post("/follow/:followingId", isAuthenticate, followNewUser);
router.delete("/unfollow/:followingId", isAuthenticate, unfollowUser);
router.get("/followers/:userId", isAuthenticate, getUserFollowers);
router.get("/followings/:userId", isAuthenticate, getUserFollowings);

module.exports = router;
