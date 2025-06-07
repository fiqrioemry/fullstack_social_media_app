/* eslint-disable react/prop-types */
import Content from "@/components/post/Content";
import Avatar from "@/components/ui/Avatar.jsx";
import Replies from "@/components/post/Replies.jsx";
import useScrollToView from "@/hooks/useScrollToView";
import LikeComment from "@/components/post/LikeComment";
import Timestamp from "@/components/post/Timestamp.jsx";
import LikeCount from "@/components/post/LikeCount.jsx";
import ReplyButton from "@/components/post/ReplyButton.jsx";
import CommentsLoading from "@/components/skeleton/CommentsLoading.jsx";
import CommentOptions from "../modal/CommentOptions";

const Comments = ({ comments, loading }) => {
  const { viewRef } = useScrollToView(loading);

  if (!comments) return <CommentsLoading />;

  return (
    <>
      {comments.map((comment) => (
        <div
          ref={viewRef}
          key={comment.commentId}
          className="flex space-x-2 py-2"
        >
          <Avatar data={comment} />
          <div className="flex-1">
            <div className="flex space-x-2">
              <Content data={comment} />
              <LikeComment data={comment} />
            </div>

            <div className="text-xs flex items-center gap-2">
              <Timestamp data={comment} />
              <LikeCount data={comment} />
              <ReplyButton data={comment} />
              <CommentOptions data={comment} />
            </div>

            <Replies comment={comment} />
          </div>
        </div>
      ))}

      {loading && <CommentsLoading />}
    </>
  );
};

export default Comments;
