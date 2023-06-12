import Link from "next/link";
import { useState, useEffect } from "react";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { PrimeIcons } from "primereact/api";
import UserPanelContainer from "@/components/NavBar/UserPanel";
import Image from "next/image";
import { Sidebar } from "primereact/sidebar";
import SideBar from "@/components/NavBar/MainNavBar/SideBar";

interface IChapterNavProps {
  chapter?: Chapter;
}

const ChapterNav = ({ chapter }: IChapterNavProps) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowNavbar(scrollTop <= 0);
    };
    const handleMouseMove = (e: any) => {
      if (e.clientY <= 50) {
        setShowNavbar(true);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [isClient, setIsClient] = useState(false);
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
      <nav
        className={`fixed w-full grid grid-cols-3 items-center py-2 px-4 gap-4 z-50 bg-zinc-800 ${
          showNavbar ? "lg:visible" : "lg:hidden"
        }`}
      >
        <div className="flex items-center">
          <Link href="/">
            <div className="h-6 aspect-[5/1] relative">
              <Image
                src="/assets/logo_web.png"
                alt="logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          <Link
            href={`/comic/${chapter?.comicInfo?.slug}`}
            className="text-white font-medium text-lg max-w-xs line-clamp-1 ml-4"
          >
            {chapter?.comicInfo?.name}
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          <a
            href={`/comic/${chapter?.comicInfo?.slug}/${chapter?.prevChapter?.slug}`}
            className={`${
              chapter?.prevChapter?.slug
                ? "text-white "
                : "pointer-events-none text-gray-300"
            }`}
          >
            <i className={PrimeIcons.CHEVRON_LEFT} />
          </a>
          <span className="text-white font-medium text-lg text-center">
            {chapter?.name}
          </span>
          <a
            href={`/comic/${chapter?.comicInfo?.slug}/${chapter?.nextChapter?.slug}`}
            className={`${
              chapter?.nextChapter?.slug
                ? "text-white "
                : "pointer-events-none text-gray-300"
            }`}
          >
            <i className={PrimeIcons.CHEVRON_RIGHT} />
          </a>
        </div>
        {isClient && (
          <div className="flex justify-end gap-4">
            <UserPanelContainer />
            <i
              className={`${PrimeIcons.BARS} !text-xl !text-mangahay-200 !block xs:!hidden`}
              onClick={() => setIsSidebarOpen(true)}
            />
          </div>
        )}
      </nav>
    </>
  );
};
export default ChapterNav;
