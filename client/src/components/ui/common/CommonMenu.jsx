/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

const CommonMenu = ({ select }) => {
  return (
    <>
      <Button
        variant="nav"
        size="lg"
        onClick={select.action}
        className="flex items-center justify-center md:justify-start py-3 px-3 gap-x-0 md:gap-x-3 w-full "
      >
        <div>{<select.icon />}</div>
        <span className="hidden md:block">{select.title}</span>
      </Button>
    </>
  );
};

export default CommonMenu;
