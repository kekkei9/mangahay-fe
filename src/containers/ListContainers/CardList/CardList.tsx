import { useEffect, useState } from "react";
import PaginationView from "../PaginationView";
import { Response } from "@/types/Response.type";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import InfiniteScroll from "../InfiniteScroll";
import CardListWrapper from "@/components/CardListWrapper";
import { breakpointDataMapper, isMobile } from "@/utils/breakpoint";
import useBreakpoint from "@/hooks/useBreakpoint";
import { pageSizeMapper } from "./pageSizeMapper";

type Props<T> = {
  title?: string;
  className?: string;
  children: React.ReactNode | ((item?: T) => React.ReactNode);
  fetchUrl: (index: number, pageSize: number) => string;
};

const INITIAL_SIZE = 1;

const CardList = <T,>({ children, title, className, fetchUrl }: Props<T>) => {
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(false);
  const breakpoint = useBreakpoint();
  const pageSize = breakpointDataMapper(pageSizeMapper, breakpoint);

  const swr = useSWRInfinite<Response<T[]>>(
    (index) => fetchUrl(index, pageSize),
    {
      initialSize: INITIAL_SIZE,
    }
  );

  useEffect(() => {
    if (isMobile(breakpoint)) {
      setIsAutoScroll(true);
    }
  }, [breakpoint]);

  const dataWrapper = ({ children }: { children: React.ReactNode }) => (
    <CardListWrapper
      isAutoScroll={isAutoScroll}
      setIsAutoScroll={setIsAutoScroll}
      isEmpty={!swr.data?.[0].result && !swr.isLoading}
      className={className}
      title={title}
    >
      {children}
    </CardListWrapper>
  );

  return (
    <div>
      {isAutoScroll ? (
        <InfiniteScroll
          swr={swr}
          dataWrapper={dataWrapper}
          isReachingEnd={(swr: SWRInfiniteResponse<Response<T[]>, any>) =>
            swr.data?.[0]?.result?.length === 0 ||
            (swr.data?.[swr.data?.length - 1].result || []).length < pageSize
          }
          loadingIndicator={<LoadingSkeleton.ComicList listSize={pageSize} />}
          endingIndicator=""
        >
          {typeof children === "function"
            ? (response) => response?.map((item) => children(item))
            : children}
        </InfiniteScroll>
      ) : (
        <PaginationView
          swr={swr}
          dataWrapper={dataWrapper}
          pageSize={pageSize}
          totalRecords={swr.data?.[0].total || 0}
          loadingIndicator={<LoadingSkeleton.ComicList listSize={pageSize} />}
        >
          {children}
        </PaginationView>
      )}
    </div>
  );
};

export default CardList;
