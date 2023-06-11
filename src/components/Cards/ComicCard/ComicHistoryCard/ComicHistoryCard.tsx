import { HistoryChapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";

interface IComicHistoryCardProps {
  data?: HistoryChapter;
  onClickComic?: (data?: HistoryChapter) => void;
  onClickChapter?: (data?: HistoryChapter) => void;
}

const ComicHistoryCard = ({
  data,
  onClickComic,
  onClickChapter,
}: IComicHistoryCardProps) => {
  return (
    <div className="flex flex-col">
      <div
        className="history-chapter-card cursor-pointer bg-white shadow flex-1"
        onClick={() => onClickComic && onClickComic(data)}
      >
        {data?.comic_thumb && (
          <div className="relative w-full aspect-square">
            <Image
              src={data.comic_thumb}
              alt={data.comic_name}
              fill
              className="object-cover object-top"
            />
          </div>
        )}
        <div className="p-5">
          <div className="line-clamp-2 font-semibold">{data?.comic_name}</div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center text-mangahay-400">
              <i className={PrimeIcons.HEART_FILL} />
              <div className="ml-2 text-mangahay-400">{data?.like}</div>
            </div>
            <div className="flex items-center text-slate-400">
              <i className={PrimeIcons.EYE} />
              <div className="ml-2 text-slate-400">{data?.view}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => onClickChapter && onClickChapter(data)}
        className="cursor-pointer mt-2 flex gap-2 items-center ml-2"
      >
        <i className={`${PrimeIcons.CHEVRON_RIGHT} !text-xs text-slate-500`} />
        <div className="text-slate-500 italic font-semibold ">
          Tiếp tục đọc {data?.chapter_name}
        </div>
      </div>
    </div>
  );
};

export default ComicHistoryCard;
