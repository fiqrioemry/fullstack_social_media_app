import { useEffect } from "react";
import UserDisplay from "./UserDisplay";
import { useChatStore } from "@/store/useChatStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListLoading from "@/components/skeleton/ChatListLoading";

const SidebarChatLists = () => {
  const { chats, getChats, loading, setSelectedUser } = useChatStore();

  useEffect(() => {
    getChats();
  }, [getChats, loading]);

  if (!chats) return <ChatListLoading />;

  if (chats.length === 0) return null;

  return (
    <ScrollArea className="flex-1 overflow-y-auto px-2">
      {chats.map((chat) => (
        <button
          key={chat.userId}
          onClick={() => setSelectedUser(chat)}
          className="btn btn-nav mt-2 justify-center md:justify-start"
        >
          <UserDisplay user={chat} />
        </button>
      ))}
    </ScrollArea>
  );
};

export default SidebarChatLists;
