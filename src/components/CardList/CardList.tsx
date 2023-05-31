import LoadingSkeleton from "../LoadingSkeleton";
interface ICardListProps<T> {
  dataList?: T[];
  children: ({
    data,
    onClick,
  }: {
    data?: T;
    onClick?: (data?: T) => void;
  }) => JSX.Element;
  className?: string;
  onClickCard?: (data?: T) => void;
  title?: string;
  isLoading?: boolean;
}

const CardList = <T,>({
  dataList,
  children,
  title,
  className,
  onClickCard,
  isLoading,
}: ICardListProps<T>) => {
  const Component = children;

  return (
    <div>
      <div className="text-3xl font-bold mb-10">{title}</div>

      {isLoading && <LoadingSkeleton.Comic />}

      <div className={`grid grid-cols-5 gap-4 ${className}`}>
        {dataList?.map((data, index) => (
          <Component
            data={data}
            // @ts-ignore
            key={data?.id || index}
            onClick={onClickCard}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
