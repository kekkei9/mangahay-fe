import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserPanelContainer from "./UserPanel";
import { navList } from "./navList";
import SearchPanelContainer from "./SearchPanel";

const NavBar = () => {
  const router = useRouter();

  //for preventing hydration
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  return (
    <div className="top-navbar h-10 fixed top-0 left-0 z-50 bg-white">
      <div className="tabs-bar flex items-center justify-between w-screen px-8">
        <div className="flex gap-6 items-center">
          <Link className="cursor-pointer text-red-400" href="/">
            Logo here
          </Link>
          {navList.map(({ label, href }, index) => (
            <Link
              key={index}
              href={href}
              className={!router.asPath.includes(href) ? "text-black" : ""}
            >
              {label.toLocaleUpperCase()}
            </Link>
          ))}
        </div>

        <SearchPanelContainer />

        {isClient && <UserPanelContainer />}
      </div>
    </div>
  );
};

export default NavBar;
