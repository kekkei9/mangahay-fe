import { Chapter, HistoryChapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";

export const chapterToHistoryChapterMapper = (
  chapter: Chapter,
  comic: Comic
): HistoryChapter => ({
  chapter_name: chapter.name,
  chapter_slug: chapter.slug,
  comic_id: comic.id,
  comic_name: comic.name,
  comic_slug: comic.slug,
  comic_thumb: comic.thumb,
  follow: comic.follow,
  like: comic.like,
  star: comic.star,
  view: comic.view,
});
