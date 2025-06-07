// controller
const {
  createPost,
  deletePost,
  getPostDetail,
  getPublicPosts,
  toggleLikePost,
  getPostsFromFollowings,
} = require('../../controller/post');

const {
  getAllSavedPosts,
  toggleSavedPost,
} = require('../../controller/bookmark');

const {
  getReplies,
  createReply,
  getComments,
  createComment,
  deleteComment,
  toggleLikeComment,
} = require('../../controller/comment');

const router = require('express').Router();
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');

// saved post API Route management
router.get('/bookmark', isAuthenticate, getAllSavedPosts);
router.post('/bookmark/:postId', isAuthenticate, toggleSavedPost);

// post API Route manangement
router.get('/', isAuthenticate, getPublicPosts);
router.get('/followings', isAuthenticate, getPostsFromFollowings);
router.post('/', upload().array('images', 5), isAuthenticate, createPost);
router.delete('/:postId', isAuthenticate, deletePost);
router.get('/:postId', isAuthenticate, getPostDetail);

// like and unlike API Route management
router.post('/:postId/like/post', isAuthenticate, toggleLikePost);
router.post('/:commentId/like/comment', isAuthenticate, toggleLikeComment);

// comment & reply API Route management
router.get('/:postId/comments', isAuthenticate, getComments);
router.post('/:postId/comments', isAuthenticate, createComment);
router.get('/:postId/comments/:commentId', isAuthenticate, getReplies);
router.post('/:postId/comments/:commentId', isAuthenticate, createReply);
router.delete('/:postId/comments/:commentId', isAuthenticate, deleteComment);

module.exports = router;
