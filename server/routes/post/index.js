const express = require("express");
const isAuthenticate = require("../../middleware.js/isAuthenticate");
const { upload } = require("../../middleware.js/media");
const {
  createNewPost,
  updateMyPost,
  deleteMyPost,
  getAllPublicPosts,
  getAllFollowingPosts,
  getUserPosts,
  getPostDetail,
} = require("../../controller/post");
const { createCommentOrReply } = require("../../controller/comment");
const router = express.Router();

// post
router.get("/explore", isAuthenticate, getAllPublicPosts);
router.get("/:postId/detail", isAuthenticate, getPostDetail);

// user post
router.get("", isAuthenticate, getAllFollowingPosts);
router.post(
  "/create",
  isAuthenticate,
  upload("mixed", 100000000).array("files", 10),
  createNewPost
);

router.put(
  "/:postId/update",
  isAuthenticate,
  upload("mixed", 100000000).array("files", 10),
  updateMyPost
);
router.delete("/:postId/delete", isAuthenticate, deleteMyPost);

// comment
router.post(
  "/:postId/comment/:commentId",
  isAuthenticate,
  createCommentOrReply
);

router.get("/:userId", isAuthenticate, getUserPosts);

module.exports = router;
