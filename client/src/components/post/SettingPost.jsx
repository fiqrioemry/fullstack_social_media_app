/* eslint-disable react/prop-types */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "lucide-react";

const SettingPost = ({ mediaFiles, handleDragEnd }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <List
            className="absolute -bottom-8 left-3 bg-gray-500 p-2 rounded-full cursor-pointer"
            size={35}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="rounded-lg relative">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable
                droppableId="mediaFiles"
                direction="horizontal"
                type="MEDIA"
              >
                {(provided) => (
                  <div
                    className="flex space-x-2 overflow-x-auto"
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
                            className="w-24 h-24 flex-shrink-0 relative"
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
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SettingPost;
