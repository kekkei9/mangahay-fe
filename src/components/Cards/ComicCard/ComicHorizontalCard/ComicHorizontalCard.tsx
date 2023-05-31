import { Comic } from "@/types/Comic";
import Image from "next/image";

interface IComicHorizontalCardProps {
  data?: Comic;
  onClick?: (data?: Comic) => void;
}

const ComicHorizontalCard = ({ data, onClick }: IComicHorizontalCardProps) => {
  return (
    <div
      className="comic-horizontal-card flex cursor-pointer hover:bg-mangahaySecondary-500"
      onClick={() => onClick && onClick(data)}
    >
      {data?.thumb && (
        <div className="relative w-12 aspect-square flex-shrink-0">
          <Image
            src={data?.thumb}
            alt={`comic-thumb-${data?.id}`}
            fill
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="comic-data">
        <div>{data?.name}</div>
        <div>{data?.new_chapter?.name}</div>
        <div>
          {data?.authors.map((author, index) => (
            <span key={index}>{author}</span>
          ))}
        </div>
        <div className="flex flex-wrap">
          {data?.genres.map((genre, index) => (
            <div key={index}>{genre}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicHorizontalCard;
