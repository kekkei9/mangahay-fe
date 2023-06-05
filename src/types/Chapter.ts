export type Chapter = {
  createdAt: string;
  id: number;
  images: string[];
  name: string;
  slug: string;
  updatedAt: string;
  nextChapter?: Chapter;
  prevChapter?: Chapter;
};
