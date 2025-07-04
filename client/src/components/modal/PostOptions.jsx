/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { Ellipsis } from "lucide-react";
import ConfirmationBox from "./ConfirmationBox";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { usePostStore } from "@/store/usePostStore";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PostOptions = ({ data }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const { toggleFollow } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { deletePost, updatePostsFollowStatus, removePostsByUserId } =
    usePostStore();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setSelectedPost(data.postId);
    setShowConfirmation(true);
  };
  const handleUnfollow = () => {
    setSelectedUser(data.userId);
    setShowConfirmation(true);
  };

  const handleFollow = () => {
    updatePostsFollowStatus(data.userId);
    toggleFollow(data.userId);
  };

  const handleConfirmDelete = () => {
    if (selectedPost) deletePost(data.postId, navigate);
    setShowConfirmation(false);
    setOpen(false);
  };

  const handleConfirmUnfollow = () => {
    if (selectedUser) toggleFollow(selectedUser);
    if (location === "/") removePostsByUserId(selectedUser);
    updatePostsFollowStatus(selectedUser);
    setShowConfirmation(false);
  };

  const handleReport = () => {
    toast.success("Report has been sent");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Ellipsis className="btn-secondary" />
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogTitle>
          <VisuallyHidden>post options</VisuallyHidden>
        </DialogTitle>
        <button
          className="btn btn-delete border-b border-muted"
          onClick={user.userId === data.userId ? handleDelete : handleReport}
        >
          {user.userId === data.userId ? "delete" : "report"}
        </button>
        {user.userId !== data.userId && (
          <button
            className={cn(
              "btn btn-delete border-b border-muted",
              !data.isFollow ? "text-blue-500 hover:text-blue-600" : ""
            )}
            onClick={data.isFollow ? handleUnfollow : handleFollow}
          >
            {data.isFollow ? "unfollow" : "follow"}
          </button>
        )}
        <Link
          to={
            location === `/p/${data.postId}`
              ? `/${data.username}`
              : `/p/${data.postId}`
          }
          className="btn btn-secondary border-b border-muted"
        >
          {location === `/p/${data.postId}` ? "go to profile" : "go to post"}
        </Link>
        <button className="btn btn-secondary" onClick={handleClose}>
          close
        </button>
      </DialogContent>

      <ConfirmationBox
        cancelLabel="Cancel"
        open={showConfirmation}
        confirmVariant="delete"
        onConfirm={
          user.userId === data.userId
            ? handleConfirmDelete
            : handleConfirmUnfollow
        }
        title={
          user.userId === data.userId
            ? "Delete Post"
            : `Unfollow ${data.username}?`
        }
        onClose={() => setShowConfirmation(false)}
        message={
          user.userId === data.userId
            ? "Are you sure want to delete this post ?"
            : "Are you sure you want to unfollow this user?"
        }
        confirmLabel={user.userId === data.userId ? "Delete Post" : "unfollow"}
      />
    </Dialog>
  );
};

export default PostOptions;
