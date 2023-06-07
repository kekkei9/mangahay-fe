import { Skeleton } from "primereact/skeleton";

interface ILoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = ({ className }: ILoadingSkeletonProps) => {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 ${className}`}
    >
      {[...Array(10)].map((_, index) => (
        <div key={index}>
          <div className="flex gap-2">
            <Skeleton className="!bg-[#dfdfdf]" size="4rem" />
            <div className="w-full">
              <Skeleton className="!bg-[#dfdfdf] mb-2" width="100%" />
              <Skeleton className="!bg-[#dfdfdf] mb-2" width="100%" />
              <Skeleton className="!bg-[#dfdfdf]" width="80%" />
            </div>
          </div>
          <Skeleton
            className="!bg-[#dfdfdf] mt-2"
            width="100%"
            height="16rem"
          />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
