import { Skeleton } from "@/components/ui/skeleton";

const CommentsLoading = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-start space-x-3">
          {/* Avatar Skeleton */}
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            {/* Username Skeleton */}
            <Skeleton className="w-24 h-4 rounded" />

            {/* Comment Text Skeleton */}
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-3/4 h-4 rounded" />

            {/* Timestamp & Like Count */}
            <div className="flex space-x-2">
              <Skeleton className="w-10 h-3 rounded" />
              <Skeleton className="w-16 h-3 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsLoading;
