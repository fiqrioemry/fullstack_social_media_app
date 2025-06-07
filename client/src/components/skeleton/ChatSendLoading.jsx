import { Loader } from "lucide-react";

const ChatSendLoading = () => {
  return (
    <div className="flex space-x-2 justify-end">
      <div className="flex items-center justify-center p-3 rounded-lg bg-blue-500 text-foreground w-48">
        <Loader className="animate-spin" />
      </div>
    </div>
  );
};

export default ChatSendLoading;
