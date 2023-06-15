import { Comic, Genre } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import axiosClient from "@/services/backend/axiosClient";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ComicCard from "@/components/Cards/ComicCard";
import { PrimeIcons } from "primereact/api";
import useBreakpoint from "@/hooks/useBreakpoint";
import CardListContainer from "@/containers/ListContainers/CardList";

const defaultGenreNumber = {
  DEFAULT: 8,
  xs: 9,
  sm: 12,
  md: 15,
  lg: 20,
  xl: 24,
  "2xl": 30,
};

const GenrePage = () => {
  const router = useRouter();
  const breakpoint = useBreakpoint();
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchGenres = async () => {
      const res = await axiosClient.get<Response<Genre[]>>("/api/comic/genres");
      if (res.data.result?.[0]) {
        setSelectedGenre(
          (router.query.genre as string) || res.data.result?.[0].genre
        );
      }
      setGenres(res.data.result || []);
    };
    fetchGenres();
  }, [router.isReady, router.query.genre]);

  const { data: filterComicResponse, isLoading } = useSWR<Response<Comic[]>>(
    `/api/comic/search?comic_name=&filter_state=&filter_author=&filter_genre=${selectedGenre}&filter_sort=az`
  );

  const displayGenres = isShowMore
    ? genres
    : genres?.slice(
        0,
        defaultGenreNumber[breakpoint as keyof typeof defaultGenreNumber] - 1
      );

  return (
    <div className="genre-page">
      <div className="flex flex-wrap gap-6 justify-center xs:justify-start">
        {genres.length ? (
          <>
            {displayGenres.map(({ genre }, index) => (
              <div
                key={index}
                className={`cursor-pointer ${
                  selectedGenre === genre ? "text-black" : "text-slate-400"
                }`}
                onClick={() => {
                  setSelectedGenre(genre);
                  router.push(`/genre?genre=${genre}`);
                }}
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
      <CardListContainer
        title={`Kết quả tìm kiếm cho thể loại "${selectedGenre}"`}
        className="mt-4 xs:mt-10"
        fetchUrl={(index, pageSize) =>
          `/api/comic/search?comic_name=&filter_state=&filter_author=&filter_genre=${selectedGenre}&filter_sort=az&page=${
            index + 1
          }&limit=${pageSize}`
        }
      >
        {(comic) => (
          <ComicCard.Preview
            data={comic as Comic}
            onClick={(data) => data?.id && router.push(`comic/${data?.slug}`)}
          />
        )}
      </CardListContainer>
    </div>
  );
};

export default GenrePage;
