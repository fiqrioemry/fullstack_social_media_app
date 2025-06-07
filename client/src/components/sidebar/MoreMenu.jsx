/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Menu, Moon, Sun, LogOut, Settings, ChevronLeft } from "lucide-react";

function MoreMenu({ labelClass }) {
  const ref = useRef(null);
  const { signout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const { handleDarkMode, darkMode } = useTheme();
  const [showModeToggle, setShowModeToggle] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleToggle = () => {
    setShowModeToggle((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger className="w-full">
        <NavItem
          label="More"
          onClick={handleOpen}
          labelClass={labelClass}
          icon={<Menu size={24} />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent ref={ref} className="bg-secondary p-2">
        {showModeToggle ? (
          <>
            <button className="btn btn-nav py-3 mb-4" onClick={handleToggle}>
              <ChevronLeft />
              <p>Switch appearance</p>
              {darkMode ? <Moon /> : <Sun />}
            </button>
            <Label
              htmlFor="dark-mode"
              className="btn btn-nav justify-between py-3 px-4"
            >
              Dark Mode
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkMode}
              />
            </Label>
          </>
        ) : (
          <>
            <Link className="btn btn-nav justify-start" to="/settings">
              <Settings />
              <span>Settings</span>
            </Link>
            <button
              className="btn btn-nav justify-start mt-2"
              onClick={handleToggle}
            >
              <Moon />
              <span>Switch appearance</span>
            </button>
            <button
              onClick={signout}
              className="btn btn-nav justify-start mt-2"
            >
              <LogOut />
              <span>Signout</span>
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreMenu;
