import { PrimeIcons } from "primereact/api";
import { useEffect, useState } from "react";

const ScrollTop = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const DEFAULT_DISPLAY_HEIGHT = window.innerHeight + 100;

  useEffect(() => {
    const onScroll = () => {
      setIsDisplay(window.scrollY >= DEFAULT_DISPLAY_HEIGHT);
    };
    window.addEventListener("scroll", onScroll);
  }, [DEFAULT_DISPLAY_HEIGHT]);

  const onClickScroll = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div
      className="fixed right-10 bottom-12 z-[1000] cursor-pointer"
      onClick={onClickScroll}
    >
      {isDisplay && (
        <div className="bg-black w-14 rounded-full text-white aspect-square flex justify-center items-center">
          <i className={PrimeIcons.CHEVRON_UP} />
        </div>
      )}
    </div>
  );
};

export default ScrollTop;
