import { Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "../common/Logo";

const Navbar = () => {
  return (
    <nav className="bg-background py-3 px-6 fixed top-0 right-0 left-0 md:hidden border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-3">
          <form>
            <Input className="rounded-[8px]" />
          </form>
          <Heart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
