/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const NoMorePosts = ({ limit, total }) => {
  const location = useLocation();
  const showButton = location.pathname === "/";

  if (limit <= total) return null;

  return (
    <div className="mt-10">
      <div className="text-center text-muted">
        <p>You have reached the end</p>
        <p>No more post to show</p>
      </div>
      {showButton && (
        <Link to="/explore" className="btn btn-secondary">
          Follow User For More
        </Link>
      )}
    </div>
  );
};

export default NoMorePosts;
