import CardList from "@/components/CardList";
import ComicCard from "@/components/Cards/ComicCard";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import useSWR from "swr";

interface IComicRelateProps {
  comic?: Comic;
}

const ComicRelate = ({ comic }: IComicRelateProps) => {
  const relateAuthor = comic?.authors[0];

  const { data: relateComicsResponse } = useSWR<Response<Comic[]>>(
    `/api/comic/search?comic_name=&filter_state=&filter_author=${relateAuthor}&filter_genre=&filter_sort=az&page=1`
  );

  const relatedComics = relateComicsResponse?.result?.filter(
    (foundComic) => foundComic.id !== comic?.id
  );

  return (
    <>
      {!!relatedComics?.length && (
        <div className="bg-white p-10">
          <CardList
            dataList={relatedComics}
            title={`Tác phẩm cùng tác giả ${relateAuthor}`}
          >
            {ComicCard.Preview}
          </CardList>
        </div>
      )}
    </>
  );
};

export default ComicRelate;
