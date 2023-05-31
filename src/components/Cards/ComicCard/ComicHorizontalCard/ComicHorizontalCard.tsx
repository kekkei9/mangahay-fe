import { Comic } from "@/types/Comic";
import Image from "next/image";

interface IComicHorizontalCardProps {
  data?: Comic;
  onClick?: (data?: Comic) => void;
}

const ComicHorizontalCard = ({ data, onClick }: IComicHorizontalCardProps) => {
  return (
    <div
      className="comic-horizontal-card flex gap-2 cursor-pointer hover:bg-mangahay-200 transition-colors"
      onClick={() => onClick && onClick(data)}
    >
      {data?.thumb && (
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={data?.thumb}
            alt={`comic-thumb-${data?.id}`}
            fill
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="comic-data">
        <div className="font-semibold line-clamp-2">{data?.name}</div>
        <div className="text-sm italic">{data?.new_chapter?.name}</div>
        <div className="text-mangahay-400">{data?.authors.join(", ")}</div>
        <div>{data?.genres.join(", ")}</div>
      </div>
    </div>
  );
};

export default ComicHorizontalCard;
