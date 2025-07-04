/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";

const Caption = ({ post }) => {
  return (
    <div className="flex items-start gap-3">
      <Avatar data={post} />
      <div className="flex-1">
        <Link to={`${post.username}`} className="btn-secondary">
          {post.username}
        </Link>
        <div className="text-xs md:text-sm">{post.content}</div>
      </div>
    </div>
  );
};

export default Caption;
