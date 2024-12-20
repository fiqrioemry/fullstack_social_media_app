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

router.get("/profile", isAuthenticate, getMyProfile);
router.put(
  "/profile/update",
  upload("image").single("file"),
  isAuthenticate,
  updateMyProfile
);
router.get("/profile/:username", isAuthenticate, getUserHomeDetails);

router.post("/follow/:followingId", isAuthenticate, followNewUser);
router.get("/followers/:userId", isAuthenticate, getUserFollowers);
router.get("/followings/:userId", isAuthenticate, getUserFollowings);
router.delete("/unfollow/:followingId", isAuthenticate, unfollowUser);

module.exports = router;
