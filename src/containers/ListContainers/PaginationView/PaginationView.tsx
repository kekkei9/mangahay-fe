import React, { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { SWRInfiniteResponse } from "swr/infinite";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import { isMobile } from "@/utils/breakpoint";
import useBreakpoint from "@/hooks/useBreakpoint";

export type Props<T> = {
  swr: SWRInfiniteResponse<Response<T[]>>;
  children: React.ReactNode | ((item?: T) => React.ReactNode);
  dataWrapper: React.ElementType;
  pageSize: number;
  totalRecords: number;
  loadingIndicator?: React.ReactNode;
};

const PaginationView = <T,>({
  swr,
  children,
  dataWrapper: DataWrapper,
  pageSize,
  totalRecords,
  loadingIndicator,
}: Props<T>) => {
  const [first, setFirst] = useState<number>(0);
  const router = useRouter();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (!isMobile(breakpoint) && router.query.page) {
      const currentPage = +(router.query.page as string);
      swr.setSize(currentPage);
      setFirst((currentPage - 1) * pageSize);
    }
  }, [breakpoint, router.isReady]);

  return (
    <>
      <DataWrapper>
        {swr.data?.[swr.size - 1]?.result?.map((item) =>
          typeof children == "function" ? children(item) : children
        ) || <div className="col-span-full"> {loadingIndicator}</div>}
      </DataWrapper>
      {!!totalRecords && (
        <Paginator
          className="mt-3"
          first={first}
          rows={pageSize}
          totalRecords={totalRecords}
          onPageChange={(e: any) => {
            router.push(
              {
                pathname: router.pathname,
                query: { page: e.page + 1 },
              },
              undefined,
              { shallow: true }
            );
            swr.setSize(e.page + 1);
            setFirst(e.first);
          }}
        />
      )}
    </>
  );
};

export default PaginationView;
