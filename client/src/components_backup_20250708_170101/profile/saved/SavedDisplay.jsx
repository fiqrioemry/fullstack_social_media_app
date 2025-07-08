/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { HeartIcon, MessageCircle } from "lucide-react";

const SavedDisplay = ({ saved }) => {
  const location = useLocation();

  return (
    <div className="grid grid-cols-3 gap-1">
      {saved.map((save) => (
        <div
          className="h-44 md:h-52 overflow-hidden relative"
          key={save.postId}
        >
          <Link
            to={`/p/${save.postId}`}
            state={{ background: location }}
            className="absolute top-0 bottom-0 left-0 right-0 hover:bg-black/50 bg-transparent flex-center duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-x-2 text-white">
                {save.likes}
                <HeartIcon />
              </div>
              <div className="flex gap-x-2 text-white">
                {save.comments}
                <MessageCircle />
              </div>
            </div>
          </Link>

          <img
            className="w-full h-full object-cover"
            src={save.images[0]}
            alt="image"
          />
        </div>
      ))}
    </div>
  );
};

export default SavedDisplay;
