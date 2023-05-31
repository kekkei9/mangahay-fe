import Link from "next/link";
import { navList } from "../../../containers/NavBar/navList";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "@/redux/authentication/authentication.action";
import { RootState } from "@/redux";

const SideBar = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { isAuthUser, user } = useSelector(
    (state: RootState) => state.authentication
  );

  return (
    <div className="flex flex-col gap-6 p-4 text-xl">
      {navList.map(({ label, href }, index) => (
        <Link
          key={index}
          href={href}
          className={`${!router.asPath.includes(href) && "text-black"} text-xl`}
        >
          {label.toLocaleUpperCase()}
        </Link>
      ))}

      {isAuthUser ? (
        <>
          <div className="font-semibold text-mangahay-200 mt-2">
            {user.fullname}
          </div>
          <Link
            href="/account"
            className={`${
              !router.asPath.includes("/account") && "text-black"
            } text-xl`}
          >
            Tài khoản
          </Link>
          <Link
            href="/following"
            className={`${
              !router.asPath.includes("/following") && "text-black"
            } text-xl`}
          >
            Truyện đang theo dõi
          </Link>
          <div onClick={() => dispatch(logoutHandler() as any)}>Đăng xuất</div>
        </>
      ) : (
        <div onClick={() => router.push("/auth/signin")}>Đăng nhập</div>
      )}
    </div>
  );
};

export default SideBar;
