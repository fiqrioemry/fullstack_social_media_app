import PostsLoading from "./PostsLoading";
import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = () => {
  return (
    <div className="flex mx-2 md:mx-8 space-y-2">
      <div className="flex-1 px-2 md:px-8">
        <PostsLoading />
      </div>
      <div className="md:w-5/12 hidden md:block">
        <div className="flex justify-center py-4">
          <Skeleton className="w-80 h-80 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;
