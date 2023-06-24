import ComicCard from "@/components/Cards/ComicCard";
import CardListContainer from "@/containers/ListContainers/CardList";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-page">
      <CardListContainer
        title="Tất cả truyện"
        fetchUrl={(index, pageSize) =>
          `/api/comic?page=${index + 1}&limit=${pageSize}`
        }
      >
        {(comic) => (
          <ComicCard.Preview
            data={comic as Comic}
            onClick={(data) => data?.id && router.push(`comic/${data?.slug}`)}
            onClickChapter={(data) =>
              data?.id &&
              router.push(
                `comic/${data.slug}/${data.newest_chapter_slug}/${data.newest_chapter_id}`
              )
            }
          />
        )}
      </CardListContainer>
    </div>
  );
}
