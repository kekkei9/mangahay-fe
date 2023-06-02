import { useState } from "react";
import { Paginator } from "primereact/paginator";
import { SWRInfiniteResponse } from "swr/infinite";

export type Props<T> = {
  swr: SWRInfiniteResponse<T[]>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  dataWrapper: React.ElementType;
  pageSize: number;
};

//TODO: CHANGE LATER

const TOTAL_RECORDS = 5;

const PaginationView = <T,>({
  swr,
  children,
  dataWrapper: DataWrapper,
  pageSize,
}: Props<T>) => {
  const [first, setFirst] = useState<number>(0);
  return (
    <>
      <DataWrapper>
        {swr.data?.[swr.size - 1]?.map((item) =>
          typeof children == "function" ? children(item) : children
        )}
      </DataWrapper>
      <Paginator
        className="mt-3"
        first={first}
        rows={pageSize}
        totalRecords={TOTAL_RECORDS}
        onPageChange={(e: any) => {
          swr.setSize(e.page + 1);
          setFirst(e.first);
        }}
      />
    </>
  );
};

export default PaginationView;
