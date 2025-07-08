/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
import { useCommentStore } from "@/store/useCommentStore";

const LikeComment = ({ data }) => {
  const { likeComment } = useCommentStore();

  const handleLike = () => {
    likeComment(data.commentId, data.parentId);
  };

  return (
    <div className="py-2">
      <Heart
        size={14}
        onClick={handleLike}
        aria-label="Like a comment"
        className="btn-secondary"
        fill={data.isLiked ? "red" : "transparent"}
        stroke={data.isLiked ? "red" : "currentColor"}
      />
    </div>
  );
};

export default LikeComment;
