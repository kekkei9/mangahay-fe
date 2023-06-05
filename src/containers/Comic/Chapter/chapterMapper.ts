import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";

export const chapterMapper = (
  slug?: string,
  chapters?: Chapter[],
  comic?: Comic
) => {
  const mappedChapters = chapters?.map((chapter) => ({
    ...chapter,
    comicInfo: {
      slug: comic?.slug,
      name: comic?.name,
    },
  }));

  const currentChapterIndex =
    mappedChapters?.findIndex((chapter) => chapter.slug === slug) || 0;

  const currentChapter: any = {
    ...mappedChapters?.[currentChapterIndex],
    nextChapter: mappedChapters?.[currentChapterIndex - 1],
    prevChapter: mappedChapters?.[currentChapterIndex + 1],
  };

  return currentChapter;
};
