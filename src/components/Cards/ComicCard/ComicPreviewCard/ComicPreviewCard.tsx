import { Comic } from "@/types/Comic";
import { Divider } from "primereact/divider";

interface IComicPreviewCardProps {
  data?: Comic;
  onClick?: (data?: Comic) => void;
}

const ComicPreviewCard = ({ data, onClick }: IComicPreviewCardProps) => {
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden cursor-pointer"
      onClick={() => onClick && onClick(data)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-red-400 opacity-0 hover:opacity-100 z-10 p-5">
        <div className="line-clamp-2">{data?.name}</div>
        <div>
          {data?.authors.map((author, index) => (
            <span key={index}>{author}</span>
          ))}
        </div>
        <div>
          <Divider />
          <div
            dangerouslySetInnerHTML={{ __html: data?.brief_desc || "" }}
            className="line-clamp-[8]"
          />
        </div>
      </div>
      <div className="p-5 h-full flex flex-col justify-between">
        <div className="line-clamp-2">{data?.name}</div>
        <div>{data?.follow}</div>
      </div>
      <img
        src={data?.thumb}
        alt={data?.name}
        className="w-full aspect-square object-cover object-top"
      />
    </div>
  );
};

export default ComicPreviewCard;
