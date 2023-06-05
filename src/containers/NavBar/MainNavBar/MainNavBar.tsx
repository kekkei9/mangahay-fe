import { useEffect, useState } from "react";
import Link from "next/link";
import { navList } from "./navList";
import SearchPanelContainer from "./SearchPanel";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";
import { Sidebar } from "primereact/sidebar";
import SideBar from "@/components/NavBar/MainNavBar/SideBar";
import UserPanelContainer from "@/components/NavBar/UserPanel";
import NavLink from "@/components/NavBar/MainNavBar/NavLink";

const MainNavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //for preventing hydration
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  return (
    <>
      <Sidebar
        visible={isSidebarOpen}
        onHide={() => setIsSidebarOpen(false)}
        position="right"
      >
        <SideBar onClickNav={() => setIsSidebarOpen(false)} />
      </Sidebar>
      <div className="top-navbar shadow fixed top-0 left-0 z-50 bg-white">
        <div className="tabs-bar flex items-center justify-between w-screen px-8 py-4">
          <div className="flex gap-6 items-center">
            <Link href="/">
              <div className="h-6 aspect-[5/1] relative">
                <Image
                  src="/assets/logo_web.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="gap-6 items-center hidden xl:flex">
              {navList.map((nav, index) => (
                <NavLink {...nav} key={index} />
              ))}
            </div>
          </div>

          <div className="hidden sm:block">
            <SearchPanelContainer />
          </div>

          {isClient && <UserPanelContainer />}

          <i
            className={`${PrimeIcons.BARS} !text-xl !text-mangahay-200 !block xs:!hidden`}
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>

        <div className="hidden xs:flex xl:hidden gap-6 items-center justify-center p-4">
          {navList.map((nav, index) => (
            <NavLink {...nav} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainNavBar;
