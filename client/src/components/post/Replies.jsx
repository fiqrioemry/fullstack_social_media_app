/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Loader } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { useEffect, useState } from "react";
import Content from "@/components/post/Content";
import LikeCount from "@/components/post/LikeCount";
import Timestamp from "@/components/post/Timestamp";
import LikeComment from "@/components/post/LikeComment";
import ReplyButton from "@/components/post/ReplyButton";
import { useCommentStore } from "@/store/useCommentStore";
import CommentOptions from "../modal/CommentOptions";

const Replies = ({ comment }) => {
  const [limit, setLimit] = useState(0);

  const [showReply, setShowReply] = useState(false);

  const { replies, getReplies, loading } = useCommentStore();

  useEffect(() => {
    if (limit > 0) {
      getReplies(comment.postId, comment.commentId, limit);
    }
  }, [getReplies, comment, limit]);

  const handleHideReply = () => {
    setShowReply((prev) => !prev);
  };

  const handleShowReply = () => {
    setLimit((prev) => prev + 3);
    setShowReply(true);
  };

  useEffect(() => {
    if (replies[comment.commentId] && showReply === false) {
      handleShowReply();
    }
  }, [replies[comment.commentId]]);

  return (
    <div className="mt-2">
      {comment.replies > 0 && !replies[comment.commentId] && (
        <button
          onClick={handleShowReply}
          className="flex items-center space-x-2 text-muted-foreground"
        >
          <span className="text-xs"> view replies ({comment.replies}) </span>
          {loading[comment.commentId] && (
            <Loader size={18} className="animate-spin" />
          )}
        </button>
      )}

      {comment.replies > 0 && replies[comment.commentId] && (
        <>
          {comment.replies > limit && showReply ? (
            <button
              onClick={handleShowReply}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <span className="text-xs">
                view replies ({comment.replies - limit})
              </span>
              {loading[comment.commentId] && (
                <Loader size={18} className="animate-spin" />
              )}
            </button>
          ) : (
            <button
              onClick={handleHideReply}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              {showReply ? (
                <span className="text-xs"> hide replies </span>
              ) : (
                <span className="text-xs">
                  view replies ({comment.replies})
                </span>
              )}
              {loading[comment.commentId] && (
                <Loader size={18} className="animate-spin" />
              )}
            </button>
          )}
        </>
      )}

      {replies[comment.commentId] && showReply && (
        <>
          {replies[comment.commentId]?.map((reply) => (
            <div className="flex space-x-2 py-2" key={reply.replyId}>
              <Avatar data={reply} />
              <div className="flex-1">
                <Content data={reply} />
                <div className="text-xs flex items-center space-x-2">
                  <Timestamp data={reply} />
                  <LikeCount data={reply} />
                  <ReplyButton data={reply} />
                  <CommentOptions data={reply} />
                </div>
              </div>
              <LikeComment data={reply} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Replies;
