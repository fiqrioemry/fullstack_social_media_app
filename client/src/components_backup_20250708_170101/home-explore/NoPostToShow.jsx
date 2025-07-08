import { Link } from "react-router-dom";
import AuthorCard from "@/components/home-explore/AuthorCard";

const NoPostToShow = () => {
  return (
    <div className="min-h-screen mb-8">
      <div className="flex px-2 md:px-10 py-[4rem] md:py-[2rem]">
        <div className="md:w-7/12 px-4 md:px-2 space-y-2">
          {/* no posts to show */}
          <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-100 ">
            <p className="text-gray-500 mt-2">
              Start following people to see their latest posts and updates on
              your feed.
            </p>
            <Link
              to="/explore"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Discover People to Follow
            </Link>
          </div>
        </div>

        {/* author card */}
        <div className="w-5/12 hidden md:block">
          <div className="flex justify-center ">
            <AuthorCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPostToShow;
