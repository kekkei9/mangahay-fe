import CardList from "@/components/CardList";
import ComicCard from "@/components/Cards/ComicCard";
import { HistoryChapter } from "@/types/Chapter";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import useSWR from "swr";

const HistoryPage = () => {
  const router = useRouter();

  const { data: historyResponse } =
    useSWR<Response<HistoryChapter[]>>("/api/user/history");

  return (
    <div>
      <CardList
        dataList={historyResponse?.result?.slice()?.reverse()}
        title="Truyện đã xem"
        onClickLink={(data) =>
          router.push(`comic/${data?.comic_slug}/${data?.chapter_slug}`)
        }
        onClickCard={(data) => router.push(`comic/${data?.comic_slug}`)}
      >
        {ComicCard.History}
      </CardList>
    </div>
  );
};

export default HistoryPage;
