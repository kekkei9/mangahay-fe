import CardList from "@/components/CardList";
import ComicPreviewCard from "@/components/Cards/ComicPreviewCard";
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
      {isLoading && <LoadingSkeleton />}
      <main className="flex flex-col items-center justify-between pt-10">
        <CardList
          dataList={allComicsResponse?.result}
          className="px-12"
          onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
        >
          {ComicPreviewCard}
        </CardList>
      </main>
    </>
  );
}
