import ChapterNav from "@/containers/NavBar/ChapterNav/ChapterNav";
import CommentBox from "@/components/Comic/ComicDetail/CommentBox";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { useRouter } from "next/router";
import { Response } from "@/types/Response.type";
import useSWR from "swr";
import { chapterMapper } from "@/containers/Comic/Chapter/chapterMapper";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Image from "next/image";
import ChapterSpeedDialContainer from "@/containers/Comic/Chapter/ChapterSpeedDial";

const ChapterDetail = () => {
  const router = useRouter();

  const { data: comicResponse } = useSWR<
    Response<{ chapters: Chapter[]; comic: Comic }>
  >(router.isReady ? `/api/comic/${router.query.slug}` : null);

  const currentChapter = chapterMapper(
    router.query.chapter as string,
    comicResponse?.result?.chapters,
    comicResponse?.result?.comic
  ) as Chapter;

  return (
    <>
      <ChapterSpeedDialContainer
        className="!fixed bottom-10 right-10"
        chapter={currentChapter}
      />
      <ChapterNav chapter={currentChapter} />
      <div className="w-4/5 mx-auto flex items-center flex-col pt-20 bg-white">
        {comicResponse ? (
          <>
            {currentChapter.images.map((image: any, index: any) => (
              <Image
                src={image}
                alt={`Comic Image ${index + 1}`}
                width={0}
                height={0}
                key={index}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            ))}
            <div className="w-full border-t border-black py-2 comment-section">
              <CommentBox comic={comicResponse.result?.comic} />
            </div>
          </>
        ) : (
          <LoadingSkeleton.Chapter />
        )}
      </div>
    </>
  );
};

export default ChapterDetail;
