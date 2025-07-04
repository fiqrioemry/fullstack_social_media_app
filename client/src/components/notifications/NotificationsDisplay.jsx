/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useUserStore } from "@/store/useUserStore";

const NotificationsDisplay = ({ notifications }) => {
  const { MarkNotificationsAsRead } = useUserStore();

  const unread = notifications.some((notif) => notif.isRead === false);

  useEffect(() => {
    if (unread) {
      MarkNotificationsAsRead();
    }
  }, [MarkNotificationsAsRead, unread]);

  return (
    <div className="max-w-2xl md:max-w-3xl w-full ">
      <div className="flex flex-col md:py-10 py-4 mx-6 md:mx-12 space-y-4 ">
        <h3>Notifications List</h3>
        {notifications?.map((notif, index) => {
          let message = "";

          switch (notif.type) {
            case "comment":
              message = notif.commentId
                ? `replied to your comment: "${notif.comment}"`
                : `commented on your post: "${notif.post}"`;
              break;

            case "like":
              message = notif.commentId
                ? `liked your comment : ${notif.comment}`
                : `liked your post`;
              break;

            case "mention":
              message = `mentioned you in a post: "${notif.comment}"`;
              break;

            case "follow":
              message = "started following you";
              break;

            case "reply":
              message = `replied to your comment: "${notif.comment}"`;
              break;

            default:
              message = "sent you a notification";
          }

          return (
            <div
              key={index}
              className="flex items-center space-x-3 bg-background border border-muted p-3 rounded-lg shadow-md"
            >
              {/* Avatar */}
              <Avatar data={notif} />

              {/* Username & Notification Message */}
              <div className="flex-1">
                <Link to={`/${notif.username}`} className="btn-secondary">
                  {notif.username}
                </Link>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsDisplay;
