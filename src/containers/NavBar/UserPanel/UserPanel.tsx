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
import FollowingBoxContainer from "@/containers/Overlay/FollowingBox";
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
  const followingRef = useRef<OverlayPanel>(null);

  const handleSignOut = async () => {
    try {
      await signOutAPI();
    } catch (e) {
      console.error(e);
    } finally {
      setAuthToken();
      dispatch(logoutHandler() as any);
    }
  };

  const { data: notificationCountResponse } = useSWR<Response<number>>(
    isAuthUser ? "/api/notify/unread-notifies/count" : null
  );

  return (
    <>
      <OverlayPanel ref={notificationRef}>
        <NotificationBoxContainer />
      </OverlayPanel>
      <OverlayPanel ref={followingRef}>
        <FollowingBoxContainer />
      </OverlayPanel>

      <div className="user-panel flex gap-6 items-center">
        {isAuthUser ? (
          <>
            <i
              className={`${PrimeIcons.CHECK_SQUARE} !text-2xl cursor-pointer`}
              onClick={(e) => followingRef.current?.toggle(e)}
            />
            <i
              className={`${PrimeIcons.BELL} !text-2xl p-overlay-badge cursor-pointer`}
              onClick={(e) => notificationRef.current?.toggle(e)}
            >
              {!!notificationCountResponse?.result && (
                <Badge value={notificationCountResponse?.result} />
              )}
            </i>
            <Button
              label={`Xin chào, ${user.fullname}`}
              onClick={(e) => menuRef.current?.toggle(e)}
            />
            <Menu
              popup
              ref={menuRef}
              className="!border-0"
              model={[
                {
                  label: "My account",
                  command: () => router.push("/auth/account"),
                },
                { label: "Log out", command: handleSignOut },
              ]}
            />
          </>
        ) : (
          <Button onClick={() => router.push("/auth/signin")}>Log in</Button>
        )}
      </div>
    </>
  );
};

export default UserPanel;
