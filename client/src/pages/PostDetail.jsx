import NotFound from "./NotFound";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import DetailDisplay from "@/components/post-detail/DetailDisplay";
import PostDetailLoading from "@/components/skeleton/PostDetailLoading";

const PostDetail = () => {
  const { id } = useParams();
  const { post, getPostDetail } = usePostStore();

  useEffect(() => {
    getPostDetail(id);
  }, [getPostDetail, id]);

  if (!post) return <PostDetailLoading />;

  if (post.length === 0) return <NotFound />;

  return <DetailDisplay post={post} />;
};

export default PostDetail;
