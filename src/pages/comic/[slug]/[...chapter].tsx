import ChapterNav from "@/containers/NavBar/ChapterNav";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { useRouter } from "next/router";
import { Response } from "@/types/Response.type";
import useSWR from "swr";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Image from "next/image";
import ChapterSpeedDialContainer from "@/containers/Comic/Chapter/ChapterSpeedDial";
import { useContext, useEffect, useState } from "react";
import { appendToHistory } from "@/services/backend/ChapterController";
import CommentBox from "@/containers/Comic/ComicDetail/CommentBox";
import { ToastContext } from "@/contexts/ToastContext";
import { appendToLocalHistory } from "@/utils/localStorage";
import { chapterToHistoryChapterMapper } from "@/containers/FollowingPage/chapterMapper";

const ChapterPage = () => {
  const router = useRouter();

  const { setReportModalData, checkAuth } = useContext(ToastContext);

  const { data: comicResponse } = useSWR<Response<Comic>>(
    router.isReady && router.query?.slug
      ? `/api/comic/${router.query.slug}`
      : null
  );
  const { data: chapterResponse } = useSWR<
    Response<{ cur: Chapter; next?: Chapter; pre?: Chapter }>
  >(
    comicResponse?.result?.id && router.isReady && router.query?.chapter
      ? `/api/chapter/get/${comicResponse?.result?.id}/${router.query.chapter?.[1]}`
      : null
  );

  const currentChapter = {
    ...chapterResponse?.result?.cur,
    nextChapter: chapterResponse?.result?.next,
    prevChapter: chapterResponse?.result?.pre,
  };

  useEffect(() => {
    if (!chapterResponse || !comicResponse) return;
    appendToLocalHistory(
      chapterToHistoryChapterMapper(
        chapterResponse?.result?.cur,
        comicResponse?.result
      )
    );
    appendToHistory(chapterResponse?.result?.cur, comicResponse?.result);
  }, [chapterResponse, comicResponse]);

  return (
    <>
      <ChapterSpeedDialContainer
        onClickReport={() =>
          setReportModalData({ type: "chapter", id: currentChapter?.id })
        }
        className="!fixed bottom-10 max-md:left-10 md:right-10"
        chapter={currentChapter}
      />
      <ChapterNav chapter={currentChapter} comic={comicResponse?.result} />
      <div className="w-4/5 mx-auto flex items-center flex-col pt-20 bg-white">
        {comicResponse?.result && currentChapter.images ? (
          <>
            {currentChapter?.images?.map((image: any, index: any) => (
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
                  checkAuth(router.asPath) &&
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
