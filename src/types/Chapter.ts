export type Chapter = {
  createdAt: string;
  id: number;
  images: string[];
  name: string;
  slug: string;
  updatedAt: string;
  nextChapter?: Chapter;
  prevChapter?: Chapter;
  comicInfo?: {
    name: string;
    slug: string;
    id: number;
  };
};

export type HistoryChapter = {
  chapter_name: string;
  chapter_slug: string;
  comic_id: number;
  comic_name: string;
  comic_slug: string;
  comic_thumb: string;
  follow: number;
  like: number;
  star: string;
  view: number;
};
