import CardList from "@/components/CardList";
import ComicCard from "@/components/Cards/ComicCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();

  const { data: allComicsResponse, isLoading } =
    useSWR<Response<Comic[]>>("/api/comic");

  return (
    <>
      {isLoading && <LoadingSkeleton.Comic />}
      <div>
        <CardList
          dataList={allComicsResponse?.result}
          onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
          title="Tất cả truyện"
        >
          {ComicCard.Preview}
        </CardList>
      </div>
    </>
  );
}
