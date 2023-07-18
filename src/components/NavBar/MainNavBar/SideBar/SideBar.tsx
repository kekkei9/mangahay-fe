import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "@/redux/authentication/authentication.action";
import { RootState } from "@/redux";
import NavLink from "../NavLink";
import { Divider } from "primereact/divider";
import { useRouter } from "next/router";
import { navList } from "@/containers/NavBar/MainNavBar/navList";
import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";

interface ISideBarProps {
  onClickNav?: () => void;
}

const SideBar = ({ onClickNav }: ISideBarProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthUser, user } = useSelector(
    (state: RootState) => state.authentication
  );
  const { toastRef } = useContext(ToastContext);

  const CustomNavLink = (props: any) => (
    <NavLink {...props} onClick={() => onClickNav && onClickNav()} />
  );

  return (
    <div className="flex flex-col gap-6 p-4 text-xl">
      {navList.map((nav, index) => (
        <CustomNavLink {...nav} key={index} />
      ))}
      <Divider />
      {isAuthUser ? (
        <>
          <div className="font-semibold text-mangahay-200 mt-2">
            {user.fullname}
          </div>
          <CustomNavLink href="/account" label="Tài khoản" />
          <CustomNavLink href="/following" label="Truyện đang theo dõi" />
          <div
            onClick={() => {
              dispatch(logoutHandler() as any);
              toastRef?.current?.show({
                summary: "Đăng xuất",
                detail: "Đăng xuất thành công",
                severity: "success",
              });
              router.push("/");
            }}
          >
            ĐĂNG XUẤT
          </div>
        </>
      ) : (
        <CustomNavLink href="/auth/signin" label="Đăng nhập" />
      )}
    </div>
  );
};

export default SideBar;
