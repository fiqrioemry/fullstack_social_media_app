import { Camera } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileTags = () => {
  const { user } = useAuthStore();
  const { profile } = useUserStore();

  if (!profile) return null;

  return (
    <div className="text-center space-y-3 py-12">
      <div className="flex items-center justify-center">
        <div className="p-4 rounded-full border">
          <Camera size={50} />
        </div>
      </div>
      {user.username === profile.username ? (
        <div className="space-y-6">
          <h2>PHOTOS OF YOU</h2>
          <div>When you share photos, they will appear on your profile.</div>
        </div>
      ) : (
        <div>
          <h2>no photos</h2>
        </div>
      )}
    </div>
  );
};

export default ProfileTags;
