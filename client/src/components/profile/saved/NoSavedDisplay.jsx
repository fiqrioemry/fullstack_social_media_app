import { Bookmark } from "lucide-react";

const NoSavedDisplay = () => {
  return (
    <div className="py-14 pb-14 md:pb-8">
      <div className="flex flex-col items-center gap-4">
        <Bookmark className="p-4 w-24 h-24 rounded-full border" />
        <h2>saved</h2>
        <p className="text-sm">
          Save photos and videos that you want to see again.
        </p>
        <p className="text-sm">
          No one is notified, and only you can see what you have saved.
        </p>
      </div>
    </div>
  );
};

export default NoSavedDisplay;
