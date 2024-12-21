import {
  CircleUserRound,
  Compass,
  HomeIcon,
  Search,
  SquarePlus,
} from "lucide-react";

import CommonMenu from "../common/CommonMenu";
import Logo from "../common/Logo";

const Sidebar = () => {
  const handleSearch = () => {
    console.log("search username");
  };

  const handlePost = () => {
    console.log("create new post");
  };

  const handleNavigate = () => {
    console.log("navigate to");
  };

  const sidebarMenu = [
    {
      icon: <HomeIcon />,
      action: handleNavigate,
      title: "Home",
      type: "link",
    },
    {
      icon: <Search />,
      action: handleSearch,
      title: "Search",
      type: "button",
    },
    {
      icon: <Compass />,
      action: handleNavigate,
      title: "Explore",
      type: "link",
    },
    {
      icon: <SquarePlus />,
      action: handlePost,
      title: "Create",
      type: "button",
    },
    {
      icon: <CircleUserRound size={80} />,
      action: handleNavigate,
      title: "Profile",
      type: "link",
    },
  ];

  return (
    <aside className=" px-3 py-0 md:p-3 fixed bottom-0 left-0 w-full md:w-[225px] md:top-0 md:h-screen border-t md:border-r ">
      <header className="hidden md:block py-6 px-3">
        <Logo />
      </header>
      <div className="py-3 space-y-0 space-x-3 md:space-x-0 md:space-y-3 md:block flex ">
        {sidebarMenu.map((item, index) => (
          <CommonMenu key={index} select={item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
