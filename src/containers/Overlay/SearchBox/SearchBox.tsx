import ComicCard from "@/components/Cards/ComicCard";
import InfiniteScroll from "@/containers/ListContainers/InfiniteScroll";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";
import Image from "next/image";
import { isEmptySWR } from "@/utils/swr";

const PAGE_SIZE = 5;
interface ISearchBoxProps {
  value: string;
}

const SearchBox = ({ value }: ISearchBoxProps) => {
  const router = useRouter();

  const swr = useSWRInfinite<Response<Comic[]>>(
    (index) =>
      `/api/comic/search?comic_name=${value}&filter_state=&filter_author=&filter_genre=&filter_sort=az&page=${
        index + 1
      }&limit=${PAGE_SIZE}`
  );

  return (
    <div className="search-box-container max-w-[24rem] max-h-[20rem] overflow-y-auto">
      {isEmptySWR(swr) ? (
        <div className="w-full flex flex-col items-center">
          <div className="relative w-3/5 aspect-square">
            <Image
              src="/assets/comic/empty.png"
              alt="empty"
              fill
              className="object-contain"
            />
          </div>
          <div className="font-semibold text-2xl">Không có truyện</div>
        </div>
      ) : (
        <InfiniteScroll
          swr={swr}
          dataWrapper={({ children }) => <div>{children}</div>}
          isReachingEnd={(swr: SWRInfiniteResponse<Response<Comic[]>, any>) =>
            swr.data?.[0]?.result?.length === 0 ||
            (swr.data?.[swr.data?.length - 1].result || []).length < PAGE_SIZE
          }
          endingIndicator={
            <div className="flex justify-center p-4">Không còn truyện</div>
          }
        >
          {(comics) =>
            comics?.map((comic) => (
              <ComicCard.HorizontalPreview
                data={comic}
                key={comic.id}
                onClick={(data) =>
                  data?.id && router.push(`/comic/${data?.slug}`)
                }
              />
            ))
          }
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SearchBox;
