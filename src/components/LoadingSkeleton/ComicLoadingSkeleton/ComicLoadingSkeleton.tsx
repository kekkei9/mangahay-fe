import { Skeleton } from "primereact/skeleton";

interface ILoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = ({ className }: ILoadingSkeletonProps) => {
  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {[...Array(10)].map((_, index) => (
        <div key={index}>
          <div className="flex gap-2">
            <Skeleton size="4rem" />
            <div className="w-full">
              <Skeleton width="100%" className="mb-2" />
              <Skeleton width="100%" className="mb-2" />
              <Skeleton width="80%" />
            </div>
          </div>
          <Skeleton width="100%" height="12rem" className="mt-2" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
