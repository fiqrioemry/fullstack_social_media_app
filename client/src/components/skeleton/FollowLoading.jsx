import { Skeleton } from "@/components/ui/skeleton";

const FollowLoading = () => {
  return (
    <div>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>
        ))}
    </div>
  );
};

export default FollowLoading;
