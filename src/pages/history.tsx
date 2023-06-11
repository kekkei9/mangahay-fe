import ComicCard from "@/components/Cards/ComicCard";
import CardListContainer from "@/containers/ListContainers/CardList";
import { HistoryChapter } from "@/types/Chapter";
import { useRouter } from "next/router";

const HistoryPage = () => {
  const router = useRouter();

  return (
    <div>
      <CardListContainer
        title="Truyện đã xem"
        fetchUrl={(index, pageSize) =>
          `/api/user/history?page=${index}&limit=${pageSize}`
        }
      >
        {(chapter) => (
          <ComicCard.History
            data={chapter as HistoryChapter}
            onClickComic={(data) => router.push(`comic/${data?.comic_slug}`)}
            onClickChapter={(data) =>
              router.push(`comic/${data?.comic_slug}/${data?.chapter_slug}`)
            }
          />
        )}
      </CardListContainer>
    </div>
  );
};

export default HistoryPage;
