/* eslint-disable react/prop-types */
import { PlusCircle } from "lucide-react";

const LoadMoreComment = ({ onClick, total, limit }) => {
  if (!total) return null;

  if (total <= limit) return null;

  return (
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="btn-secondary mb-2">
        <PlusCircle />
      </button>
    </div>
  );
};

export default LoadMoreComment;
