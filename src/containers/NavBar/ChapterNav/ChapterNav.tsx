import Link from "next/link";
import { useState, useEffect } from "react";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { PrimeIcons } from "primereact/api";
import UserPanelContainer from "@/components/NavBar/UserPanel";
import Image from "next/image";

const reportItems = ["Lỗi ảnh"];

interface IChapterNavProps {
  chapter?: Chapter;
}

const ChapterNav = ({ chapter }: IChapterNavProps) => {
  const [showNavbar, setShowNavbar] = useState(true);

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

  return (
    <>
      <nav
        className={`fixed w-full grid grid-cols-3 items-center py-2 gap-4 bg-zinc-800 visibility: ${
          showNavbar ? "visible" : "hidden"
        }`}
      >
        <div className="flex items-center">
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
          <Link
            href={`/comic/${chapter?.comicInfo?.slug}`}
            className="text-white font-medium text-lg max-w-xs"
          >
            {chapter?.comicInfo?.name}
          </Link>
          <i className={PrimeIcons.CHEVRON_RIGHT} />
          <span className="text-gray-400 mr-4 text-lg">{chapter?.name}</span>
        </div>
        <div className="flex items-center justify-center">
          <a
            href={`/comic/${chapter?.comicInfo?.slug}/${chapter?.prevChapter?.slug}`}
            className={`mr-4 ${
              chapter?.prevChapter?.slug
                ? "text-white "
                : "pointer-events-none text-gray-300"
            }`}
          >
            <i className={PrimeIcons.CHEVRON_LEFT} />
          </a>
          <span className="text-white font-medium mr-4 text-lg">
            {chapter?.name}
          </span>
          <a
            href={`/comic/${chapter?.comicInfo?.slug}/${chapter?.nextChapter?.slug}`}
            className={`mr-4 ${
              chapter?.nextChapter?.slug
                ? "text-white "
                : "pointer-events-none text-gray-300"
            }`}
          >
            <i className={PrimeIcons.CHEVRON_RIGHT} />
          </a>
        </div>
        <UserPanelContainer />
      </nav>
    </>
  );
};
export default ChapterNav;
