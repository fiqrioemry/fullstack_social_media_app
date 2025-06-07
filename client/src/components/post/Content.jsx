/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Content = ({ data }) => {
  const parseContent = (text) => {
    return text.split(/(@\w+)/).map((part, index) => {
      if (part.startsWith("@")) {
        const username = part.substring(1);
        return (
          <Link key={index} to={`/${username}`} className="btn-accent">
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex-1 space-x-1">
      <Link to={`/${data.username}`} className="btn-secondary">
        {data.username}
      </Link>
      <span className="text-sm">{parseContent(data.content)}</span>
    </div>
  );
};

export default Content;
