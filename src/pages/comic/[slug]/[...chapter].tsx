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
import { appendToHistory } from "@/services/backend/ChapterController";
import CommentBox from "@/containers/Comic/ComicDetail/CommentBox";
import { ToastContext } from "@/contexts/ToastContext";

const ChapterPage = () => {
  const router = useRouter();

  const { setReportModalData } = useContext(ToastContext);

  const { data: comicResponse } = useSWR<Response<Comic>>(
    router.isReady && router.query?.slug
      ? `/api/comic/${router.query.slug}`
      : null
  );
  const { data: chapterResponse } = useSWR<Response<Chapter>>(
    router.isReady && router.query?.chapter
      ? `/api/chapter/get/${router.query.chapter?.[1]}`
      : null
  );

  useEffect(() => {
    appendToHistory(chapterResponse?.result);
  }, [chapterResponse?.result]);

  const currentChapter = chapterResponse?.result;

  return (
    <>
      <ChapterSpeedDialContainer
        onClickReport={() =>
          setReportModalData({ type: "chapter", id: currentChapter?.id })
        }
        className="!fixed bottom-10 max-md:left-10 md:right-10"
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
                  sizes="80vw"
                  className="object-contain"
                />
              </div>
            ))}
            <div className="w-full border-t border-black py-2 comment-section">
              <CommentBox
                comic={comicResponse.result}
                onClickReport={(id: string) =>
                  setReportModalData({ type: "comment", id: id })
                }
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
