import { Notification } from "@/types/Notification";
import { timeDiff } from "@/utils/date";
import Image from "next/image";

interface INotificationProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

const Notification = ({ notification, onClick }: INotificationProps) => {
  return (
    <div
      className="p-4 pb-6 bg-white border-b border-gray hover:bg-slate-100 cursor-pointer"
      onClick={() => onClick(notification)}
    >
      <div className="flex items-center">
        <div className="relative">
          <div className="w-10 h-10 relative">
            <Image
              src={notification.thumb}
              alt="Notification thumb"
              className="rounded-full object-contain"
              fill
            />
          </div>
          {!notification.is_read && (
            <span className="absolute top-7 right-0 w-4 h-4 bg-blue-400 rounded-full" />
          )}
        </div>
        <div className="ml-3">
          <div className={notification.is_read ? "font-medium" : "font-bold"}>
            {notification.title}
          </div>
          <div
            className={notification.is_read ? "text-gray-500" : "text-black"}
          >
            {notification.body}
          </div>
          <div
            className={`text-sm ${
              notification.is_read ? "text-gray-400" : "text-blue-400"
            }`}
          >
            {timeDiff(notification.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
