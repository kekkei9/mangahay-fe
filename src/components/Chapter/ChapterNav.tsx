import Link from "next/link";
import { useState, useEffect } from "react";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { PrimeIcons } from "primereact/api";

const reportItems = ["Lỗi ảnh"];

interface IChapterNavProps {
  comic?: Comic;
  chapter?: Chapter;
}

const ChapterNav = ({ comic, chapter }: IChapterNavProps) => {
  const [showNavbar, setShowNavbar] = useState(true);

  const [reportIsShown, setReportIsShown] = useState(false);

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

  const closeReport = () => {
    setReportIsShown(false);
  };

  //TODO: Gửi Report đến BE
  // const handleReport = (id: any) => {
  //   if (!sessionStorage.getItem("access_token")) {
  //     noticeShow("error", "Đăng nhập để thực hiện chức năng");
  //   } else {
  //     setReportIsShown(true);
  //   }
  // };

  return (
    <>
      {/* {reportIsShown && (
        <ReportTable
          items={reportItems}
          id={chapter?.id}
          type="chapter"
          onClose={closeReport}
          noticeShow={noticeShow}
        />
      )} */}
      <nav
        className={`fixed w-full grid grid-cols-3 items-center py-2 gap-4 bg-zinc-800 visibility: ${
          showNavbar ? "visible" : "hidden"
        }`}
      >
        <div className="flex items-center">
          <Link href="/" className="text-gray-300 mr-4">
            <img
              className="h-10 w-50"
              src="/assets/logo/logo_web.png"
              alt="logo"
            />
          </Link>
          <Link
            href={`/comic/${comic?.slug}`}
            className="text-white font-medium text-lg max-w-xs"
          >
            {comic?.name}{" "}
          </Link>
          {/* <FontAwesomeIcon icon={faChevronRight} className='h-4 w-4 mx-2 text-white'/> */}
          <span className="text-gray-400 mr-4 text-lg">{chapter?.name}</span>
        </div>
        <div className="flex items-center justify-center">
          <a
            href={`/comic/${comic?.slug}/${chapter?.prevChapter?.slug}`}
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
            href={`/comic/${comic?.slug}/${chapter?.nextChapter?.slug}`}
            className={`mr-4 ${
              chapter?.nextChapter?.slug
                ? "text-white "
                : "pointer-events-none text-gray-300"
            }`}
          >
            <i className={PrimeIcons.CHEVRON_RIGHT} />
          </a>
        </div>
        {/* <div className="flex items-center justify-end mr-4">
          <button
            className="px-4 py-1 font-medium text-white  rounded-md hover:bg-blue-700 border-2 border-black focus:outline-none"
            onClick={handleReport}
          >
            Report
          </button>
        </div> */}
      </nav>
    </>
  );
};
export default ChapterNav;
