import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserPanelContainer from "./UserPanel";
import { navList } from "./navList";
import SearchPanelContainer from "./SearchPanel";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();

  //for preventing hydration
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  return (
    <div className="top-navbar fixed top-0 left-0 z-50 bg-white">
      <div className="tabs-bar flex items-center justify-between w-screen px-8 py-4">
        <div className="flex gap-6 items-center">
          <Link className="text-red-400 " href="/">
            <div className="h-6 aspect-[5/1] relative">
              <Image
                src="/assets/logo_web.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
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
