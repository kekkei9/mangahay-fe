import ChapterNav from "@/containers/NavBar/ChapterNav";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { useRouter } from "next/router";
import { Response } from "@/types/Response.type";
import useSWR from "swr";
import { chapterMapper } from "@/containers/Comic/Chapter/chapterMapper";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Image from "next/image";
import ChapterSpeedDialContainer from "@/containers/Comic/Chapter/ChapterSpeedDial";
import { useContext, useEffect, useState } from "react";
import { appendToHistory } from "@/service/backend/ChapterController";
import CommentBox from "@/containers/Comic/ComicDetail/CommentBox";
import { ToastContext } from "@/contexts/ToastContext";

const ChapterPage = () => {
  const router = useRouter();

  const { setIsReportOpen } = useContext(ToastContext);
  const { data: comicResponse } = useSWR<
    Response<{ chapters: Chapter[]; comic: Comic }>
  >(router.isReady ? `/api/comic/${router.query.slug}` : null);

  const currentChapter = chapterMapper(
    router.query.chapter as string,
    comicResponse?.result?.chapters,
    comicResponse?.result?.comic
  ) as Chapter;

  useEffect(() => {
    appendToHistory(currentChapter);
  }, [currentChapter]);

  return (
    <>
      <ChapterSpeedDialContainer
        onClickReport={() => setIsReportOpen("comic")}
        className="!fixed bottom-10 right-10"
        chapter={currentChapter}
      />
      <ChapterNav chapter={currentChapter} />
      <div className="w-4/5 mx-auto flex items-center flex-col pt-20 bg-white">
        {comicResponse?.result && currentChapter ? (
          <>
            {currentChapter.images.map((image: any, index: any) => (
              <div key={index} className="relative w-full aspect-[2/3]">
                <Image
                  src={image}
                  alt={`Comic Image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
            <div className="w-full border-t border-black py-2 comment-section">
              <CommentBox
                comic={comicResponse.result?.comic}
                onClickReport={() => setIsReportOpen()}
              />
            </div>
          </>
        ) : (
          <LoadingSkeleton.Chapter />
        )}
      </div>
    </>
  );
};

export default ChapterPage;
