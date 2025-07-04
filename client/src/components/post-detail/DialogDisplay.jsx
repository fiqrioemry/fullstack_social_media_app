/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import Content from "@/components/post/Content";
import Comments from "@/components/post/Comments";
import PostInput from "@/components/post/PostInput";
import Galleries from "@/components/post/Galleries";
import useLoadComments from "@/hooks/useLoadComments";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadMoreComment from "@/components/post/LoadMoreComment";

const DialogDisplay = ({ post }) => {
  const { limit, loading, comments, totalComments, handleLoadMore } =
    useLoadComments(post);

  return (
    <div className="h-[75vh] md:h-[95vh] flex md:flex-row flex-col">
      {/* Galeri Foto */}
      <div className="hidden md:block w-full md:w-6/12 lg:w-7/12 border-r border-muted">
        <Galleries images={post.images} />
      </div>

      <div className="w-full h-full md:w-6/12 lg:w-5/12 border-r border-muted">
        <div className="flex flex-col h-full">
          <div className="md:block hidden border-b border-t border-muted">
            <PostAuthor data={post} />
          </div>

          {/* for mobile view */}
          <div className="block md:hidden py-4 border-b border-muted">
            <div className="text-center">
              <h4>Comments</h4>
            </div>
          </div>

          {/* comment & reply */}
          <ScrollArea className="flex-1 border-b border-muted px-2 ">
            <div className="flex items-start gap-2 mt-2 mb-2">
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

          {/* post control : reply & saved*/}
          <div className="border-b border-muted px-2">
            <PostControl post={post} />
          </div>

          {/* post input : comment */}
          <div className="px-2 border-b border-muted">
            <PostInput postId={post.postId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogDisplay;
