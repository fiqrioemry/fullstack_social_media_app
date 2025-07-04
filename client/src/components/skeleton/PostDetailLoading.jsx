import { Skeleton } from "@/components/ui/skeleton";

const PostDetailLoading = () => {
  return (
    <div className="h-[75vh] md:h-[95vh] flex md:flex-row flex-col border border-muted rounded-md">
      {/* Galeri Foto */}

      <Skeleton className="h-full hidden md:block w-full md:w-6/12 lg:w-7/12" />

      <div className="w-full h-full md:w-6/12 lg:w-5/12 p-2">
        <div className="flex flex-col h-full">
          <Skeleton className="md:block hidden mb-2 h-12 w-full rounded-md" />
          <div className="flex md:hidden text-center items-center justify-center mb-4">
            <Skeleton className="h-8 w-40 rounded-md" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
          <Skeleton className="h-24 w-full rounded-md mb-2" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PostDetailLoading;
