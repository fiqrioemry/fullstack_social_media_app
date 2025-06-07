import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  step: 1,
  user: null,
  socket: null,
  loading: false,
  onlineUsers: [],
  accessToken: null,
  checkingAuth: true,

  resetStep: () => set({ step: 1 }),

  setAccessToken: (accessToken) => set({ accessToken }),

  authCheck: async () => {
    try {
      const user = await callApi.authCheck();
      get().connectSocket();
      set({ user });
    } catch {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  signup: async (formData, navigate) => {
    set({ loading: true });
    try {
      const step = get().step;
      if (step === 1) {
        const { message } = await callApi.sendOTP(formData);
        toast.success(message);
        set({ step: 2 });
      } else if (step === 2) {
        const { message } = await callApi.verifyOTP(formData);
        toast.success(message);
        set({ step: 3 });
      } else if (step === 3) {
        const { message } = await callApi.signup(formData);
        toast.success(message);
        set({ step: 1 });
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  signin: async (formData) => {
    set({ loading: true });
    try {
      const { message, accessToken } = await callApi.signin(formData);
      set({ accessToken });
      toast.success(message);
      await get().authCheck();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  signout: async () => {
    try {
      set({ loading: true });
      const { message } = await callApi.signout();
      get().disconnectSocket();
      set({ user: null, accessToken: null });
      toast.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      auth: {
        userId: user.userId,
      },
    });

    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
