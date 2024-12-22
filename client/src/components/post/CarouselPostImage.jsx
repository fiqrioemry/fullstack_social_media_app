/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselPostImage = ({ mediaFiles }) => {
  return (
    <>
      <Carousel>
        <CarouselContent className="flex items-center">
          {mediaFiles.map((media, index) => (
            <CarouselItem key={index}>
              {media.type.startsWith("image") ? (
                <div className="flex aspect-square">
                  <img
                    src={media.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full"
                  />
                </div>
              ) : media.type.startsWith("video") ? (
                <video src={media.url} controls className=" w-full h-full" />
              ) : null}
            </CarouselItem>
          ))}
        </CarouselContent>
        {mediaFiles.length > 1 && <CarouselPrevious />}
        {mediaFiles.length > 1 && <CarouselNext />}
      </Carousel>
    </>
  );
};

export default CarouselPostImage;
