import ComicCard from "@/components/Cards/ComicCard";
import CardListContainer from "@/containers/ListContainers/CardList";
import { Comic } from "@/types/Comic";
import { useRouter } from "next/router";

interface IComicRelateProps {
  comic?: Comic;
}

const ComicRelate = ({ comic }: IComicRelateProps) => {
  const router = useRouter();
  const relateAuthor = comic?.authors[0];

  return (
    <div className="bg-white p-10">
      <CardListContainer
        title={`Tác phẩm cùng tác giả ${relateAuthor}`}
        fetchUrl={(index, pageSize) =>
          `/api/comic/search?comic_name=&filter_state=&filter_author=${relateAuthor}&filter_genre=&filter_sort=az&page=${
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

export default ComicRelate;
