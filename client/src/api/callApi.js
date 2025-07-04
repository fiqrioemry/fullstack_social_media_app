import { authInstance, publicInstance } from '.';

const errorHandle = (error) => {
  const errorMessage = error.response?.data?.message || 'Something went wrong';

  return Promise.reject(new Error(errorMessage));
};

const callApi = {
  // 🔹Authentication API route management
  authCheck: async () => {
    return authInstance
      .get('/auth/me')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  signup: async (formData) => {
    return authInstance
      .post('/auth/signup', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  sendOTP: async (formData) => {
    return authInstance
      .post('/auth/send-otp', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  verifyOTP: async (formData) => {
    return authInstance
      .post('/auth/verify-otp', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  signin: async (formData) => {
    return authInstance
      .post('/auth/signin', formData)
      .then((res) => {
        return res.data;
      })
      .catch(errorHandle);
  },

  signout: async () => {
    return publicInstance
      .post('/auth/signout')
      .then((res) => {
        return res.data;
      })
      .catch(errorHandle);
  },

  refreshToken: async () => {
    return publicInstance
      .post('/auth/refresh')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // 🔹 User interaction API route management
  searchUser: async (username) => {
    return authInstance
      .get(`/user?query=${username}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getNotifications: async () => {
    return authInstance
      .get(`/user/notifications`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  markNotificationsAsRead: async () => {
    return authInstance
      .put(`/user/notifications`)
      .then((res) => res.data)
      .catch(errorHandle);
  },
  getUserProfile: async (username) => {
    return authInstance
      .get(`/user/${username}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getMyProfile: async () => {
    return authInstance
      .get('/user/profile')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updateProfile: async (formData) => {
    return authInstance
      .put('/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data)
      .catch(errorHandle);
  },

  toggleFollow: async (followingId) => {
    return authInstance
      .post(`/user/${followingId}/follow`)
      .then((res) => res.data.message)
      .catch(errorHandle);
  },

  getFollowers: async (username, limit) => {
    return authInstance
      .get(`/user/${username}/followers?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getFollowings: async (username, limit) => {
    return authInstance
      .get(`/user/${username}/followings?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // 🔹 social content API route management :
  getUserPosts: async (username) => {
    return authInstance
      .get(`/user/${username}/posts`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createPost: async (formData) => {
    return authInstance
      .post('/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updatePost: async (formData, postId) => {
    return authInstance
      .put(`/post/${postId}`, formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  deletePost: async (postId) => {
    return authInstance
      .delete(`/post/${postId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getPostDetail: async (postId) => {
    return authInstance
      .get(`/post/${postId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getPublicPosts: async (limit) => {
    return authInstance
      .get(`/post?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getPostsFromFollowings: async (limit) => {
    return authInstance
      .get(`/post/followings?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getAllSavedPosts: async () => {
    return authInstance
      .get(`/post/bookmark`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  toggleSavedPost: async (postId) => {
    return authInstance
      .post(`/post/bookmark/${postId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  //🔹Like and Comment API route management
  likePost: async (postId) => {
    return authInstance
      .post(`/post/${postId}/like/post`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  likeComment: async (commentId) => {
    return authInstance
      .post(`/post/${commentId}/like/comment`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getComments: async (postId, limit) => {
    return authInstance
      .get(`/post/${postId}/comments?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createComment: async (formData, postId) => {
    return authInstance
      .post(`/post/${postId}/comments`, formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  deleteComment: async (postId, commentId) => {
    return authInstance
      .delete(`/post/${postId}/comments/${commentId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getReplies: async (postId, commentId, limit) => {
    return authInstance
      .get(`/post/${postId}/comments/${commentId}?limit=${limit}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createReply: async (formData, postId, commentId) => {
    return authInstance
      .post(`/post/${postId}/comments/${commentId}`, formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  // Real Time Chat API's Management :
  getChats: async () => {
    return authInstance
      .get('/chat')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getChat: async (receiverId) => {
    return authInstance
      .get(`/chat/${receiverId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  sendChat: async (formData, receiverId) => {
    console.log(formData);
    console.log(receiverId);
    return authInstance
      .post(`/chat/${receiverId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data)
      .catch(errorHandle);
  },
};

export default callApi;
