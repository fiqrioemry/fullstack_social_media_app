import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useLoadChat = () => {
  const {
    chat,
    getChat,
    sendChat,
    loading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  useEffect(() => {
    if (selectedUser) {
      getChat(selectedUser.userId);
      subscribeToMessages();
    }
    return () => {
      unsubscribeFromMessages();
    };
  }, [getChat, selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  return { chat, sendChat, loading, selectedUser };
};

export default useLoadChat;
