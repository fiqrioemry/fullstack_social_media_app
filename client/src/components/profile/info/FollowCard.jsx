/* eslint-disable react/prop-types */
import { useState } from "react";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import ConfirmationBox from "@/components/modal/ConfirmationBox";

const FollowCard = ({ data }) => {
  const { user } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toggleFollow, setFollows, loading, setCountFollowings, profile } =
    useUserStore();

  const handleFollow = () => {
    setFollows(data.userId);
    if (profile.isMyProfile) {
      setCountFollowings(1);
    }
    toggleFollow(data.userId);
  };

  const handleUnfollowClick = () => {
    setSelectedUser(data.userId);
    setShowConfirmation(true);
  };

  const handleConfirmUnfollow = () => {
    if (selectedUser) toggleFollow(selectedUser);
    setFollows(selectedUser);
    if (profile.isMyProfile && data.isFollow) {
      setCountFollowings(-1);
    }
    setShowConfirmation(false);
  };

  return (
    <div className="flex justify-between items-center p-3">
      <div className="flex items-center gap-3">
        <Avatar data={data} />
        <div>
          <Link to={`/${data.username}`} className="btn-secondary">
            {data.username}
          </Link>
          <p className="text-muted-foreground">{data.fullname}</p>
        </div>
      </div>
      {data.userId !== user.userId && (
        <Button
          onClick={data.isFollow ? handleUnfollowClick : handleFollow}
          variant={data.isFollow ? "ghost" : "accent"}
        >
          {loading[data.userId] ? (
            <Loader className="animate-spin" />
          ) : data.isFollow ? (
            "Following"
          ) : (
            "Follow"
          )}
        </Button>
      )}
      <ConfirmationBox
        cancelLabel="Cancel"
        confirmLabel="Unfollow"
        open={showConfirmation}
        onConfirm={handleConfirmUnfollow}
        title={`Unfollow ${data.username}?`}
        onClose={() => setShowConfirmation(false)}
        message="Are you sure you want to unfollow this user?"
      />
    </div>
  );
};

export default FollowCard;
