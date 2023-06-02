import { Skeleton } from "primereact/skeleton";

const GenreLoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Skeleton width="100%" height="2rem" className="!bg-[#dfdfdf]" />
      <Skeleton width="60%" height="2rem" className="!bg-[#dfdfdf]" />
    </div>
  );
};

export default GenreLoadingSkeleton;
