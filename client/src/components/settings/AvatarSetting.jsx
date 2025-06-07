import { profileControl } from "@/config";
import { Camera, Loader } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";

const AvatarSetting = () => {
  const { updateProfile, profile, loading } = useUserStore();
  const avatarForm = useFormSchema(profile, profileControl, updateProfile);
  console.log(profile);
  const { singleFile } = useFileUpload(
    avatarForm.setFieldValue,
    avatarForm.values.avatar,
    updateProfile
  );

  return (
    <div className="flex flex-col justify-center md:justify-start items-center gap-4 ">
      {/* avatar picture */}
      <div className="w-40 h-40 border border-muted">
        <img
          className="w-full h-full object-cover"
          src={profile?.avatar}
          alt={`${profile.username}`}
        />
      </div>

      {/* update avatar form */}
      <button className="relative btn btn-selection" disabled={loading}>
        {loading ? (
          <>
            <Loader className="animate-spin" />
            <span>uploading</span>
          </>
        ) : (
          <>
            <Camera />
            <span>change avatar</span>
          </>
        )}
        <label
          htmlFor="avatar"
          className="absolute top-0 right-0 left-0 bottom-0 z-10"
        >
          <input
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            className="hidden"
            disabled={loading}
            onChange={singleFile}
          />
        </label>
      </button>
    </div>
  );
};

export default AvatarSetting;
