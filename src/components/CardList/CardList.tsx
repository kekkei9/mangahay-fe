import LoadingSkeleton from "../LoadingSkeleton";
interface ICardListProps<T> {
  dataList?: T[];
  children: ({
    data,
    onClick,
  }: {
    data?: T;
    onClick?: (data?: T) => void;
    onClickLink?: (data?: T) => void;
  }) => JSX.Element;
  className?: string;
  onClickCard?: (data?: T) => void;
  onClickLink?: (data?: T) => void;
  title?: string;
  isLoading?: boolean;
}

const CardList = <T,>({
  dataList,
  children,
  title,
  className,
  onClickCard,
  onClickLink,
  isLoading,
}: ICardListProps<T>) => {
  const Component = children;

  return (
    <div className={className}>
      <div className="text-xl xs:text-2xl md:text-3xl font-bold mb-4 xs:mb-10">
        {title}
      </div>

      {isLoading && <LoadingSkeleton.ComicList />}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
        {dataList?.map((data, index) => (
          <Component
            data={data}
            // @ts-ignore
            key={data?.id || index}
            onClick={onClickCard}
            onClickLink={onClickLink}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
