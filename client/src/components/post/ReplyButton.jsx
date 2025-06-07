import { useCommentStore } from "@/store/useCommentStore";

/* eslint-disable react/prop-types */
const ReplyButton = ({ data }) => {
  const { setSelectedComment } = useCommentStore();

  const handleComment = () => {
    setSelectedComment(data);
  };
  return (
    <button className="btn-secondary" onClick={handleComment}>
      Reply
    </button>
  );
};

export default ReplyButton;
