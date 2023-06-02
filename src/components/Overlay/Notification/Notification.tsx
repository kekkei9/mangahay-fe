import { Notification } from "@/types/Notification";

interface INotificationProps {
  notification: Notification;
  onClick: () => void;
}

const Notification = ({ notification }: INotificationProps) => {
  return <div>ehe</div>;
};

export default Notification;
