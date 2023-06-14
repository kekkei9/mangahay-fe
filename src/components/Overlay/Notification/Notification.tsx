import { Notification } from "@/types/Notification";
import { timeDiff } from "@/utils/date";

interface INotificationProps {
  notification: Notification;
  onClick: () => void;
}

const Notification = ({ notification }: INotificationProps) => {
  console.log(notification);
  return (
    <div className="p-4 pb-6 bg-white border-b border-gray">
      <div className="flex items-start">
        <div className="relative">
          <img className="w-10 h-10 rounded-full" src={notification.thumb} alt="Notification thumb"/>
          {!notification.isRead && <span className="absolute top-7 right-0 w-4 h-4 bg-blue-400 rounded-full"></span>}
        </div>
        <div className="ml-3">
          <div className={notification.isRead?"font-medium":"font-bold"}>{notification.title}</div>
          <div className={notification.isRead?"text-gray-500":"text-black"}>{notification.body}</div>
          <div className={`text-sm ${notification.isRead?"text-gray-400":"text-blue-400"}`}>{timeDiff(notification.createdAt)}</div>
        </div>
      </div>
    </div>)
};

export default Notification;
