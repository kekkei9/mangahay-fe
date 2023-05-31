import CardList from "@/components/CardList";
import ComicCard from "@/components/Cards/ComicCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SearchSectionContainer from "@/containers/FindComicPage/SearchSection";
import {
  ComicQueries,
  comicQueriesMapper,
  initialComicQueries,
} from "@/containers/FindComicPage/comicQueriesMapper";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

const FindComicPage = () => {
  const router = useRouter();
  const [comicQueries, setComicQueries] =
    useState<ComicQueries>(initialComicQueries);

  const { data: filteredComicsResponse, isLoading } = useSWR<Response<Comic[]>>(
    "/api/comic/search?" + new URLSearchParams(comicQueriesMapper(comicQueries))
  );

  return (
    <div className="find-comic-page">
      <SearchSectionContainer
        onSubmit={(formData) => setComicQueries(formData)}
      />
      <CardList
        className="comic-list mt-10"
        dataList={filteredComicsResponse?.result}
        onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
        title="Kết quả tìm kiếm"
        isLoading={isLoading}
      >
        {ComicCard.Preview}
      </CardList>
    </div>
  );
};

export default FindComicPage;
