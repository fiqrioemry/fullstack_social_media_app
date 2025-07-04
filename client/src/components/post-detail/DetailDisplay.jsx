/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import Content from "@/components/post/Content";
import Comments from "@/components/post/Comments";
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import useLoadComments from "@/hooks/useLoadComments";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadMoreComment from "@/components/post/LoadMoreComment";

const DetailDisplay = ({ post }) => {
  const { limit, loading, comments, totalComments, handleLoadMore } =
    useLoadComments(post);

  return (
    <div className="mx-2 md:mx-8 py-6">
      <div className="h-[90vh] w-full flex md:flex-row flex-col border border-muted">
        <div className="h-full w-full md:w-6/12 lg:w-7/12 border-r border-muted">
          <Galleries images={post.images} />
        </div>

        <div className="h-full w-full md:w-6/12 lg:w-5/12">
          <div className="flex flex-col h-full">
            <div className="border-b border-muted">
              <PostAuthor data={post} />
            </div>

            <ScrollArea className="flex-1 border-b border-muted p-2">
              <div className="flex items-start gap-2 mb-2">
                <Avatar data={post} />
                <Content data={post} />
              </div>
              <Comments comments={comments} loading={loading[post.postId]} />
              <LoadMoreComment
                limit={limit}
                total={totalComments}
                onClick={handleLoadMore}
              />
            </ScrollArea>

            <div className="border-b border-muted px-2">
              <PostControl post={post} />
            </div>

            <div className="px-2">
              <PostInput postId={post.postId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDisplay;
