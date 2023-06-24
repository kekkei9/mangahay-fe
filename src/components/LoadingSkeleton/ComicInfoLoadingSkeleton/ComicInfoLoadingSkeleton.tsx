import { Skeleton } from "primereact/skeleton";

const ComicInfoLoadingSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 ">
        <Skeleton
          size="20rem"
          className="!rounded-xl flex-shrink-0 max-sm:!w-[18rem] max-sm!h-[18rem]"
        />
        <div className="w-full flex flex-col gap-2">
          <Skeleton width="40%" height="4rem" />
          <Skeleton width="60%" height="2rem" />
          <Skeleton width="30%" height="2rem" />
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default ComicInfoLoadingSkeleton;
