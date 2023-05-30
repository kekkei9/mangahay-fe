import CardList from "@/components/CardList";
import ComicCard from "@/components/Cards/ComicCard";
import { useRouter } from "next/router";
import useSWR from "swr";

const TopPage = () => {
  const router = useRouter();

  const { data: topResponse } = useSWR(
    "/api/comic/ranking?field=view&limit=10"
  );

  return (
    <div>
      <CardList
        dataList={topResponse?.result}
        onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
      >
        {ComicCard.Preview}
      </CardList>
    </div>
  );
};

export default TopPage;