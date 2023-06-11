import ComicCard from "@/components/Cards/ComicCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SearchSectionContainer from "@/containers/FindComicPage/SearchSection";
import {
  ComicQueries,
  comicQueriesMapper,
  initialComicQueries,
} from "@/containers/FindComicPage/comicQueriesMapper";
import CardListContainer from "@/containers/ListContainers/CardList";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const FindComicPage = () => {
  const router = useRouter();
  const [comicQueries, setComicQueries] =
    useState<ComicQueries>(initialComicQueries);

  return (
    <div className="find-comic-page">
      {router.isReady && (
        <SearchSectionContainer
          onSubmit={(formData) => setComicQueries(formData)}
          defaultValues={router.query}
        />
      )}
      <CardListContainer
        title="Kết quả tìm kiếm"
        fetchUrl={(index, pageSize) =>
          `/api/comic/search?${new URLSearchParams(
            comicQueriesMapper(comicQueries)
          )}&page=${index + 1}&limit=${pageSize}`
        }
        className="comic-list mt-4 xs:mt-10"
      >
        {(comic) => (
          <ComicCard.Preview
            data={comic as Comic}
            onClick={(data) => data?.id && router.push(`comic/${data?.slug}`)}
          />
        )}
      </CardListContainer>
    </div>
  );
};

export default FindComicPage;
