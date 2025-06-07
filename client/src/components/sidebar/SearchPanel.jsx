/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";

const SearchPanel = ({ panelRef, openPanel, handleOpenPanel }) => {
  const navigate = useNavigate();

  const { users, searching, searchUser } = useUserStore();

  const { searchForm, searchRef, handleSearch } = useHandleSearch(searchUser);

  const handleNavigate = (user) => {
    handleOpenPanel();
    searchForm.resetForm();
    navigate(`/${user.username}`);
  };

  return (
    <div
      ref={panelRef}
      className={cn(openPanel ? "left-20" : "-left-96", "nav-search")}
    >
      <div ref={searchRef} className="mt-4 space-y-4 ">
        <h4 className="px-1">Search Panel</h4>
        <SearchInput searchForm={searchForm} handleSearch={handleSearch} />
        {searchForm?.values?.username?.length > 0 && (
          <SearchResult
            users={users}
            searching={searching}
            onClick={handleNavigate}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
