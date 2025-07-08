import { useEffect } from "react";
import SavedDisplay from "./saved/SavedDisplay";
import NoSavedDisplay from "./saved/NoSavedDisplay";
import { usePostStore } from "@/store/usePostStore";
import UserPostsLoading from "@/components/skeleton/UserPostsLoading";

const ProfilePosts = () => {
  const { getAllSavedPosts, saved } = usePostStore();
  console.log(saved);

  useEffect(() => {
    getAllSavedPosts();
  }, [getAllSavedPosts]);

  if (!saved) return <UserPostsLoading />;

  if (saved.length === 0) return <NoSavedDisplay />;

  return <SavedDisplay saved={saved} />;
};

export default ProfilePosts;
