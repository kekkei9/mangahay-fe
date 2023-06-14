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
        <div className="flex-shrink-0">
          <img className="w-10 h-10 rounded-full" src={notification.thumb} alt="Notification thumb"/>
        </div>
        <div className="ml-3">
          <div className="font-bold">{notification.title}</div>
          <div className="text-gray-500">{notification.body}</div>
          <div className="text-sm text-gray-400">{timeDiff(notification.createdAt)}</div>
        </div>
      </div>
    </div>)
};

export default Notification;
