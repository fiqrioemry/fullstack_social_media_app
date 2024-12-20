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
const { createCommentOrReply } = require("../../controller/comment");
const router = express.Router();

// post
router.get("/", isAuthenticate, getAllPublicPosts);
router.get("/:postId", isAuthenticate, getPostDetail);
router.get("/following", isAuthenticate, getFollowedPosts);
router.get("/user/:userId", isAuthenticate, getUserPosts);

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

router.delete("/:postId/delete", isAuthenticate, deleteMyPost);

// comment
router.post("/:postId/comment", isAuthenticate, createCommentOrReply);

module.exports = router;
