const express = require("express");
const { getUserProfile, updateUserProfile } = require("../../controller/user");
const isAuthenticate = require("../../middleware.js/isAuthenticate");
const router = express.Router();

router.get("/profile", isAuthenticate, getUserProfile);
router.put("/profile/update", isAuthenticate, updateUserProfile);

module.exports = router;
