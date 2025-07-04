/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import NotFound from "./NotFound";
import NavTabs from "@/components/profile/NavTabs";
import { useUserStore } from "@/store/useUserStore";
import { Outlet, useParams } from "react-router-dom";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileLoading from "@/components/skeleton/ProfileLoading";

const Profile = () => {
  const { username } = useParams();
  const { profile, getUserProfile } = useUserStore();

  useEffect(() => {
    getUserProfile(username);
  }, [username]);

  if (!profile) return <ProfileLoading />;

  if (profile.length === 0) return <NotFound />;

  return (
    <div className="flex justify-center py-6 mx-2">
      <div className="w-full max-w-xl md:max-w-2xl">
        <ProfileInfo profile={profile} />
        <NavTabs profile={profile} />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
