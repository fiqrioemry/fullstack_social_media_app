import { useChatStore } from "@/store/useChatStore";
import ChatSidebar from "@/components/messages/ChatSidebar";
import ChatContainer from "@/components/messages/ChatContainer";
import NoChatSelected from "@/components/messages/NoChatSelected";
import SearchUserForChat from "@/components/messages/SearchUserForChat";

export default function Messages() {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex-1 flex overflow-y-auto md:h-screen h-[calc(100vh-56px-56px)]">
      <SearchUserForChat />

      <div className="w-1/6 md:w-1/4 h-full border-r border-muted">
        <ChatSidebar />
      </div>

      <div className="w-5/6 md:w-3/4 h-full flex flex-col ">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
}
