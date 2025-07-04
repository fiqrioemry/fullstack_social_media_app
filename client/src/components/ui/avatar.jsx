/* eslint-disable react/prop-types */
const Avatar = ({ data }) => {
  return (
    <div className="flex-shrink-0">
      <img
        src={data.avatar}
        alt={data.username}
        className="md:w-9 md:h-9 h-7 w-7 border border-muted rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
