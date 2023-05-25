import { logoutHandler } from "@/redux/authentication/authentication.action";
import { signOutAPI } from "@/services/backend/AuthController";
import { setAuthToken } from "@/services/backend/axiosClient";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const router = useRouter();
  const menuRef = useRef<Menu>(null);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isAuthUser, user } = useSelector(
    (state: any) => state.authentication
  );

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-10 fixed top-0 left-0 z-50 ">
      <div className="flex justify-around w-screen px-4">
        <div>Just a simple navbar</div>
        {isClient &&
          (isAuthUser ? (
            <>
              <Button
                label={`Hi, ${user.fullname}`}
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
          ))}
      </div>
    </div>
  );
};

export default NavBar;
