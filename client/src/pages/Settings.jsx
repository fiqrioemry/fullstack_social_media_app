import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import AvatarSetting from "@/components/settings/AvatarSetting";
import ProfileSetting from "@/components/settings/ProfileSetting";
import SettingsLoading from "@/components/skeleton/SettingsLoading";

const Settings = () => {
  const { getMyProfile, profile } = useUserStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  if (!profile) return <SettingsLoading />;

  return (
    <div className="flex justify-center py-6 mx-2">
      <div className="w-full max-w-xl md:max-w-3xl">
        <div className="flex md:flex-row flex-col gap-8">
          <AvatarSetting />
          <ProfileSetting />
        </div>
      </div>
    </div>
  );
};

export default Settings;
