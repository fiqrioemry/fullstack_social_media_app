/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useUserStore } from "@/store/useUserStore";
import { usePostStore } from "@/store/usePostStore";
import { useAuthStore } from "@/store/useAuthStore";
import PostOptions from "@/components/modal/PostOptions";

const PostAuthor = ({ data }) => {
  const { user } = useAuthStore();
  const { toggleFollow } = useUserStore();
  const { updatePostsFollowStatus } = usePostStore();

  const handleFollow = useCallback(() => {
    toggleFollow(data.userId);
    updatePostsFollowStatus(data.userId);
  }, [toggleFollow, updatePostsFollowStatus, data.userId]);

  return (
    <div className="flex items-center gap-2 px-2 py-4">
      <Avatar data={data} />
      <div className="flex-1 flex items-center gap-2">
        <Link className="btn-secondary" to={`/${data.username}`}>
          {data.username}
        </Link>

        {data.userId !== user.userId && !data.isFollow && (
          <button onClick={handleFollow} className="btn-accent">
            Follow
          </button>
        )}
      </div>
      <PostOptions data={data} />
    </div>
  );
};

export default PostAuthor;
