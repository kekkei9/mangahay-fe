import { Chapter } from "@/types/Chapter";

export const chapterMapper = (slug?: string, chapters?: Chapter[]) => {
  const currentChapterIndex =
    chapters?.findIndex((chapter) => chapter.slug === slug) || 0;

  const currentChapter: any = {
    ...chapters?.[currentChapterIndex],
    nextChapter: chapters?.[currentChapterIndex - 1],
    prevChapter: chapters?.[currentChapterIndex + 1],
  };

  return currentChapter;
};
