import FollowCard from "./FollowCard";
import NoFollowers from "./NoFollowers";
import { useEffect, useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import FollowLoading from "@/components/skeleton/FollowLoading";
import useScrollToView from "@/hooks/useScrollToView";

const Followers = () => {
  const { username } = useParams();
  const [limit, setLimit] = useState(3);
  const { getFollowers, totalFollows, follows, loading } = useUserStore();
  const { viewRef } = useScrollToView(loading);

  useEffect(() => {
    getFollowers(username, limit);
  }, [getFollowers, username, limit]);

  const handleShowMore = () => {
    setLimit((prev) => prev + 2);
  };

  if (!follows) return <FollowLoading />;

  if (follows.length === 0) return <NoFollowers />;

  return (
    <div className="flex flex-col h-80">
      <div className="flex items-center justify-center p-4 border-b border-muted relative">
        <h4>Followers</h4>
        <DialogClose className="absolute right-3">
          <X size={24} />
        </DialogClose>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        {follows.map((user) => (
          <FollowCard data={user} key={user.userId} />
        ))}
        {loading && (
          <div className="mb-5">
            <FollowLoading />
          </div>
        )}
        {!loading && limit < totalFollows && (
          <div ref={viewRef} className="flex items-center justify-center py-2">
            <button className="btn-secondary" onClick={handleShowMore}>
              <PlusCircle />
            </button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Followers;
