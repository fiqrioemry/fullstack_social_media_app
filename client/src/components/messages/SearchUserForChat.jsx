import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const SearchUserForChat = () => {
  const { users, searching, searchUser } = useUserStore();
  const { setSelectedUser, handleOpen, open } = useChatStore();
  const { searchForm, searchRef, handleSearch } = useHandleSearch(searchUser);

  const handleNewChat = (user) => {
    handleOpen();
    setSelectedUser(user);
    searchForm.resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="p-4 rounded-lg">
        <div className="flex justify-end px-4 mb-2">
          <DialogClose asChild>
            <X />
          </DialogClose>
          <DialogTitle>
            <VisuallyHidden>Search a user</VisuallyHidden>
          </DialogTitle>
        </div>
        <div ref={searchRef} className="h-[26rem]">
          <SearchInput handleSearch={handleSearch} searchForm={searchForm} />

          {searchForm?.values?.username?.length > 0 && (
            <SearchResult
              users={users}
              searching={searching}
              onClick={handleNewChat}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUserForChat;
