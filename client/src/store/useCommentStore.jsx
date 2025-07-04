import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";
import { usePostStore } from "./usePostStore";

export const useCommentStore = create((set, get) => ({
  loading: {},
  replies: {},
  comments: [],
  totalComments: 0,
  selectedComment: null,

  setSelectedComment: (selectedComment) => {
    set({ selectedComment });
  },

  setReplies: (replies, commentId) => {
    set((state) => ({
      replies: { ...state.replies, [commentId]: replies },
    }));
  },

  createComment: async (formData, postId) => {
    try {
      const { message } = await callApi.createComment(formData, postId);
      usePostStore.getState().commentCount(postId);
      const limit = get().comments.length + 1;
      await get().getComments(postId, limit);
      toast.success(message);
    } catch (error) {
      console.error(error.message);
    }
  },

  getReplies: async (postId, commentId, limit) => {
    try {
      set((state) => ({
        loading: { ...state.loading, [commentId]: true },
      }));
      const { replies } = await callApi.getReplies(postId, commentId, limit);
      get().setReplies(replies, commentId);
    } catch (error) {
      console.error(error.message);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [commentId]: false },
      }));
    }
  },

  getComments: async (postId, limit) => {
    try {
      set((state) => ({
        loading: { ...state.loading, [postId]: true },
      }));
      const { comments, totalComments } = await callApi.getComments(
        postId,
        limit
      );
      set({ comments, totalComments });
    } catch (error) {
      console.error(error.message);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [postId]: false },
      }));
    }
  },

  updateRepliesCount: (commentId, increment = true) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              replies: Math.max(
                0,
                (comment.replies || 0) + (increment ? 1 : -1)
              ),
            }
          : comment
      ),
    }));
  },

  createReply: async (formData, postId) => {
    const comment = get().selectedComment;
    const commentId = comment?.parentId || comment.commentId;
    try {
      const { message } = await callApi.createReply(
        formData,
        postId,
        commentId
      );
      get().updateRepliesCount(commentId);
      await get().getReplies(postId, commentId);
      toast.success(message);
    } catch (error) {
      console.error(error.message);
    }
  },

  setDeletedComment: (parentId, commentId) => {
    set((state) => {
      if (parentId) {
        return {
          replies: {
            ...state.replies,
            [parentId]:
              state.replies[parentId]?.filter(
                (reply) => reply.commentId !== commentId
              ) || [],
          },
        };
      } else {
        return {
          comments: state.comments.filter((c) => c.commentId !== commentId),
        };
      }
    });
  },

  deleteComment: async (comment) => {
    const postId = comment?.postId;
    const parentId = comment?.parentId;
    const commentId = comment?.commentId;
    try {
      const { message } = await callApi.deleteComment(postId, commentId);
      get().setDeletedComment(parentId, commentId);
      get().updateRepliesCount(parentId, false);
      toast.success(message);
    } catch (error) {
      console.error(error.message);
    }
  },

  likeComment: async (commentId, parentId = null) => {
    try {
      const { message } = await callApi.likeComment(commentId);

      if (parentId) {
        get().setLikeReply(commentId, parentId);
      } else {
        get().setLikeComment(commentId);
      }
      toast.success(message);
    } catch (error) {
      console.error(error.message);
    }
  },

  setLikeReply: (commentId, parentId) => {
    set((state) => {
      const parentReplies = state.replies[parentId] || [];

      return {
        replies: {
          ...state.replies,
          [parentId]: parentReplies.map((reply) =>
            reply.commentId === commentId
              ? {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                }
              : reply
          ),
        },
      };
    });
  },

  setLikeComment: (commentId) => {
    set((state) => ({
      comment:
        state.comment?.commentId === commentId
          ? {
              ...state.comment,
              isLiked: !state.comment.isLiked,
              likes: state.comment.isLiked
                ? state.comment.likes - 1
                : state.comment.likes + 1,
            }
          : state.comment,

      comments: state.comments.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      ),
    }));
  },
}));
