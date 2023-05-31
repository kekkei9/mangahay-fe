import CardList from "@/components/CardList";
import ComicCard from "@/components/Cards/ComicCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { followingComicToComicMapper } from "@/containers/FollowingPage/comicMapper";
import { FollowingComic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const FollowingPage = () => {
  const router = useRouter();
  const { data: followingResponse, isLoading } = useSWR<
    Response<FollowingComic[]>
  >("/api/user/comic/following?limit=100&page=0");

  return (
    <div className="following-comics">
      <CardList
        dataList={followingResponse?.result?.map((followingComic) =>
          followingComicToComicMapper(followingComic)
        )}
        onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
        title="Truyện đang theo dõi"
        isLoading={isLoading}
      >
        {ComicCard.Preview}
      </CardList>
      {!followingResponse?.result?.length && (
        <div>
          <div className="text-xl">Hiện chưa có truyện đang theo dõi</div>
          <Link href="/">
            <div className="mt-2 text-xl text-mangahay-200 font-semibold">
              Xem truyện ngay
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FollowingPage;
