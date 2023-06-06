export type ComicQueries = {
  comicName: string;
  filterState: string;
  filterAuthor: string;
  filterGenre: { code: string; name: string }[];
  filterSort: "az" | "za" | "updatedAt" | "like" | "view";
};

export const initialComicQueries: ComicQueries = {
  comicName: "",
  filterState: "",
  filterAuthor: "",
  filterGenre: [],
  filterSort: "az",
};

export const statusMapper = {
  "Tất cả": "0",
  "Đang tiến hành": "1",
  "Tạm ngưng": "2",
  "Hoàn thành": "3",
};

export const comicQueriesMapper = ({
  comicName,
  filterState,
  filterAuthor,
  filterGenre,
  filterSort,
}: ComicQueries) => ({
  comic_name: comicName,
  filter_state: statusMapper?.[filterState as keyof typeof statusMapper] || "",
  filter_author: filterAuthor,
  filter_genre: filterGenre.map((a) => a.name).join(" "),
  filter_sort: filterSort,
});
