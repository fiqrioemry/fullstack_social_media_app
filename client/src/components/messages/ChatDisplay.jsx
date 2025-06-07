/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

const ChatDisplay = ({ chat, selectedUser }) => {
  const { user } = useAuthStore();

  if (chat.length === 0) return <div className="mt-10">No Chat History</div>;

  return (
    <>
      <div className="space-y-2 py-4">
        {chat.map((message) => {
          const isSender = message.senderId == user.userId;

          return (
            <div
              key={message.timestamp}
              className={cn(
                isSender ? "justify-end" : "justify-start",
                "flex items-end space-x-2"
              )}
            >
              {!isSender && <Avatar data={selectedUser} className="w-8 h-8" />}

              <div
                className={cn(
                  isSender ? "bg-blue-500" : "bg-secondary",
                  "p-3 rounded-lg shadow-md max-w-xs"
                )}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="w-48 rounded-md mb-2"
                  />
                )}
                <div
                  className={cn(
                    isSender ? "text-end" : "text-start",
                    "text-sm"
                  )}
                >
                  {message.message}
                </div>
                <span
                  className={cn(
                    isSender ? "text-end" : "text-start",
                    "block mt-1 text-xs"
                  )}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatDisplay;
