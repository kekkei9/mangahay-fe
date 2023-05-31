import CardList from "@/components/CardList";
import ComicCard from "@/components/Cards/ComicCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { followingComicToComicMapper } from "@/containers/FollowingPage/comicMapper";
import { FollowingComic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useRouter } from "next/router";
import useSWR from "swr";

const FollowingPage = () => {
  const router = useRouter();
  const { data: followingResponse, isLoading } = useSWR<
    Response<FollowingComic[]>
  >("/api/user/comic/following?limit=100&page=0");

  return (
    <>
      {isLoading && <LoadingSkeleton.Comic />}

      <CardList
        dataList={followingResponse?.result?.map((followingComic) =>
          followingComicToComicMapper(followingComic)
        )}
        onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
        title="Truyện đang theo dõi"
      >
        {ComicCard.Preview}
      </CardList>
    </>
  );
};

export default FollowingPage;
