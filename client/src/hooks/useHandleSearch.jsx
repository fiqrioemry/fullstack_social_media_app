import { searchState } from "@/config";
import { useFormSchema } from "./useFormSchema";
import { useCallback, useEffect, useRef, useState } from "react";

const useHandleSearch = (searchUser) => {
  const searchRef = useRef(null);
  const debounceRef = useRef(null);
  const searchForm = useFormSchema(searchState);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        searchForm.resetForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  const searchHandler = useCallback(() => {
    if (!searchForm.values.username.trim()) return;
    searchUser(searchForm.values.username);
  }, [searchForm.values.username, searchUser]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(searchHandler, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchForm.values.username, searchHandler]);

  return {
    searchForm,
    searchRef,
    openSearch,
    handleSearch,
  };
};

export default useHandleSearch;
