/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";

const BookmarkButton = ({ data }) => {
  const { toggleSavedPost } = usePostStore();

  const handleSavePost = () => {
    toggleSavedPost(data.postId);
  };

  return (
    <Bookmark
      size={24}
      aria-label="Bookmark a Post"
      onClick={handleSavePost}
      className={`cursor-pointer ${
        data.isSaved
          ? "text-foreground fill-foreground"
          : "text-current fill-transparent"
      }`}
    />
  );
};

export default BookmarkButton;
