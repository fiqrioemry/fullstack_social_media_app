import {
  CircleUserRound,
  Compass,
  HomeIcon,
  Search,
  SquarePlus,
} from "lucide-react";

export const sidebarMenuConfig = (handleNavigate, handleSearch, handlePost) => [
  {
    icon: HomeIcon,
    action: () => handleNavigate(""),
    title: "Home",
  },
  {
    icon: Search,
    action: handleSearch,
    title: "Search",
  },
  {
    icon: Compass,
    action: () => handleNavigate("explore"),
    title: "Explore",
  },
  {
    icon: SquarePlus,
    action: () => handlePost("createPost"),
    title: "Create",
  },
  {
    icon: CircleUserRound,
    action: () => handleNavigate("profile"),
    title: "Profile",
  },
];

export const signUpFormData = {
  files: [],
  content: "",
};
