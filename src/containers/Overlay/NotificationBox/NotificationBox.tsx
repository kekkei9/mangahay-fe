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
    <div className="notification-box max-h-[250px] w-full md:w-[14rem]">
      <InfiniteScroll
        swr={swrNotification}
        dataWrapper={({ children }) => <div>{children}</div>}
        isReachingEnd={(
          swr: SWRInfiniteResponse<Response<Notification[]>, any>
        ) =>
          swr.data?.[0]?.result?.length === 0 ||
          (swr.data?.[swr.data?.length - 1].result || []).length < PAGE_SIZE
        }
        endingIndicator={"Không còn thông báo"}
      >
        {(notifications) =>
          notifications?.map((notification) => (
            <NotificationComponent
              key={1}
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
