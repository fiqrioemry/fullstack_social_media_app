import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import NotificationsLoading from "@/components/skeleton/NotificationsLoading";
import NoNotifcationsToShow from "@/components/notifications/NoNotifcationsToShow";
import NotificationsDisplay from "@/components/notifications/NotificationsDisplay";

const Notifications = () => {
  const { notifications, getNotifications } = useUserStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  if (!notifications) return <NotificationsLoading />;

  if (notifications.length === 0) return <NoNotifcationsToShow />;

  return <NotificationsDisplay notifications={notifications} />;
};

export default Notifications;
