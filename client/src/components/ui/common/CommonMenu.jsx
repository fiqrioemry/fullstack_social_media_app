/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

const CommonMenu = ({ select, active }) => {
  return (
    <>
      <Button
        variant="nav"
        size="lg"
        onClick={select.action}
        className="flex items-center justify-center md:justify-start md:gap-x-3 w-full "
      >
        <div>{<select.icon />}</div>
        {!active && <span className="hidden md:block">{select.title}</span>}
      </Button>
    </>
  );
};

export default CommonMenu;
