import { Comic } from "@/types/Comic";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";
import { Divider } from "primereact/divider";

interface IComicPreviewCardProps {
  data?: Comic;
  onClick?: (data?: Comic) => void;
}

const ComicPreviewCard = ({ data, onClick }: IComicPreviewCardProps) => {
  return (
    <div
      className="comic-preview-card relative overflow-hidden cursor-pointer"
      onClick={() => onClick && onClick(data)}
    >
      <div className="back-preview-card absolute top-0 left-0 w-full h-full z-10 p-5 flex flex-col justify-between bg-mangahay-200 opacity-0 hover:opacity-100 hover:transition-all duration-300">
        <div className="flex-shrink-0 flex flex-col justify-between">
          <div className="line-clamp-2 font-semibold">{data?.name}</div>
          <div className="mt-2">{data?.authors?.join(", ")}</div>
        </div>
        <Divider />
        <div className="w-full aspect-square">
          <div
            dangerouslySetInnerHTML={{ __html: data?.brief_desc || "" }}
            className="line-clamp-[8]"
          />
        </div>
      </div>

      <div className="front-preview-card flex flex-col justify-between h-full bg-white">
        <div className="p-5 h-full flex flex-col gap-2">
          <div className="line-clamp-2 font-semibold">{data?.name}</div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <i className={`${PrimeIcons.HEART_FILL} text-mangahay-400`} />
              <div className="text-mangahay-400">{data?.follow}</div>
            </div>
            <div className="text-slate-400">{formatDate(data?.updatedAt)}</div>
          </div>
        </div>
        {data?.thumb && (
          <div className="relative w-full aspect-square flex-shrink-0">
            <Image
              src={data?.thumb}
              alt={data?.name}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicPreviewCard;
