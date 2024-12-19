const express = require("express");
const { getUserProfile, updateUserProfile } = require("../../controller/user");
const isAuthenticate = require("../../middleware.js/isAuthenticate");
const { upload } = require("../../middleware.js/media");
const router = express.Router();

router.get("/profile", isAuthenticate, getUserProfile);
router.put(
  "/profile/update",
  upload("image", 1000000).single("file"),
  isAuthenticate,
  updateUserProfile
);

module.exports = router;
