import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="flex justify-center py-6 mx-2">
      <div className="w-full max-w-xl md:max-w-2xl">
        <div className="flex md:flex-row flex-col items-center md:items-start md:gap-8 gap-2 mb-12">
          <Skeleton className="w-32 h-32 rounded-full overflow-hidden  flex-shrink-0" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-44">
                <Skeleton className="h-7 w-28" />
              </div>
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-28" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
