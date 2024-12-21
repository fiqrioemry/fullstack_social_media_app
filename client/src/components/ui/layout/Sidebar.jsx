import Logo from "../common/Logo";
import CommonMenu from "../common/CommonMenu";
import { sidebarMenuConfig } from "../../../config";
import { useAuth } from "../../../context/AuthProvider";
import ActiveLogo from "../common/ActiveLogo";

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
        active ? "w-full md:w-[75px]" : "w-[225px] border-r"
      } px-3 py-0 md:p-3 border-t fixed bottom-0 right-0 left-0 duration-300 transition-all md:relative w-full md:w-[225px]`}
    >
      <header className="hidden md:block py-6 px-3">
        {active ? <ActiveLogo /> : <Logo />}
      </header>
      <div className="py-1 px-3 md:px-0 md:py-3 flex md:block space-y-0 space-x-3 md:space-x-0 md:space-y-3">
        {sidebarMenu.map((item, index) => (
          <CommonMenu key={index} select={item} active={active} />
        ))}
      </div>

      <div
        className={`bg-background ${
          active ? "w-[300px] border-r" : "w-0"
        } absolute top-0 left-[75px] bottom-0 duration-300 transition-all delay-150  `}
      >
        <div className={`${active ? "flex" : "hidden"}`}></div>
      </div>
    </aside>
  );
};

export default Sidebar;
