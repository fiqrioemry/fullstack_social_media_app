import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoading = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 md:col-span-4 flex justify-center">
        <Skeleton className="h-40 w-40 rounded-md" />
      </div>
      <div className="col-span-12 md:col-span-8 space-y-6 md:space-y-8">
        <Skeleton className="h-7 md:h-9 w-full rounded-md" />
        <Skeleton className="h-7 md:h-9 w-full rounded-md" />
        <Skeleton className="h-7 md:h-9 w-full rounded-md" />
        <Skeleton className="h-7 md:h-9 w-full rounded-md" />
        <Skeleton className="h-7 md:h-9 w-full rounded-md" />
        <Skeleton className="h-7 md:h-9 w-40 rounded-md" />
      </div>
    </div>
  );
};

export default SettingsLoading;
