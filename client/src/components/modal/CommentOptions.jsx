/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Ellipsis } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCommentStore } from "@/store/useCommentStore";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CommentOptions = ({ data }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const { deleteComment } = useCommentStore();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteComment(data);
    setOpen(false);
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
          <VisuallyHidden>comment options</VisuallyHidden>
        </DialogTitle>
        <button
          className="btn btn-delete border-b border-muted"
          onClick={user.userId === data.userId ? handleDelete : handleReport}
        >
          {user.userId === data.userId ? "Delete" : "Report"}
        </button>

        <button className="btn btn-secondary" onClick={handleClose}>
          close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default CommentOptions;
