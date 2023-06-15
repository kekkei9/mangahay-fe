import { Response } from "@/types/Response.type";
import { Notification } from "@/types/Notification";
import NotificationComponent from "@/components/Overlay/Notification";
import InfiniteScroll from "@/containers/ListContainers/InfiniteScroll";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

const handleNotificationClick = () => {};

const PAGE_SIZE = 10;

const NotificationBox = () => {
  const swrNotification = useSWRInfinite<Response<Notification[]>>(
    (index) => `/api/user/notifies?limit=${PAGE_SIZE}&page=${index + 1}`
  );

  return (
    <div className="notification-box max-h-[250px] w-full md:w-[14rem] overflow-auto">
      <InfiniteScroll
        swr={swrNotification}
        dataWrapper={({ children }) => <div>{children}</div>}
        isReachingEnd={(
          swr: SWRInfiniteResponse<Response<Notification[]>, any>
        ) =>
          swr.data?.[0]?.result?.length === 0 ||
          (swr.data?.[swr.data?.length - 1].result || []).length < PAGE_SIZE
        }
        endingIndicator={
          <div className="flex justify-center p-2">Không còn thông báo</div>
        }
      >
        {(notifications) =>
          notifications?.map((notification) => (
            <NotificationComponent
              key={notification.thumb}
              notification={notification as Notification}
              onClick={handleNotificationClick}
            />
          ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default NotificationBox;
