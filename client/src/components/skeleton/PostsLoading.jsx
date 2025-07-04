import { Skeleton } from "@/components/ui/skeleton";

const PostsLoading = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-48 rounded-md" />
      </div>
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
    </div>
  );
};

export default PostsLoading;
