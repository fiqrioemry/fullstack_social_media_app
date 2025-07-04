import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useUserStore = create((set, get) => ({
  users: null,
  profile: null,
  totalFollows: 0,
  follows: null,
  loading: false,
  searching: false,
  notification: null,

  getNotifications: async () => {
    try {
      const { notifications } = await callApi.getNotifications();
      set({ notifications });
    } catch (error) {
      set({ notifications: [] });
      console.error(error.message);
    }
  },

  setNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    }));
  },

  MarkNotificationsAsRead: async () => {
    try {
      await callApi.markNotificationsAsRead();
      get().setNotificationsAsRead();
    } catch (error) {
      console.error(error.message);
    }
  },

  searchUser: async (username) => {
    if (!username.trim()) return;
    set({ users: null, searching: true });
    try {
      const users = await callApi.searchUser(username);
      set({ users });
    } catch (error) {
      set({ users: [] });
      console.error(error.message);
    } finally {
      set({ searching: false });
    }
  },

  getFollowers: async (username, limit) => {
    set({ loading: true });
    try {
      const { followers, totalFollowers } = await callApi.getFollowers(
        username,
        limit
      );
      set({ follows: followers, totalFollows: totalFollowers });
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getFollowings: async (username, limit) => {
    set({ loading: true });
    try {
      const { followings, totalFollowings } = await callApi.getFollowings(
        username,
        limit
      );
      set({ follows: followings, totalFollows: totalFollowings });
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getUserProfile: async (username) => {
    set({ profile: null });
    try {
      const profile = await callApi.getUserProfile(username);
      set({ profile });
    } catch (error) {
      set({ profile: [] });
      console.error(error.message);
    }
  },

  getMyProfile: async () => {
    set({ profile: null });
    try {
      const profile = await callApi.getMyProfile();
      set({ profile });
    } catch (error) {
      set({ profile: [] });
      console.error(error.message);
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true });
    try {
      const { message, profile } = await callApi.updateProfile(formData);
      toast.success(message);
      set({ profile });
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  setProfile: (updateData) => {
    set((state) => ({
      profile: { ...state.profile, ...updateData },
    }));
  },

  setFollows: (followingId) => {
    set((state) => ({
      follows: state.follows.map((follow) =>
        follow.userId === followingId
          ? { ...follow, isFollow: !follow.isFollow }
          : follow
      ),
    }));
  },

  removeFollowings: (followingId) => {
    set((state) => ({
      follows: state.follows.filter((follow) => follow.userId !== followingId),
    }));
  },

  // for another user profile
  setCountFollowers: () => {
    set((state) => ({
      profile: {
        ...state.profile,
        followers:
          state.profile.followers + (state.profile.isFollowing ? -1 : 1),
        isFollowing: !state.profile.isFollowing,
      },
    }));
  },

  setCountFollowings: (value) => {
    set((state) => ({
      profile: {
        ...state.profile,
        followings: state.profile.followings + value,
        isFollowing: !state.profile.isFollowing,
      },
    }));
  },

  toggleFollow: async (followingId) => {
    try {
      const message = await callApi.toggleFollow(followingId);
      toast.success(message);
    } catch (error) {
      console.error(error.message);
    }
  },
}));
