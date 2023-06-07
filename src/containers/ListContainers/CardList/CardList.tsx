import { useState } from "react";
import PaginationView from "../PaginationView";
import { Response } from "@/types/Response.type";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import InfiniteScroll from "../InfiniteScroll";
import CardListWrapper from "@/components/CardListWrapper";

type Props<T> = {
  title?: string;
  className?: string;
  children: React.ReactNode | ((item?: T) => React.ReactNode);
  fetchUrl: (index: number, pageSize: number) => string;
};

const PAGE_SIZE = 10;
const INITIAL_SIZE = 1;

const CardList = <T,>({ children, title, className, fetchUrl }: Props<T>) => {
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(false);

  const swr = useSWRInfinite<Response<T[]>>(
    (index) => fetchUrl(index, PAGE_SIZE),
    {
      initialSize: INITIAL_SIZE,
    }
  );

  const dataWrapper = ({ children }: { children: React.ReactNode }) => (
    <CardListWrapper
      isAutoScroll={isAutoScroll}
      setIsAutoScroll={setIsAutoScroll}
      isEmpty={!swr.data?.[0].result}
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
            (swr.data?.[swr.data?.length - 1].result || []).length < PAGE_SIZE
          }
          loadingIndicator={<LoadingSkeleton.ComicList />}
        >
          {typeof children === "function"
            ? (response) => response?.map((item) => children(item))
            : children}
        </InfiniteScroll>
      ) : (
        <PaginationView
          swr={swr}
          dataWrapper={dataWrapper}
          pageSize={PAGE_SIZE}
          totalRecords={swr.data?.[0].total || 0}
          loadingIndicator={<LoadingSkeleton.ComicList />}
        >
          {children}
        </PaginationView>
      )}
    </div>
  );
};

export default CardList;
