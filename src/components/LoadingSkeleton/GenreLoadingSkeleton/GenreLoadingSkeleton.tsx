import { Skeleton } from "primereact/skeleton";

const GenreLoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Skeleton width="100%" height="2rem" />
      <Skeleton width="60%" height="2rem" />
    </div>
  );
};

export default GenreLoadingSkeleton;
