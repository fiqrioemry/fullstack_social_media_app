import { Skeleton } from "@/components/ui/skeleton";

const UserPostsLoading = () => {
  return (
    <div className="grid grid-cols-3 gap-1 pb-14 md:pb-8">
      <Skeleton className="h-44 md:h-48 animate-pulse rounded-none" />
      <Skeleton className="h-44 md:h-48 animate-pulse rounded-none" />
      <Skeleton className="h-44 md:h-48 animate-pulse rounded-none" />
      <Skeleton className="h-44 md:h-48 animate-pulse rounded-none" />
      <Skeleton className="h-44 md:h-48 animate-pulse rounded-none" />
      <Skeleton className="h-44 md:h-48 animate-pulse rounded-none" />
    </div>
  );
};

export default UserPostsLoading;
