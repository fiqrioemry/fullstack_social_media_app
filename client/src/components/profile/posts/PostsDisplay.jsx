/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { HeartIcon, MessageCircle } from "lucide-react";

const PostsDisplay = ({ posts }) => {
  const location = useLocation();

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div
          className="h-44 md:h-52 overflow-hidden relative group"
          key={post.postId}
        >
          <Link
            to={`/p/${post.postId}`}
            state={{ background: location }}
            className="absolute top-0 bottom-0 left-0 right-0 hover:bg-black/50 bg-transparent flex items-center justify-center duration-300"
          >
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-x-2 text-white">
                {post.likes}
                <HeartIcon />
              </div>
              <div className="flex gap-x-2 text-white">
                {post.comments}
                <MessageCircle />
              </div>
            </div>
          </Link>

          <img
            className="w-full h-full object-cover"
            src={post.images[0]}
            alt="image"
          />
        </div>
      ))}
    </div>
  );
};

export default PostsDisplay;
