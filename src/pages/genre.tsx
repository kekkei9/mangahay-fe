import { Comic, Genre } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { fetcher } from "@/utils/common";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import CardList from "@/components/CardList";
import ComicPreviewCard from "@/components/Cards/ComicPreviewCard";
import { useRouter } from "next/router";

const GenrePage = () => {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const { data: genresResponse } = useSWRImmutable<Response<Genre[]>>(
    "api/comic/genres",
    async (url) => {
      const res = await fetcher(url);
      setSelectedGenre(res.result?.[0].genre);
      return res;
    }
  );

  const { data: filterComicResponse } = useSWR<Response<Comic[]>>(
    `/api/comic/search?comic_name=&filter_state=&filter_author=&filter_genre=${selectedGenre}&filter_sort=az`
  );

  return (
    <div className="px-12">
      <div className="flex flex-wrap gap-6">
        {genresResponse?.result?.slice(0, 15).map(({ genre }, index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              selectedGenre === genre ? "text-black" : "text-slate-400"
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre.toLocaleUpperCase()}
          </div>
        ))}
      </div>
      <CardList
        dataList={filterComicResponse?.result}
        className="px-12"
        onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
      >
        {ComicPreviewCard}
      </CardList>
    </div>
  );
};

export default GenrePage;
