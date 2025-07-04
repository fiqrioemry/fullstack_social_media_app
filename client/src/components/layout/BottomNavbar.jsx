import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { CreateNewPost } from "@/components/modal/CreateNewPost";
import { Home, Compass, MessageCircle, SquarePlus, Bell } from "lucide-react";

const BottomNavbar = () => {
  const { user } = useAuthStore();
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpen = () => {
    setOpenCreate((prev) => !prev);
  };

  return (
    <div className="bottom-navbar">
      <Link to="" className="btn btn-nav w-20">
        <Home />
      </Link>
      <Link to="explore" className="btn btn-nav w-20">
        <Compass />
      </Link>
      <button onClick={handleOpen} className="btn btn-nav w-20">
        <SquarePlus />
      </button>
      <Link to="notification" className="btn btn-nav w-20">
        <Bell />
      </Link>
      <Link to="message" className="btn btn-nav w-20">
        <MessageCircle />
      </Link>
      <Link to={`${user.username}`} className="btn btn-nav w-20">
        <Avatar data={user} />
      </Link>
      <CreateNewPost isOpen={openCreate} setIsOpen={setOpenCreate} />
    </div>
  );
};

export default BottomNavbar;
