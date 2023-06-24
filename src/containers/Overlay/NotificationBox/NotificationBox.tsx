import { Response } from "@/types/Response.type";
import { Notification } from "@/types/Notification";
import NotificationComponent from "@/components/Overlay/Notification";
import InfiniteScroll from "@/containers/ListContainers/InfiniteScroll";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";
import { useRouter } from "next/router";
import { markAsRead } from "@/services/backend/NotificationController";
import Image from "next/image";
import { isEmptySWR } from "@/utils/swr";

const PAGE_SIZE = 5;

const NotificationBox = () => {
  const router = useRouter();

  const handleNotificationClick = async (notification: Notification) => {
    await markAsRead(notification.id);
    router.push(notification.redirect_url);
  };
  const swr = useSWRInfinite<Response<Notification[]>>(
    (index) => `/api/user/notifies?limit=${PAGE_SIZE}&page=${index + 1}`
  );

  return (
    <div className="notification-box max-h-[250px] w-full md:w-[20rem] overflow-auto">
      {isEmptySWR(swr) ? (
        <div className="w-full flex flex-col items-center">
          <div className="relative w-3/5 aspect-square">
            <Image
              src="/assets/comic/empty.png"
              alt="empty"
              fill
              className="object-contain"
            />
          </div>
          <div className="font-semibold text-2xl">Không có thông báo</div>
        </div>
      ) : (
        <InfiniteScroll
          swr={swr}
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
      )}
    </div>
  );
};

export default NotificationBox;
