import { Skeleton } from "primereact/skeleton";

interface IChapterLoadingSkeletonProps {
  className?: string;
}

const ChapterLoadingSkeleton = ({
  className,
}: IChapterLoadingSkeletonProps) => {
  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {[...Array(10)].map((_, index) => (
        <Skeleton
          width="100%"
          height="60rem"
          className="!bg-[#dfdfdf]"
          key={index}
        />
      ))}
    </div>
  );
};

export default ChapterLoadingSkeleton;
