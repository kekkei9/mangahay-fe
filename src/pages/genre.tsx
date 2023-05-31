import { Comic, Genre } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CardList from "@/components/CardList";
import { useRouter } from "next/router";
import axiosClient from "@/services/backend/axiosClient";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ComicCard from "@/components/Cards/ComicCard";
import { PrimeIcons } from "primereact/api";

const DEFAULT_GENRE_NUMBER = 20;

const GenrePage = () => {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

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

  const { data: filterComicResponse, isLoading } = useSWR<Response<Comic[]>>(
    `/api/comic/search?comic_name=&filter_state=&filter_author=&filter_genre=${selectedGenre}&filter_sort=az`
  );

  const displayGenres = isShowMore
    ? genres
    : genres?.slice(0, DEFAULT_GENRE_NUMBER - 1);

  return (
    <div className="genre-page">
      <div className="flex flex-wrap gap-6">
        {genres.length ? (
          <>
            {displayGenres.map(({ genre }, index) => (
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
            <i
              className={`${
                isShowMore ? PrimeIcons.CHEVRON_UP : PrimeIcons.CHEVRON_DOWN
              } cursor-pointer`}
              onClick={() => setIsShowMore((prev) => !prev)}
            />
          </>
        ) : (
          <LoadingSkeleton.Genre />
        )}
      </div>
      <CardList
        dataList={filterComicResponse?.result}
        onClickCard={(data) => data?.id && router.push(`comic/${data?.slug}`)}
        isLoading={isLoading}
        className="mt-4 xs:mt-10"
      >
        {ComicCard.Preview}
      </CardList>
    </div>
  );
};

export default GenrePage;
