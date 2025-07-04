import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import HomeLoading from "@/components/skeleton/HomeLoading";
import NoMorePosts from "@/components/home-explore/NoMorePosts";
import PostsDisplay from "@/components/home-explore/PostsDisplay";
import NoPostToShow from "@/components/home-explore/NoPostToShow";

const Home = () => {
  const { viewRef } = useScrollToView();
  const { getPostsFromFollowings, totalPosts, loading, posts } = usePostStore();

  const { limit, triggerRef } = useInfiniteScroll(
    getPostsFromFollowings,
    totalPosts
  );

  if (!posts) return <HomeLoading />;

  if (posts.length === 0) return <NoPostToShow />;

  return (
    <div className="flex mx-2 md:mx-8 space-y-2 relative">
      <div ref={viewRef} />

      <div className="flex-1 ">
        <PostsDisplay posts={posts} loading={loading} />
        <NoMorePosts limit={limit} total={totalPosts} />
        <div className="h-10" ref={triggerRef} />
      </div>

      <div className="w-5/12 hidden md:block"></div>
    </div>
  );
};

export default Home;
