/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileMenu = ({ labelClass }) => {
  const { user } = useAuthStore();
  return (
    <Link
      to={`${user.username}`}
      className="btn btn-nav justify-center m:w-auto md:justify-start relative"
    >
      <div className="h-8 md:h-10 flex-shrink-0">
        <Avatar data={user} />
      </div>

      {/* Label */}
      {labelClass && <span className={labelClass}>Profile</span>}
    </Link>
  );
};

export default ProfileMenu;
