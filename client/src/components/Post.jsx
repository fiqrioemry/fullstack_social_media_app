import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { SquarePlus, List } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "../context/AuthProvider";

const CreatePost = () => {
  const { isModalActive, closeModal } = useAuth();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const newMediaFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setMediaFiles((prev) => [...prev, ...newMediaFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedMediaFiles = Array.from(mediaFiles);
    const [removed] = reorderedMediaFiles.splice(result.source.index, 1);
    reorderedMediaFiles.splice(result.destination.index, 0, removed);

    setMediaFiles(reorderedMediaFiles);
  };

  return (
    <>
      {/* Conditionally render modal based on isModalOpen state */}
      {isModalActive && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-background/80 z-30 flex items-center justify-center">
          {/* Close button */}
          <SquareX
            onClick={closeModal}
            className="absolute top-10 right-10 cursor-pointer"
          />
          <div className="w-[375px] h-[375px] bg-accent rounded-xl relative">
            {/* Header */}
            <div className="text-center py-3 border-b border-white">
              <h5 className="font-semibold">Create New Post</h5>
            </div>

            {/* Media Upload Area */}
            <div
              className={`flex flex-col items-center justify-center w-full h-full rounded-xl px-4 ${
                dragOver ? "bg-gray-200" : "bg-accent"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {mediaFiles.length === 0 ? (
                <>
                  <div className="text-center py-3">Drag & drop media here</div>

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
                </>
              ) : (
                <Carousel className="w-full">
                  <CarouselContent>
                    {mediaFiles.map((media, index) => (
                      <CarouselItem key={index}>
                        <div>
                          <Card>
                            <CardContent className="flex aspect-video items-center justify-center">
                              {media.type.startsWith("image") ? (
                                <img
                                  src={media.url}
                                  alt={`Uploaded ${index + 1}`}
                                  className="object-contain w-full h-full"
                                />
                              ) : media.type.startsWith("video") ? (
                                <video
                                  src={media.url}
                                  controls
                                  className="object-contain w-full h-full"
                                />
                              ) : null}
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {mediaFiles.length > 1 && <CarouselPrevious />}
                  {mediaFiles.length > 1 && <CarouselNext />}
                </Carousel>
              )}
            </div>

            {/* Add More & Reorder Buttons */}
            {mediaFiles.length > 0 && (
              <>
                <label
                  htmlFor="addMoreInput"
                  className="absolute -bottom-8 right-10 bg-blue-500 text-white p-2 rounded-full shadow-lg cursor-pointer"
                >
                  <SquarePlus size={20} />
                </label>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute -bottom-8 right-3 bg-gray-500 text-white p-2 rounded-full shadow-lg"
                >
                  <List size={20} />
                </button>
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

            {/* Drag-and-Drop Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-70">
                <div className="bg-white p-4 w-[350px] rounded-lg relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-500"
                  >
                    ✕
                  </button>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable
                      droppableId="mediaFiles"
                      direction="horizontal"
                      type="MEDIA"
                    >
                      {(provided) => (
                        <div
                          className="flex gap-3 overflow-x-auto p-2 bg-gray-100/80 rounded-md"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {mediaFiles.map((media, index) => (
                            <Draggable
                              key={media.url}
                              draggableId={media.url}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="w-24 h-24 flex-shrink-0 relative bg-blue-500"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  {media.type.startsWith("image") ? (
                                    <img
                                      src={media.url}
                                      alt={`Thumbnail ${index + 1}`}
                                      className="w-full h-full object-cover rounded-md border border-gray-300"
                                    />
                                  ) : media.type.startsWith("video") ? (
                                    <video
                                      src={media.url}
                                      className="w-full h-full object-cover rounded-md border border-gray-300"
                                    />
                                  ) : null}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
