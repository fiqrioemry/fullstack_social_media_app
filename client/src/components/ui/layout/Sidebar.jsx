import Logo from "../common/Logo";
import CommonMenu from "../common/CommonMenu";
import { sidebarMenuConfig } from "../../../config";
import { useAuth } from "../../../context/AuthProvider";
import ActiveLogo from "../common/ActiveLogo";

const Sidebar = () => {
  const { handleNavigate, handleSearch, handlePost, active, searchPanel } =
    useAuth();

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
        className={`fixed top-0 inset-y-0 bottom-0 left-[75px] h-full bg-background ${
          active ? "w-[250px] border-r" : "w-[0px]"
        }  duration-300 transition-all overflow-x-hidden`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
        corporis, qui ut suscipit inventore doloribus, quisquam ratione quaerat
        quae modi velit quo illum. Quisquam ipsa voluptatum, labore amet
        voluptas quam!
      </div>
    </aside>
  );
};

export default Sidebar;
