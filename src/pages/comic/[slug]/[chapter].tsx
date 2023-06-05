import ChapterNav from "@/components/Chapter/ChapterNav";
import CommentBox from "@/components/ComicDetail/CommentBox";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { useRouter } from "next/router";
import { Response } from "@/types/Response.type";
import useSWR from "swr";
import ChapterImages from "@/components/Chapter/ChapterImages";
import { chapterMapper } from "@/components/Chapter/chapterMapper";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const ChapterDetail = () => {
  const router = useRouter();

  const { data: comicResponse } = useSWR<
    Response<{ chapters: Chapter[]; comic: Comic }>
  >(`/api/comic/${router.query.slug}`);

  const currentChapter = chapterMapper(
    router.query.chapter as string,
    comicResponse?.result?.chapters
  ) as Chapter;

  return (
    <>
      <>
        <ChapterNav
          chapter={currentChapter}
          comic={comicResponse?.result?.comic}
        />
        {comicResponse ? (
          <div className="w-full mx-auto flex items-center flex-col">
            <ChapterImages images={currentChapter?.images} />
            <div className="w-4/5 border-t border-black py-2 ">
              <CommentBox comic={comicResponse.result?.comic} />
            </div>
          </div>
        ) : (
          <LoadingSkeleton.Comic />
        )}
      </>
    </>
  );
};

export default ChapterDetail;
