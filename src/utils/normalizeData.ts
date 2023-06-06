import { Chapter } from "@/types/Chapter";

export const normalizeChapterArray = (chapters?: Chapter[]) =>
  chapters
    ?.sort(
      (a, b) =>
        parseFloat(b.name.split(" ")[1]) - parseFloat(a.name.split(" ")[1])
    )
    .filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i);
