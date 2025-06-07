import { Skeleton } from "@/components/ui/skeleton";

const SearchLoading = () => {
  return (
    <div className="flex justify-start gap-4">
      <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-6 animate-pulse" />
        <Skeleton className="h-6 animate-pulse" />
      </div>
    </div>
  );
};

export default SearchLoading;
