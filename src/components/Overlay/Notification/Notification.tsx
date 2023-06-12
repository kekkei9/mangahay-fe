import { Notification } from "@/types/Notification";

interface INotificationProps {
  notification: Notification;
  onClick: () => void;
}

const Notification = ({ notification }: INotificationProps) => {
  console.log(notification);
  return <div>ehe</div>;
};

export default Notification;
