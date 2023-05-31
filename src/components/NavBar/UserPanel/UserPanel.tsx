import { logoutHandler } from "@/redux/authentication/authentication.action";
import { signOutAPI } from "@/services/backend/AuthController";
import { setAuthToken } from "@/services/backend/axiosClient";
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

const UserPanel = () => {
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

  return (
    <>
      <OverlayPanel ref={notificationRef}>
        <NotificationBoxContainer />
      </OverlayPanel>

      <Menu
        popup
        ref={menuRef}
        className="!border-0 !w-fit"
        model={[
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
            command: () => dispatch(logoutHandler() as any),
            icon: PrimeIcons.SIGN_OUT,
          },
        ]}
      />

      <div className="user-panel flex gap-6 items-center">
        {isAuthUser && (
          <i
            className={`${PrimeIcons.BELL} !text-xl p-overlay-badge cursor-pointer`}
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
