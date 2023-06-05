import ComicCard from "@/components/Cards/ComicCard";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ISearchBoxProps {
  value: string;
}

const SearchBox = ({ value }: ISearchBoxProps) => {
  const router = useRouter();

  const { data: searchComicResponse } = useSWR<Response<Comic[]>>(
    `/api/comic/search?comic_name=${value}&filter_state=&filter_author=&filter_genre=&filter_sort=az`
  );

  return (
    <div className="search-box-container max-w-[24rem] max-h-[20rem] overflow-y-auto flex flex-col gap-2">
      {searchComicResponse?.result?.length ? (
        searchComicResponse?.result?.map((comic) => (
          <ComicCard.HorizontalPreview
            data={comic}
            key={comic.id}
            onClick={(data) => data?.id && router.push(`/comic/${data?.slug}`)}
          />
        ))
      ) : (
        <div>Không có kết quả</div>
      )}
    </div>
  );
};

export default SearchBox;
