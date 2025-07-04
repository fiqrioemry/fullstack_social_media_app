import SidebarHeader from "@/components/messages/SidebarHeader";
import SidebarChatLists from "@/components/messages/SidebarChatLists";

const ChatSidebar = () => {
  return (
    <div className="flex flex-col h-full">
      <SidebarHeader />
      <SidebarChatLists />
    </div>
  );
};

export default ChatSidebar;
