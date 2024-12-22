import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { SquarePlus, SquareX } from "lucide-react";
import CarouselPostImage from "./post/CarouselPostImage";

const CreatePost = () => {
  const { postModal, handleClosePostModal } = useAuth();
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const newMediaFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setMediaFiles((prev) => [...prev, ...newMediaFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);
    const newMediaFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setMediaFiles((prev) => [...prev, ...newMediaFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {postModal.createPost && (
        <div
          onClick={() => handleClosePostModal("createPost")}
          className="fixed top-0 right-0 left-0 bottom-0 bg-background/80 z-30 flex items-center justify-center"
        >
          <SquareX
            onClick={() => handleClosePostModal("createPost")}
            className="absolute top-10 right-10 cursor-pointer"
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[375px] h-[375px] bg-accent rounded-xl relative z-60"
          >
            {/* Header */}
            <div className="text-center py-3 border-b border-white">
              <h5 className="font-semibold">Create New Post</h5>
            </div>

            {/* Media Upload Area */}
            <div
              className="h-full rounded-b-xl overflow-hidden"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {mediaFiles.length === 0 ? (
                <div>
                  <div className="text-center py-3">Drag & drop media here</div>

                  <div>
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer bg-blue-500 px-3 py-2 rounded-md"
                    >
                      Select From Computer
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*, video/*"
                      multiple
                      className="hidden"
                      onChange={handleMediaChange}
                    />
                  </div>
                </div>
              ) : (
                <CarouselPostImage mediaFiles={mediaFiles} />
              )}
            </div>

            {mediaFiles.length > 0 && (
              <>
                <label
                  htmlFor="addMoreInput"
                  className="absolute -bottom-8 left-10 bg-blue-500  p-2 rounded-full cursor-pointer"
                >
                  <SquarePlus size={20} />
                </label>
              </>
            )}
            <input
              type="file"
              id="addMoreInput"
              accept="image/*, video/*"
              multiple
              className="hidden"
              onChange={handleMediaChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
