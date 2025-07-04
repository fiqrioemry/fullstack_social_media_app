/* eslint-disable react/prop-types */
import LikePost from "./LikePost";
import LikeCount from "./LikeCount";
import CommentButton from "./CommentButton";
import { formatDateToISO } from "@/lib/utils";
import BookmarkButton from "./BookmarkButton";

const PostControl = ({ post }) => {
  return (
    <div className="space-y-1 py-2">
      <div className="flex items-center gap-4">
        <LikePost data={post} />
        <CommentButton data={post} />
        <BookmarkButton data={post} />
      </div>

      <div className="text-sm md:text-md min-h-12">
        <LikeCount data={post} />
        {formatDateToISO(post.createdAt)}
      </div>
    </div>
  );
};

export default PostControl;
