import { Dispatch, SetStateAction } from "react";
import { PrimeIcons } from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import Image from "next/image";

interface ICardListWrapperProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  setIsAutoScroll: Dispatch<SetStateAction<boolean>>;
  isAutoScroll: boolean;
  isEmpty: boolean;
}
const CardListWrapper = ({
  children,
  className,
  title,
  setIsAutoScroll,
  isAutoScroll,
  isEmpty,
}: ICardListWrapperProps) => (
  <div className={className}>
    <div className="flex justify-between items-center w-full mb-4 xs:mb-10">
      <Tooltip target=".toggle-list-icon" position="left" />

      <div className="text-xl xs:text-2xl md:text-3xl font-bold">{title}</div>
      <div
        onClick={() => setIsAutoScroll((prev) => !prev)}
        className="toggle-list-icon cursor-pointer hidden md:block"
        data-pr-tooltip={isAutoScroll ? "Xem theo trang" : "Xem vô hạn"}
      >
        <i
          className={`${
            isAutoScroll ? PrimeIcons.LIST : PrimeIcons.MOBILE
          } !text-2xl`}
        />
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {children}
    </div>
    {isEmpty && typeof window !== "undefined" && (
      <div className="w-full flex flex-col items-center">
        <div className="relative w-1/5 aspect-square">
          <Image
            src="/assets/comic/empty.png"
            alt="empty"
            fill
            className="object-contain"
          />
        </div>
        <div className="font-semibold text-2xl">Không có truyện</div>
      </div>
    )}
  </div>
);

export default CardListWrapper;
