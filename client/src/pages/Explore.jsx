const Explore = () => {
  return (
    <div className="container mx-auto px-0 md:px-6">
      <div className="h-screen grid grid-cols-2 md:grid-cols-3 md:gap-x-2 md:gap-y-2">
        {[...Array(20)].map((_, index) => (
          <div
            className="h-[275px] bg-red-500 border flex items-center justify-center"
            key={index}
          >
            <h3>Content {index}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
