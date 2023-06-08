import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { normalizeChapterArray } from "@/utils/normalizeData";

export const chapterMapper = (
  slug?: string,
  chapters?: Chapter[],
  comic?: Comic
) => {
  const mappedChapters = normalizeChapterArray(chapters)?.map((chapter) => ({
    ...chapter,
    comicInfo: {
      slug: comic?.slug,
      name: comic?.name,
      id: comic?.id,
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
