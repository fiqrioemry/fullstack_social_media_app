import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="space-y-4 text-center">
          <h1>Sorry, this page isnt available.</h1>
          <div>
            <p>The link you followed may be broken or have been removed.</p>
            <p>
              <span>Go back to </span>
              <Link to="/" className="btn-secondary">
                Moments
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
