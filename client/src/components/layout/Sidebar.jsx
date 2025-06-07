import {
  Home,
  Bell,
  Search,
  Compass,
  SquarePlus,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavItem from "@/components/sidebar/NavItem";
import { useUserStore } from "@/store/useUserStore";
import MoreMenu from "@/components/sidebar/MoreMenu";
import useOpenSlidePanel from "@/hooks/useOpenSlidePanel";
import SearchPanel from "@/components/sidebar/SearchPanel";
import ProfileMenu from "@/components/sidebar/ProfileMenu";
import { CreateNewPost } from "@/components/modal/CreateNewPost";

const Sidebar = () => {
  const location = useLocation();
  const [openCreate, setOpenCreate] = useState(false);
  const currentPath = location.pathname.includes("message");
  const { notifications, getNotifications } = useUserStore();
  const { handleOpenPanel, openPanel, panelRef, triggerRef } =
    useOpenSlidePanel();

  const labelClass = cn(
    openPanel || currentPath ? "opacity-0" : "opacity-100",
    "duration-300 transition-all ease-in hidden lg:block"
  );

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const handleCreatePost = () => {
    setOpenCreate((prev) => !prev);
  };

  return (
    <aside
      className={cn(currentPath ? "w-[4.5rem]" : "w-[4.5rem] lg:w-72", "aside")}
    >
      <SearchPanel
        panelRef={panelRef}
        openPanel={openPanel}
        handleOpenPanel={handleOpenPanel}
      />
      <nav
        className={cn(
          openPanel || currentPath ? "w-[4.5rem]" : "w-[4.5rem] lg:w-full",
          "side-navbar"
        )}
      >
        <NavItem
          to="/"
          label="Home"
          labelClass={labelClass}
          icon={<Home size={24} />}
        />
        <NavItem
          label="Search"
          ref={triggerRef}
          labelClass={labelClass}
          onClick={handleOpenPanel}
          icon={<Search size={24} />}
        />
        <NavItem
          to="/explore"
          label="Explore"
          labelClass={labelClass}
          icon={<Compass size={24} />}
        />
        <NavItem
          to="/message"
          label="Message"
          labelClass={labelClass}
          icon={<MessageCircle size={24} />}
        />
        <NavItem
          to="/notification"
          label="Notification"
          notifications={notifications}
          labelClass={labelClass}
          icon={<Bell size={24} />}
        />
        <NavItem
          label="Create"
          labelClass={labelClass}
          onClick={handleCreatePost}
          icon={<SquarePlus size={24} />}
        />
        <ProfileMenu labelClass={labelClass} />
        <MoreMenu labelClass={labelClass} />
        <CreateNewPost isOpen={openCreate} setIsOpen={setOpenCreate} />
      </nav>
    </aside>
  );
};

export default Sidebar;
