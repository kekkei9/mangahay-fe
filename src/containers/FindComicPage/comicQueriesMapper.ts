export type ComicQueries = {
  comicName: string;
  filterState: string;
  filterAuthor: string;
  filterGenre: { code: string; name: string }[];
  filterSort: "az" | "za";
};

export const initialComicQueries: ComicQueries = {
  comicName: "",
  filterState: "",
  filterAuthor: "",
  filterGenre: [],
  filterSort: "az",
};

export const comicQueriesMapper = ({
  comicName,
  filterState,
  filterAuthor,
  filterGenre,
  filterSort,
}: ComicQueries) => ({
  comic_name: comicName,
  filter_state: filterState,
  filter_author: filterAuthor,
  filter_genre: filterGenre.map((a) => a.name).join(" "),
  filter_sort: filterSort,
});
