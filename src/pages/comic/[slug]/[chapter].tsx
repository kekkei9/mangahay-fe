import ChapterNav from "@/components/Chapter/ChapterNav";
import ComicImages from "@/components/Chapter/ComicImages";
import CommentBox from "@/components/ComicDetails/CommentBox";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { useRouter } from "next/router";
import { Response } from "@/types/Response.type";
import useSWR from "swr";

const ChapterDetail = () => {
  const router = useRouter();

  const { data: comicResponse } = useSWR<
    Response<{ chapters: Chapter[]; comic: Comic }>
  >(`/api/comic/${router.query.slug}`);

  const currentChapter = comicResponse?.result?.chapters.find(
    (chapter) => chapter.slug === router.query.chapter
  );

  return (
    <>
      {comicResponse && (
        <>
          <ChapterNav
            chapters={comicResponse.result?.chapters}
            chapter={comicResponse.result}
            comic={comicResponse.result?.comic}
          />
          <div className="w-full mx-auto flex justify-center items-center flex-col bg-white">
            <ComicImages images={currentChapter?.images}></ComicImages>
            <div className="w-4/5 border-t border-black py-2 ">
              <CommentBox comic={comicResponse.result?.comic} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChapterDetail;
