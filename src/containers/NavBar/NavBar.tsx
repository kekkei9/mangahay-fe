import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { navList } from "./navList";
import SearchPanelContainer from "./SearchPanel";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";
import { Sidebar } from "primereact/sidebar";
import SideBar from "@/components/NavBar/SideBar";
import UserPanelContainer from "@/components/NavBar/UserPanel";

const NavBar = () => {
  const router = useRouter();

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
        onClick={() => setIsSidebarOpen(false)}
      >
        <SideBar />
      </Sidebar>
      <div className="top-navbar shadow fixed top-0 left-0 z-50 bg-white">
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
            <div className="gap-6 items-center hidden xl:flex">
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
        <div className="hidden xs:flex gap-6 items-center justify-center p-4">
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
      </div>
    </>
  );
};

export default NavBar;
