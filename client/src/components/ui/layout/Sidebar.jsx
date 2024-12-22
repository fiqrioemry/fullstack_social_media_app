import Logo from "../common/Logo";
import CommonMenu from "../common/CommonMenu";
import { sidebarMenuConfig } from "../../../config";
import { useAuth } from "../../../context/AuthProvider";
import ActiveLogo from "../common/ActiveLogo";
import { Input } from "@/components/ui/input";

const Sidebar = () => {
  const {
    handleNavigate,
    toggleSearch,
    active,
    searchPanel,
    handleOpenPostModal,
  } = useAuth();
  const sidebarMenu = sidebarMenuConfig(
    handleNavigate,
    toggleSearch,
    handleOpenPostModal
  );

  return (
    <>
      <aside
        className={`bg-background ${
          active ? "md:w-[75px]" : "md:w-[225px]"
        } px-3 py-0 md:p-3 border-t fixed bottom-0 right-0 left-0 duration-300 transition-all md:relative w-full border-r z-20`}
      >
        <header className="hidden md:block py-6 px-3">
          {active ? <ActiveLogo /> : <Logo />}
        </header>
        <div className="py-1 px-3 md:px-0 md:py-3 flex md:block space-y-0 space-x-3 md:space-x-0 md:space-y-3">
          {sidebarMenu.map((item, index) => (
            <CommonMenu key={index} select={item} active={active} />
          ))}
        </div>
      </aside>

      {/* search panel */}
      <div
        ref={searchPanel}
        className={`fixed top-0 bottom-0 left-[75px] w-[325px] h-full bg-background border-r z-10 ${
          active ? "searchPanel-enter" : "searchPanel-exit hidden"
        } duration-300 transition-all`}
      >
        <div className="px-3">
          <div className="py-6">
            <h3>Search panel</h3>
          </div>
          <form>
            <Input className="bg-accent" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
