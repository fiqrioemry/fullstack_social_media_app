/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const NavItem = forwardRef(
  ({ to, onClick, icon, label, labelClass, notifications = [] }, ref) => {
    const props = to ? { to } : { onClick };

    const unreadNotifications = notifications.filter((notif) => !notif.isRead);
    const hasUnreadNotifications = unreadNotifications.length > 0;

    return (
      <Link
        ref={ref}
        className=" btn btn-nav justify-center  md:justify-start  relative"
        {...props}
      >
        {/* Icon */}
        <div className="h-5 md:h-10 flex items-center px-2">{icon}</div>

        {/* Label */}
        {labelClass && <span className={labelClass}>{label}</span>}

        {/* Notification Badge */}
        {hasUnreadNotifications && (
          <div className="absolute h-4 w-4 rounded-full bg-red-500 text-[10px] bottom-7 left-7 flex items-center justify-center">
            {unreadNotifications.length}
          </div>
        )}
      </Link>
    );
  }
);

export default NavItem;
