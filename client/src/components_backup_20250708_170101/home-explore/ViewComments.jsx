/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const ViewComments = ({ post }) => {
  const location = useLocation();

  return (
    <>
      <div className="text-foreground">{post.content}</div>
      {post.comments > 0 && (
        <Link
          to={`/p/${post.postId}`}
          state={{ background: location }}
          className="text-xs md:text-sm text-muted-foreground"
        >
          View all {post.comments} comments
        </Link>
      )}
    </>
  );
};

export default ViewComments;
