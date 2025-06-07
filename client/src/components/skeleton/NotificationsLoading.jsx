import { Skeleton } from "@/components/ui/skeleton";

const NotificationsLoading = () => {
  return (
    <div className="w-full max-w-3xl px-6 md:px-12 py-12 md:py-6 space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 bg-background border border-muted p-3 rounded-lg shadow-md"
        >
          {/* Skeleton Avatar */}
          <Skeleton className="w-10 h-10 rounded-full" />

          {/* Skeleton Text */}
          <div className="flex-1 space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-40 h-3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsLoading;
