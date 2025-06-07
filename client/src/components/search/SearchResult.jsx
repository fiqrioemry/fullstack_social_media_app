/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import SearchLoading from "@/components/skeleton/SearchLoading";

const SearchResult = ({ users, searching, onClick }) => {
  if (!users) return;

  if (searching) return <SearchLoading />;

  if (users.length === 0) return <p className="py-2">No Users Found</p>;

  return users.map((user) => (
    <button
      key={user.userId}
      onClick={() => onClick(user)}
      className="btn btn-nav justify-start"
    >
      <Avatar data={user} />
      <div className="flex flex-col items-start text-xs md:text-sm">
        <div>{user.username}</div>
        <p>{user.fullname}</p>
      </div>
    </button>
  ));
};

export default SearchResult;
