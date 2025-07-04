import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  chat: null,
  chats: null,
  open: false,
  loading: false,
  selectedUser: null,

  handleOpen: () => {
    set((state) => ({
      open: !state.open,
    }));
  },

  getChats: async () => {
    try {
      const chats = await callApi.getChats();
      set({ chats });
    } catch (error) {
      console.error(error.message);
    }
  },

  getChat: async (userId) => {
    try {
      const { chat } = await callApi.getChat(userId);
      set({ chat });
    } catch (error) {
      console.error(error.message);
    }
  },

  sendChat: async (formData) => {
    const receiverId = get().selectedUser.userId;
    set({ loading: true });
    try {
      const { message, newChat } = await callApi.sendChat(formData, receiverId);
      toast.success(message);
      set({ chat: [...get().chat, newChat] });
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.warn("Socket belum tersedia di subscribeToMessages.");
      return;
    }

    socket.on("newChat", (newChat) => {
      const isMessageSentFromSelectedUser =
        newChat.senderId === selectedUser.userId;
      if (!isMessageSentFromSelectedUser) return;

      set({
        chat: [...get().chat, newChat],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newChat");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
