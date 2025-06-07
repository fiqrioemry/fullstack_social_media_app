/* eslint-disable react/prop-types */
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ConfirmationBox = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  cancelLabel = "cancel",
  confirmLabel = "confirm",
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="py-2 rounded-lg">
        <DialogTitle>
          <VisuallyHidden>Confirmation box</VisuallyHidden>
        </DialogTitle>
        <div className="text-center space-y-2">
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
        <div className="mt-4">
          <button
            className="btn btn-delete border-b border-t border-muted"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            {cancelLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationBox;
