/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const CommonMenu = ({ select, active }) => {
  const { searchPanel } = useAuth();

  return (
    <Button
      variant="nav"
      size="lg"
      onClick={select.action}
      ref={select.title === "Search" ? searchPanel : null}
      className={`flex ${
        select.title === "Search" && "hidden md:flex"
      } items-center justify-center md:justify-start md:gap-x-3 w-full`}
    >
      <div>{<select.icon />}</div>
      <div className="hidden md:block">
        <span
          className={` ${
            active ? "hidden" : "block"
          } duration-300 transition-all`}
        >
          {select.title}
        </span>
      </div>
    </Button>
  );
};

export default CommonMenu;
