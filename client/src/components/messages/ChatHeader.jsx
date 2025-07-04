/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

const ChatHeader = ({ selectedUser }) => {
  const { onlineUsers } = useAuthStore();
  return (
    <div className="flex items-center gap-4">
      <Avatar data={selectedUser} />
      <div className="flex flex-col items-start text-sm">
        <div>{selectedUser.username}</div>
        <div>
          {onlineUsers.includes(String(selectedUser.userId))
            ? "Online"
            : "Offline"}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
