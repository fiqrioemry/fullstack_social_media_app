/* eslint-disable react/prop-types */
import { Camera } from "lucide-react";

const NoPostsDisplay = ({ profile }) => {
  return (
    <div className="py-14 pb-14 md:pb-8">
      {profile.isMyProfile ? (
        <div className="flex flex-col items-center gap-4">
          <Camera className="p-4 w-24 h-24 rounded-full border" />
          <h2>No Photo yet</h2>
          <p className="text-sm">
            When you share photos, they will appear on your profile.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Camera className="p-4 w-24 h-24 rounded-full border" />
          <h2>No Photo yet</h2>
        </div>
      )}
    </div>
  );
};

export default NoPostsDisplay;
