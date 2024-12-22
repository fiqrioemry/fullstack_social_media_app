import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../../context/AuthProvider";

const SettingPost = () => {
  const { handleClosePostModal } = useAuth();
  const [dragOver, setDragOver] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-70">
      <div className="bg-white p-4 w-[350px] rounded-lg relative">
        <button
          onClick={() => handleClosePostModal("settingPost")}
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
  );
};

export default SettingPost;
