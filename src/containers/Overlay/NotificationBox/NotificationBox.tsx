import useSWR from "swr";
import { Response } from "@/types/Response.type";
import { Notification } from "@/types/Notification";
import { ListBox } from "primereact/listbox";
import NotificationComponent from "@/components/Overlay/Notification";

const handleNotificationClick = () => {};

const NotificationBox = () => {
  const { data: notificationResponse } = useSWR<Response<Notification[]>>(
    "/api/user/notifies?limit=10&page=0"
  );

  return (
    <div className="notification-box">
      <ListBox
        options={notificationResponse?.result}
        optionLabel="name"
        itemTemplate={(notification) =>
          NotificationComponent({
            notification,
            onClick: handleNotificationClick,
          })
        }
        className="w-full md:w-14rem"
        listStyle={{ maxHeight: "250px" }}
      />
    </div>
  );
};

export default NotificationBox;
