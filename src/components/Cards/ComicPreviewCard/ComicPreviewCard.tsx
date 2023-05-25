import { Comic } from "@/types/Comic";
import { Divider } from "primereact/divider";
import Image from "next/image";

interface IComicPreviewCardProps {
  data?: Comic;
  onClick?: (data?: Comic) => void;
}

const ComicPreviewCard = ({ data, onClick }: IComicPreviewCardProps) => {
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      onClick={() => onClick && onClick(data)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-red-400 opacity-0 hover:opacity-100 z-10">
        <div>{data?.name}</div>
        <div>
          {data?.authors.map((author, index) => (
            <span key={index}>{author}</span>
          ))}
        </div>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: data?.brief_desc || "" }} />
      </div>
      <div>{data?.name}</div>
      <div>{data?.follow}</div>
      {data?.thumb && (
        <div className="relative h-4/5 aspect-[5/4]">
          <Image
            src={data?.thumb}
            alt={data.name}
            fill
            className="object-cover object-top"
          />
        </div>
      )}
    </div>
  );
};

export default ComicPreviewCard;
