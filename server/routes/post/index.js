const express = require("express");
const isAuthenticate = require("../../middleware.js/isAuthenticate");
const { upload } = require("../../middleware.js/media");
const {
  createNewPost,
  updateMyPost,
  deleteMyPost,
  getAllPublicPosts,
  getFollowedPosts,
  getUserPosts,
  getPostDetail,
} = require("../../controller/post");
const router = express.Router();

router.get("/", isAuthenticate, getAllPublicPosts);
router.get("/following", isAuthenticate, getFollowedPosts);
router.get("/user/:userId", isAuthenticate, getUserPosts);
router.get("/detail/:postId", isAuthenticate, getPostDetail);

router.post(
  "/add",
  isAuthenticate,
  upload("mixed", 100000000).array("files", 10),
  createNewPost
);

router.put(
  "/update/:postId",
  isAuthenticate,
  upload("mixed", 100000000).array("files", 10),
  updateMyPost
);

router.delete("/delete/:postId", isAuthenticate, deleteMyPost);

module.exports = router;
