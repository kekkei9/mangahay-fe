import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import Image from "next/image";
import useSWR from "swr";

interface ISearchBoxProps {
  value: string;
}

const SearchBox = ({ value }: ISearchBoxProps) => {
  const { data: searchComicResponse } = useSWR<Response<Comic[]>>(
    `/api/comic/search?comic_name=${value}&filter_state=&filter_author=&filter_genre=&filter_sort=az`
  );

  return (
    <div className="search-box-container max-w-[24rem] max-h-[20rem] overflow-y-auto">
      {searchComicResponse?.result?.map(
        ({ id, name, new_chapter, authors, genres, thumb }) => (
          <div
            key={id}
            className="flex cursor-pointer hover:bg-mangahaySecondary-500"
          >
            <div className="w-12 aspect-square relative">
              <Image src={thumb} fill className="object-cover object-top" />
            </div>
            <div>
              <div>{name}</div>
              <div>{new_chapter?.name}</div>
              <div>
                {authors.map((author, index) => (
                  <span key={index}>{author}</span>
                ))}
              </div>
              <div className="flex flex-wrap">
                {genres.map((genre, index) => (
                  <div key={index}>{genre}</div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchBox;
