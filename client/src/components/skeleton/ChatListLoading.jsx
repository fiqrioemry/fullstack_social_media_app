import { Skeleton } from "@/components/ui/skeleton";

const ChatListLoading = () => {
  return (
    <div>
      <div className="flex-1 px-2 py-4 space-y-4 ">
        {[...Array(4)].map((_, index) => (
          <div className="flex items-center justify-center gap-2" key={index}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-40 rounded-md hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatListLoading;
