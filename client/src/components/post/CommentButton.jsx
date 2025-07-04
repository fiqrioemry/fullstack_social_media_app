/* eslint-disable react/prop-types */
import { MessageCircle } from "lucide-react";
import { useCommentStore } from "@/store/useCommentStore";

const CommentButton = ({ data }) => {
  const { setSelectedComment } = useCommentStore();
  const handleComment = () => {
    setSelectedComment(data);
  };

  return (
    <div>
      <MessageCircle
        onClick={handleComment}
        className="btn-secondary"
        aria-label="Comment a Post"
      />
    </div>
  );
};

export default CommentButton;
