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
import { useEffect, useState } from "react";
import { appendToHistory } from "@/service/backend/ChapterController";
import CommentBox from "@/containers/Comic/ComicDetail/CommentBox";
import { Dialog } from "primereact/dialog";
import ReportTable from "@/containers/ReportTable/ReportTable";
import { reportItemsMapper } from "@/containers/ReportTable/reportItemsMapper";

const ChapterPage = () => {
  const router = useRouter();
  const [isReportOpen, setIsReportOpen] = useState<false | "comment" | "comic">(
    false
  );

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
      <Dialog
        onHide={() => setIsReportOpen(false)}
        visible={!!isReportOpen}
        header={<div className="text-2xl font-semibold ml-4">Report</div>}
      >
        <ReportTable
          id={1}
          type={isReportOpen.toString()}
          items={
            reportItemsMapper[isReportOpen as keyof typeof reportItemsMapper]
          }
          onClose={() => setIsReportOpen(false)}
        />
      </Dialog>

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
              <Image
                src={image}
                alt={`Comic Image ${index + 1}`}
                width={200}
                height={500}
                key={index}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            ))}
            <div className="w-full border-t border-black py-2 comment-section">
              <CommentBox
                comic={comicResponse.result?.comic}
                onClickReport={() => setIsReportOpen("comment")}
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
