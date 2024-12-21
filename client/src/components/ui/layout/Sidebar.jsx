import Logo from "../common/Logo";
import CommonMenu from "../common/CommonMenu";
import { sidebarMenuConfig } from "../../../config";
import { useAuth } from "../../../context/AuthProvider";

const Sidebar = () => {
  const { handleNavigate, handleSearch, handlePost, active } = useAuth();

  const sidebarMenu = sidebarMenuConfig(
    handleNavigate,
    handleSearch,
    handlePost
  );

  return (
    <aside
      className={`bg-background  ${
        active ? "w-[75px]" : "w-[225px]"
      } px-3 py-0 md:p-3 border-t md:border-r md:static fixed bottom-0 right-0 left-0 duration-300 transition-all `}
    >
      <header className="hidden md:block py-6 px-3">
        <Logo />
      </header>
      <div className="py-1 px-3 md:px-0 md:py-3 flex md:block space-y-0 space-x-3 md:space-x-0 md:space-y-3">
        {sidebarMenu.map((item, index) => (
          <CommonMenu key={index} select={item} active={active} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
