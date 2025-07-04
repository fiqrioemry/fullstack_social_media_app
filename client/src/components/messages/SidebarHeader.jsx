import { MessageSquareMore } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import UserDisplay from "@/components/messages/UserDisplay";

const SidebarHeader = () => {
  const { user } = useAuthStore();
  const { handleOpen } = useChatStore();

  return (
    <div className="border-b border-muted flex items-center justify-center md:justify-between p-2">
      <div className="hidden md:block px-2">
        <UserDisplay user={user} />
      </div>

      <button
        onClick={handleOpen}
        className="btn-secondary text-xs md:text-md h-10"
      >
        <MessageSquareMore className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
      </button>
    </div>
  );
};

export default SidebarHeader;
