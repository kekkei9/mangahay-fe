import { Comic, Genre } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { fetcher } from "@/utils/common";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import CardList from "@/components/CardList";
import ComicPreviewCard from "@/components/Cards/ComicPreviewCard";
import { useRouter } from "next/router";
import axiosClient from "@/services/backend/axiosClient";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const GenrePage = () => {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axiosClient.get<Response<Genre[]>>("/api/comic/genres");
      if (res.data.result?.[0]) {
        setSelectedGenre(res.data.result?.[0].genre);
      }
      setGenres(res.data.result || []);
    };
    fetchGenres();
  }, []);

  //useState(null)
  //TODO: swr category -> setCategory

  //if(useState null) -> no render -> action -> render
  //TODO: container manga list -> swr manga -> [url, category]

  const { data: filterComicResponse, isLoading } = useSWR<Response<Comic[]>>(
    `/api/comic/search?comic_name=&filter_state=&filter_author=&filter_genre=${selectedGenre}&filter_sort=az`
  );

  return (
    <div className="px-12">
      <div className="flex flex-wrap gap-6">
        {genres?.slice(0, 15).map(({ genre }, index) => (
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
      {isLoading && <LoadingSkeleton.Comic />}
      <CardList
        dataList={filterComicResponse?.result}
        onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
      >
        {ComicPreviewCard}
      </CardList>
    </div>
  );
};

export default GenrePage;
