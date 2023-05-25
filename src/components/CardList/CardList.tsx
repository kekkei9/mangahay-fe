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
}

const CardList = <T,>({
  dataList,
  children,
  className,
  onClickCard,
}: ICardListProps<T>) => {
  const Component = children;

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {dataList?.map((data, index) => (
        // @ts-ignore
        <Component data={data} key={data?.id || index} onClick={onClickCard} />
      ))}
    </div>
  );
};

export default CardList;
