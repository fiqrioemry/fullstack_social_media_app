const {
  searchUser,
  getMyProfile,
  updateProfile,
  getUserProfile,
} = require('../../controller/user');
const {
  followUser,
  getFollowers,
  getFollowings,
} = require('../../controller/follow');
const {
  markAsRead,
  getNotifications,
} = require('../../controller/notification');
const router = require('express').Router();
const { upload } = require('../../middleware/media');
const { getUserPosts } = require('../../controller/post');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.put('/notifications', isAuthenticate, markAsRead);
router.get('/notifications', isAuthenticate, getNotifications);
router.get('/profile', isAuthenticate, getMyProfile);
router.put(
  '/profile',
  upload().single('avatar'),
  isAuthenticate,
  updateProfile,
);
router.get('/', searchUser);
router.get('/:username', isAuthenticate, getUserProfile);
router.post('/:followingId/follow', isAuthenticate, followUser);
router.get('/:username/posts', isAuthenticate, getUserPosts);
router.get('/:username/followers', isAuthenticate, getFollowers);
router.get('/:username/followings', isAuthenticate, getFollowings);

module.exports = router;
