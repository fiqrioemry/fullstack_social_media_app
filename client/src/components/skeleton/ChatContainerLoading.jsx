import { Skeleton } from "@/components/ui/skeleton";

const ChatContainerLoading = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Skeleton className="h-12 rounded-md " />
      </div>
      <div className="flex-1 p-4 space-y-8">
        <div className="flex flex-col gap-4 items-start">
          <Skeleton className="w-1/2 h-6 rounded-md" />
          <Skeleton className="w-1/2 h-6 rounded-md" />
        </div>

        <div className="flex flex-col gap-4 items-end">
          <Skeleton className="w-1/2 h-6 rounded-md" />
          <Skeleton className="w-1/2 h-6 rounded-md" />
        </div>

        <div className="flex flex-col gap-4 items-start">
          <Skeleton className="w-1/2 h-6 rounded-md" />
          <Skeleton className="w-1/2 h-6 rounded-md" />
        </div>

        <div className="flex flex-col gap-4 items-end">
          <Skeleton className="w-1/2 h-6 rounded-md" />
          <Skeleton className="w-1/2 h-6 rounded-md" />
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="h-12 rounded-md " />
      </div>
    </div>
  );
};

export default ChatContainerLoading;
