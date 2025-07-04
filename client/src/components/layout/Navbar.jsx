import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import MoreMenu from "@/components/sidebar/MoreMenu";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";

const Navbar = () => {
  const navigate = useNavigate();

  const { users, searching, searchUser } = useUserStore();

  const { searchForm, searchRef, openSearch, handleSearch } =
    useHandleSearch(searchUser);

  const handleNavigate = (user) => {
    handleSearch();
    searchForm.resetForm();
    navigate(`/${user.username}`);
  };

  const searchActive = cn(
    openSearch ? "w-0" : "w-14",
    "overflow-hidden delay-50 duration-300 ease-in-out transition-all"
  );

  const inputActive = cn(
    openSearch ? "w-full" : "w-auto",
    "flex-1 relative duration-300 px-2"
  );

  const resultActive = cn(
    searchForm?.values?.username?.length > 0 && openSearch
      ? "max-h-96"
      : "max-h-0",
    "absolute top-11 right-0 left-0 bg-background border-b border-muted overflow-hidden z-40 duration-300 ease-in-out px-2 transition-all"
  );

  return (
    <nav className="navbar ">
      {/* Logo */}
      <div className={searchActive}>
        <div className="flex justify-center">
          <img className="h-9 w-9" src="/M.png" />
        </div>
      </div>

      {/* search function */}
      <div ref={searchRef} className={inputActive}>
        <SearchInput handleSearch={handleSearch} searchForm={searchForm} />

        <div className={resultActive}>
          <SearchResult
            users={users}
            searching={searching}
            onClick={handleNavigate}
          />
        </div>
      </div>

      {/* dropdown menu settings */}
      <div className={searchActive}>
        <MoreMenu labelClass={"hidden"} />
      </div>
    </nav>
  );
};

export default Navbar;
