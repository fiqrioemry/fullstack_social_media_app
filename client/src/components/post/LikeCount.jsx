/* eslint-disable react/prop-types */
const LikeCount = ({ data }) => {
  return <div>{data.likes > 0 && <span>{data.likes} likes</span>}</div>;
};

export default LikeCount;
