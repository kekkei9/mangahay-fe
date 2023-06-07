import ComicCard from "@/components/Cards/ComicCard";
import InfiniteScroll from "@/containers/ListContainers/InfiniteScroll";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

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
      <InfiniteScroll
        swr={swr}
        dataWrapper={({ children }) => <div>{children}</div>}
        isReachingEnd={(swr: SWRInfiniteResponse<Response<Comic[]>, any>) =>
          swr.data?.[0]?.result?.length === 0 ||
          (swr.data?.[swr.data?.length - 1].result || []).length < PAGE_SIZE
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
    </div>
  );
};

export default SearchBox;
