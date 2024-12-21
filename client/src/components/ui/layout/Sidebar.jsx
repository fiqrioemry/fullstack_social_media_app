import Logo from "../common/Logo";
import CommonMenu from "../common/CommonMenu";
import { sidebarMenuConfig } from "../../../config";
import { useAuth } from "../../../context/AuthProvider";

const Sidebar = () => {
  const { handleNavigate, handleSearch, handlePost } = useAuth();

  const sidebarMenu = sidebarMenuConfig(
    handleNavigate,
    handleSearch,
    handlePost
  );

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
