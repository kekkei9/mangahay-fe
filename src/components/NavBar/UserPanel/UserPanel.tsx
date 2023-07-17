import { logoutHandler } from "@/redux/authentication/authentication.action";
import { Menu } from "primereact/menu";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { Response } from "@/types/Response.type";
import NotificationBoxContainer from "@/containers/Overlay/NotificationBox";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { useRouter } from "next/router";
import { Badge } from "primereact/badge";

interface IUserPanelProps {
  className?: string;
}

const UserPanel = ({ className }: IUserPanelProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthUser, user } = useSelector(
    (state: any) => state.authentication
  );

  const menuRef = useRef<Menu>(null);
  const notificationRef = useRef<OverlayPanel>(null);

  const { data: notificationCountResponse } = useSWR<Response<number>>(
    isAuthUser ? "/api/notify/unread-notifies/count" : null
  );

  const menuModel = [
    {
      label: "Tài khoản",
      command: () => router.push("/account"),
      icon: PrimeIcons.USER,
    },
    {
      label: "Truyện đang theo dõi",
      command: () => router.push("/following"),
      icon: PrimeIcons.CHECK_SQUARE,
    },
    {
      label: "Đăng xuất",
      command: () => {
        dispatch(logoutHandler() as any);
        router.push("/");
      },
      icon: PrimeIcons.SIGN_OUT,
    },
  ];

  return (
    <>
      <OverlayPanel ref={notificationRef}>
        <NotificationBoxContainer />
      </OverlayPanel>

      <Menu
        popup
        ref={menuRef}
        className="!border-0 !w-fit"
        model={menuModel}
      />

      <div className={`user-panel flex gap-6 items-center ${className}`}>
        {isAuthUser && (
          <i
            className={`${PrimeIcons.BELL} !text-xl p-overlay-badge cursor-pointer !text-mangahay-400`}
            onClick={(e) => notificationRef.current?.toggle(e)}
          >
            {!!notificationCountResponse?.result && (
              <Badge value={notificationCountResponse?.result} />
            )}
          </i>
        )}
        <div className="hidden xs:block">
          {isAuthUser ? (
            <>
              <Button
                label={`Xin chào, ${user.fullname.split(" ").slice(-1)}`}
                onClick={(e) => menuRef.current?.toggle(e)}
              />
            </>
          ) : (
            <Button onClick={() => router.push("/auth/signin")}>
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPanel;
