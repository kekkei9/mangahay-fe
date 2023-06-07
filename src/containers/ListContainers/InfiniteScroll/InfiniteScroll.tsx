import { Button } from "primereact/button";
import React, { Ref, useEffect, useState } from "react";
import type { SWRInfiniteResponse } from "swr/infinite";
import { Response } from "@/types/Response.type";

export type Props<T> = {
  isAutoInfinite?: boolean;
  swr: SWRInfiniteResponse<Response<T[]>>;
  dataWrapper: React.ElementType;
  children: React.ReactNode | ((item?: T[]) => React.ReactNode);
  loadingIndicator?: React.ReactNode;
  endingIndicator?: React.ReactNode;
  isReachingEnd:
    | boolean
    | ((swr: SWRInfiniteResponse<Response<T[]>>) => boolean);
  indicatorClassName?: string;
};

const useIntersection = <T extends HTMLElement>(): [boolean, Ref<T>] => {
  const [intersecting, setIntersecting] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement>();
  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      setIntersecting(entries[0]?.isIntersecting);
    });
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [element]);
  return [intersecting, (el) => el && setElement(el)];
};

const InfiniteScroll = <T,>(props: Props<T>): React.ReactElement<Props<T>> => {
  const {
    swr,
    swr: { setSize, data, isValidating, isLoading },
    children,
    endingIndicator = "Không còn truyện",
    loadingIndicator = "Đang tải...",
    isReachingEnd,
    indicatorClassName = "",
    dataWrapper: DataWrapper,
    isAutoInfinite = true,
  } = props;

  const [intersecting, ref] = useIntersection<HTMLDivElement>();

  const ending =
    typeof isReachingEnd === "function" ? isReachingEnd(swr) : isReachingEnd;

  useEffect(() => {
    if (intersecting && !isValidating && !ending) {
      setSize((size) => size + 1);
    }
  }, [intersecting, isValidating, setSize, ending]);

  return (
    <>
      <DataWrapper>
        {typeof children === "function"
          ? data?.map((item) => children(item.result))
          : children}

        {isAutoInfinite && !isLoading && (
          <div className="relative flex flex-col items-center col-span-full w-full">
            <div ref={ref} className="absolute" />
            <div className={`absolute mx-auto w-full ${indicatorClassName}`}>
              {ending ? endingIndicator : loadingIndicator}
            </div>
          </div>
        )}
      </DataWrapper>
      {!ending && !isAutoInfinite && (
        <div className="hidden sm:block">
          <Button
            onClick={() => setSize((prev) => prev + 1)}
            outlined
            className="self-center !mt-8 !px-16 w-full"
            disabled={isLoading}
          >
            {isLoading ? loadingIndicator : "Tải thêm"}
          </Button>
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
