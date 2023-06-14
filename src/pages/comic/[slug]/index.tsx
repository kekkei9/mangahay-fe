import useSWR from "swr";
import { useRouter } from "next/router";
import { Response } from "@/types/Response.type";
import { Comic } from "@/types/Comic";
import { Chapter } from "@/types/Chapter";
import ComicChapter from "@/components/Comic/ComicDetail/ComicChapter";
import ComicRelate from "@/containers/Comic/ComicDetail/ComicRelate";
import { useContext, useEffect, useRef } from "react";
import axiosClient from "@/services/backend/axiosClient";
import ComicInfo from "@/containers/Comic/ComicDetail/ComicInfo";
import CommentBox from "@/containers/Comic/ComicDetail/CommentBox";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { ToastContext } from "@/contexts/ToastContext";

const ComicPage = () => {
  const router = useRouter();

  const { setReportModalData } = useContext(ToastContext);
  const { data: comicResponse, mutate } = useSWR<
    Response<{ chapters: Chapter[]; comic: Comic }>
  >(router.isReady ? `/api/comic/${router.query.slug}` : null);

  useEffect(() => {
    axiosClient.get(
      `/api/comic/${router.query.slug}/increment?field=view&jump=1`
    );
    mutate();
  }, [router.query.slug, mutate]);

  return (
    <>
      {comicResponse?.result ? (
        <div className="flex flex-col gap-4">
          <ComicInfo
            comic={comicResponse?.result?.comic}
            mutateComic={mutate}
          />
          <ComicChapter
            comic={comicResponse?.result?.comic}
            chapters={comicResponse.result?.chapters}
          />
          <CommentBox
            comic={comicResponse?.result?.comic}
            onClickReport={(id: string) =>
              setReportModalData({ type: "comment", id: id })
            }
          />
          {comicResponse.result?.comic?.authors?.length && (
            <ComicRelate comic={comicResponse.result?.comic} />
          )}
        </div>
      ) : (
        <LoadingSkeleton.ComicInfo />
      )}
    </>
  );
};

export default ComicPage;
