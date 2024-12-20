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
router.get("/", isAuthenticate, getAllPublicPosts);
router.get("/:postId", isAuthenticate, getPostDetail);
router.get("/user/:userId", isAuthenticate, getUserPosts);
router.get("/follow/user", isAuthenticate, getAllFollowingPosts);
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

module.exports = router;
