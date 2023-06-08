import ComicCard from "@/components/Cards/ComicCard";
import { followingComicToComicMapper } from "@/containers/FollowingPage/comicMapper";
import CardListContainer from "@/containers/ListContainers/CardList";
import { FollowingComic } from "@/types/Comic";
import { useRouter } from "next/router";

const FollowingPage = () => {
  const router = useRouter();

  return (
    <div className="following-comics">
      <CardListContainer
        title="Tất cả truyện"
        fetchUrl={(index, pageSize) =>
          `/api/user/comic/following?limit=${pageSize}&page=${index + 1}`
        }
      >
        {(comic) => (
          <ComicCard.Preview
            data={followingComicToComicMapper(comic as FollowingComic)}
            onClick={(data) => data?.id && router.push(`comic/${data?.slug}`)}
          />
        )}
      </CardListContainer>
    </div>
  );
};

export default FollowingPage;
