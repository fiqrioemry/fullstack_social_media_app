import { useEffect, useState } from "react";
import { useCommentStore } from "@/store/useCommentStore";

const useLoadComments = (post) => {
  const [limit, setLimit] = useState(3);
  const { getComments, totalComments, comments, loading } = useCommentStore();

  const handleLoadMore = () => {
    setLimit((prev) => prev + 3);
  };

  useEffect(() => {
    if (post.postId) {
      getComments(post.postId, limit);
    }
  }, [getComments, post.postId, limit]);

  return {
    limit,
    loading,
    comments,
    totalComments,
    handleLoadMore,
  };
};

export default useLoadComments;
