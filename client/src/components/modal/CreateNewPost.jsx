import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConfirmationBox from "./ConfirmationBox";
import { postControl, postState } from "@/config";
import Galleries from "@/components/post/Galleries";
import { usePostStore } from "@/store/usePostStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState, useCallback, useMemo } from "react";
import { CloudUpload, Loader, Plus } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";

// eslint-disable-next-line react/prop-types
export function CreateNewPost({ isOpen, setIsOpen }) {
  const { createPost, loading } = usePostStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formPost = useFormSchema(postState, postControl, createPost);
  const isFormDirty = useMemo(() => formPost.dirty, [formPost.dirty]);
  const { multiFile, handleDrop, handleDragOver } = useFileUpload(
    formPost.setFieldValue,
    formPost.values
  );

  const resetAndCloseDialog = useCallback(() => {
    formPost.resetForm();
    setIsOpen(false);
  }, [formPost, setIsOpen]);

  const handleCancel = useCallback(() => {
    if (isFormDirty) setShowConfirmation(true);
    else resetAndCloseDialog();
  }, [isFormDirty, resetAndCloseDialog]);

  const handleSave = useCallback(async () => {
    await formPost.submitForm();
    if (formPost.isValid) resetAndCloseDialog();
  }, [formPost, resetAndCloseDialog]);

  const handleCloseDialog = useCallback(() => {
    if (isFormDirty) setShowConfirmation(true);
    else resetAndCloseDialog();
  }, [isFormDirty, resetAndCloseDialog]);

  const handleConfirmation = useCallback(
    (confirmed) => {
      if (confirmed) resetAndCloseDialog();
      setShowConfirmation(false);
    },
    [resetAndCloseDialog]
  );

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (!open ? handleCloseDialog() : setIsOpen(open))}
      >
        <DialogContent className="w-96 max-w-2xl p-0 py-4 rounded-lg border-none bg-secondary">
          <DialogTitle>
            <VisuallyHidden>Search a user</VisuallyHidden>
          </DialogTitle>
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <Loader size={40} className="animate-spin" />
                <p>Uploading</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center border-b border-muted py-2">
                <h4 className="font-semibold">Create New Post</h4>
              </div>
              {formPost.values.images.length > 0 ? (
                <div>
                  <div className="relative h-96 flex justify-center items-center overflow-hidden">
                    <Galleries images={formPost.values.images} />
                    <div className="absolute bottom-2 left-2">
                      <label htmlFor="post">
                        <div className="flex justify-center items-center rounded-full bg-blue-500 h-10 w-10">
                          <Plus size={24} />
                        </div>
                        <input
                          id="post"
                          multiple
                          type="file"
                          accept="image/*"
                          className="hidden"
                          name="images"
                          onChange={multiFile}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 mb-4 px-2">
                    <Input
                      name="content"
                      value={formPost.values.name}
                      onChange={formPost.handleChange}
                      placeholder="Write a caption here ..."
                      className="outline-none focus:outline-none border border-muted-foreground"
                    />
                    <div className="flex justify-end gap-4 mt-4">
                      <Button onClick={handleCancel}>Cancel</Button>
                      <Button variant="accent" onClick={handleSave}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="post"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="h-80 z-10 flex items-center justify-center cursor-pointer bg-muted/50 hover:bg-muted transition-all duration-300"
                >
                  <div className="flex items-center justify-center flex-col">
                    <CloudUpload size={24} />
                    <label htmlFor="post" className="btn-accent">
                      Select Your Images
                    </label>
                  </div>
                  <input
                    id="post"
                    multiple
                    type="file"
                    accept="image/*"
                    className="hidden"
                    name="images"
                    onChange={multiFile}
                  />
                </label>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationBox
        open={showConfirmation}
        cancelLabel="Cancel"
        title="Discard post?"
        confirmLabel="Discard"
        confirmVariant="delete"
        onClose={() => setShowConfirmation(false)}
        onConfirm={() => handleConfirmation(true)}
        message="If you leave, your edits won't be saved."
      />
    </>
  );
}
